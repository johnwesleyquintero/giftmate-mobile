-- Create Event Insights table for calendar analysis
CREATE TABLE IF NOT EXISTS public.EventInsights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  event_date DATE NOT NULL,
  event_category TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for frequent date/category queries
CREATE INDEX idx_eventinsights_dates ON public.EventInsights (event_date, event_category);

-- Row Level Security
ALTER TABLE public.EventInsights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User access to own insights" 
ON public.EventInsights
FOR ALL
USING (user_id = auth.uid());

-- Enable JSONB query capabilities
CREATE INDEX idx_eventinsights_metadata ON public.EventInsights USING GIN (metadata);