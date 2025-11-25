-- Create announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal',
  author_id UUID NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view published announcements
CREATE POLICY "Anyone can view published announcements"
ON public.announcements
FOR SELECT
USING (published = true);

-- Only admins and faculty can create announcements
CREATE POLICY "Admins and faculty can create announcements"
ON public.announcements
FOR INSERT
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'faculty'::app_role)
);

-- Only admins and faculty can update their own announcements
CREATE POLICY "Admins and faculty can update their announcements"
ON public.announcements
FOR UPDATE
USING (
  author_id = auth.uid() AND 
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'faculty'::app_role))
);

-- Only admins can delete announcements
CREATE POLICY "Admins can delete announcements"
ON public.announcements
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add updated_at trigger
CREATE TRIGGER update_announcements_updated_at
BEFORE UPDATE ON public.announcements
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();