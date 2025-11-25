-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_code TEXT NOT NULL UNIQUE,
  course_name TEXT NOT NULL,
  description TEXT,
  instructor_id UUID NOT NULL,
  credits INTEGER NOT NULL DEFAULT 3,
  semester TEXT NOT NULL,
  year INTEGER NOT NULL,
  max_students INTEGER,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course enrollments table
CREATE TABLE public.course_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  student_id UUID NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active',
  grade TEXT,
  UNIQUE(course_id, student_id)
);

-- Create assignments table
CREATE TABLE public.assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  points INTEGER NOT NULL DEFAULT 100,
  assignment_type TEXT NOT NULL DEFAULT 'homework',
  status TEXT NOT NULL DEFAULT 'active',
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assignment submissions table
CREATE TABLE public.assignment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL,
  submission_text TEXT,
  file_url TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  grade NUMERIC,
  feedback TEXT,
  graded_by UUID,
  graded_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'submitted',
  UNIQUE(assignment_id, student_id)
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  replied_to UUID REFERENCES public.messages(id) ON DELETE SET NULL
);

-- Create calendar events table
CREATE TABLE public.calendar_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  created_by UUID NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  all_day BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Anyone can view active courses"
ON public.courses FOR SELECT
USING (status = 'active');

CREATE POLICY "Faculty and admins can manage courses"
ON public.courses FOR ALL
USING (has_role(auth.uid(), 'faculty') OR has_role(auth.uid(), 'admin'));

-- Course enrollments policies
CREATE POLICY "Students can view their enrollments"
ON public.course_enrollments FOR SELECT
USING (auth.uid() = student_id);

CREATE POLICY "Faculty can view enrollments for their courses"
ON public.course_enrollments FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.courses 
  WHERE courses.id = course_enrollments.course_id 
  AND courses.instructor_id = auth.uid()
));

CREATE POLICY "Admins can manage all enrollments"
ON public.course_enrollments FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Students can enroll in courses"
ON public.course_enrollments FOR INSERT
WITH CHECK (auth.uid() = student_id);

-- Assignments policies
CREATE POLICY "Students can view assignments for enrolled courses"
ON public.assignments FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.course_enrollments
  WHERE course_enrollments.course_id = assignments.course_id
  AND course_enrollments.student_id = auth.uid()
));

CREATE POLICY "Faculty can manage assignments for their courses"
ON public.assignments FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.courses
  WHERE courses.id = assignments.course_id
  AND courses.instructor_id = auth.uid()
));

-- Assignment submissions policies
CREATE POLICY "Students can view their own submissions"
ON public.assignment_submissions FOR SELECT
USING (auth.uid() = student_id);

CREATE POLICY "Students can create submissions"
ON public.assignment_submissions FOR INSERT
WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their ungraded submissions"
ON public.assignment_submissions FOR UPDATE
USING (auth.uid() = student_id AND grade IS NULL);

CREATE POLICY "Faculty can view and grade submissions for their courses"
ON public.assignment_submissions FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.assignments
  JOIN public.courses ON courses.id = assignments.course_id
  WHERE assignments.id = assignment_submissions.assignment_id
  AND courses.instructor_id = auth.uid()
));

-- Messages policies
CREATE POLICY "Users can view their messages"
ON public.messages FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages"
ON public.messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Recipients can update read status"
ON public.messages FOR UPDATE
USING (auth.uid() = recipient_id);

-- Calendar events policies
CREATE POLICY "Anyone can view calendar events"
ON public.calendar_events FOR SELECT
USING (true);

CREATE POLICY "Faculty and admins can create events"
ON public.calendar_events FOR INSERT
WITH CHECK (has_role(auth.uid(), 'faculty') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Creators can update their events"
ON public.calendar_events FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Admins can delete events"
ON public.calendar_events FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_assignments_updated_at
BEFORE UPDATE ON public.assignments
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_calendar_events_updated_at
BEFORE UPDATE ON public.calendar_events
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();