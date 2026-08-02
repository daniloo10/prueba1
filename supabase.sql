-- Create the audit_requests table
CREATE TABLE public.audit_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  company_name text NOT NULL,
  website_url text NOT NULL,
  monthly_revenue text NOT NULL,
  main_problem text NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.audit_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own requests
CREATE POLICY "Users can insert their own audit requests" 
  ON public.audit_requests 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to select their own requests
CREATE POLICY "Users can view their own audit requests" 
  ON public.audit_requests 
  FOR SELECT 
  USING (auth.uid() = user_id);
