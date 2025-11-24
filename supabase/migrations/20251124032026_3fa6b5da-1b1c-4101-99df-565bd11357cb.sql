-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  student_id TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  program TEXT,
  enrollment_date DATE,
  expected_graduation DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('student', 'faculty', 'admin', 'staff');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Role check function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- User roles policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- E-Library resources table
CREATE TABLE public.library_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT,
  description TEXT,
  category TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  file_url TEXT,
  thumbnail_url TEXT,
  isbn TEXT,
  publication_year INTEGER,
  publisher TEXT,
  tags TEXT[],
  access_level TEXT DEFAULT 'public',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.library_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view library resources"
  ON public.library_resources FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage library resources"
  ON public.library_resources FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RPL/Credit Transfer table
CREATE TABLE public.credit_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  institution_name TEXT NOT NULL,
  course_name TEXT NOT NULL,
  course_code TEXT,
  credits_earned DECIMAL(4,2),
  grade TEXT,
  completion_date DATE,
  status TEXT DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.credit_transfers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own credit transfers"
  ON public.credit_transfers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own credit transfers"
  ON public.credit_transfers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Faculty and admins can view all transfers"
  ON public.credit_transfers FOR SELECT
  USING (public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Faculty and admins can update transfers"
  ON public.credit_transfers FOR UPDATE
  USING (public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'admin'));

-- Chapel/Spiritual Life attendance
CREATE TABLE public.chapel_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  attended BOOLEAN DEFAULT false,
  reflection TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.chapel_attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own attendance"
  ON public.chapel_attendance FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can track their attendance"
  ON public.chapel_attendance FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their attendance"
  ON public.chapel_attendance FOR UPDATE
  USING (auth.uid() = user_id);

-- Ministry opportunities table
CREATE TABLE public.ministry_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  ministry_type TEXT NOT NULL,
  location TEXT,
  start_date DATE,
  end_date DATE,
  hours_required INTEGER,
  spots_available INTEGER,
  requirements TEXT,
  contact_email TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ministry_opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ministry opportunities"
  ON public.ministry_opportunities FOR SELECT
  USING (true);

CREATE POLICY "Admins and faculty can manage opportunities"
  ON public.ministry_opportunities FOR ALL
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'faculty'));

-- Ministry participation tracking
CREATE TABLE public.ministry_participation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  opportunity_id UUID REFERENCES public.ministry_opportunities(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'applied',
  hours_completed INTEGER DEFAULT 0,
  supervisor_notes TEXT,
  student_reflection TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, opportunity_id)
);

ALTER TABLE public.ministry_participation ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own participation"
  ON public.ministry_participation FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can apply to opportunities"
  ON public.ministry_participation FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Faculty can view all participation"
  ON public.ministry_participation FOR SELECT
  USING (public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'admin'));

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_library_updated_at
  BEFORE UPDATE ON public.library_resources
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_credit_transfers_updated_at
  BEFORE UPDATE ON public.credit_transfers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_ministry_opportunities_updated_at
  BEFORE UPDATE ON public.ministry_opportunities
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_ministry_participation_updated_at
  BEFORE UPDATE ON public.ministry_participation
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Assign student role by default
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();