
-- Create candidates table
CREATE TABLE public.candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  role_type text NOT NULL DEFAULT 'nurse',
  specialization text,
  experience_years integer NOT NULL DEFAULT 0,
  geography text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'available',
  source text,
  resume_url text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- Public read access (no auth yet)
CREATE POLICY "Allow public read access on candidates"
  ON public.candidates
  FOR SELECT
  USING (true);

-- Public insert access (no auth yet)
CREATE POLICY "Allow public insert access on candidates"
  ON public.candidates
  FOR INSERT
  WITH CHECK (true);

-- Public update access (no auth yet)
CREATE POLICY "Allow public update access on candidates"
  ON public.candidates
  FOR UPDATE
  USING (true);

-- Public delete access (no auth yet)
CREATE POLICY "Allow public delete access on candidates"
  ON public.candidates
  FOR DELETE
  USING (true);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_candidates_updated_at
  BEFORE UPDATE ON public.candidates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
