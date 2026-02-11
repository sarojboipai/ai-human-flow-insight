
-- Allow anonymous inserts on jobs table
CREATE POLICY "Allow anonymous insert on jobs"
ON public.jobs
FOR INSERT
WITH CHECK (true);

-- Allow anonymous updates on jobs table
CREATE POLICY "Allow anonymous update on jobs"
ON public.jobs
FOR UPDATE
USING (true);

-- Allow anonymous deletes on jobs table
CREATE POLICY "Allow anonymous delete on jobs"
ON public.jobs
FOR DELETE
USING (true);
