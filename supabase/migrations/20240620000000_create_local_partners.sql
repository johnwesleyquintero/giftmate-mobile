-- Create Local Partners table with geospatial support
CREATE TABLE IF NOT EXISTS public.LocalPartners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  location GEOGRAPHY(Point),
  partner_type TEXT CHECK (partner_type IN ('restaurant', 'experience', 'retail')),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable PostGIS extension if not already enabled
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- Create spatial index for location queries
CREATE INDEX IF NOT EXISTS idx_localpartners_location 
  ON public.LocalPartners 
  USING GIST (location);

-- Add row level security policy
ALTER TABLE public.LocalPartners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users"
ON public.LocalPartners
FOR SELECT
USING (true);