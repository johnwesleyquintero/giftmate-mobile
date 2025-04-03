-- Create User Activities table with embedding support
CREATE TABLE IF NOT EXISTS public.UserActivities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  activity_type TEXT CHECK (activity_type IN ('view', 'save', 'purchase')),
  gift_id UUID REFERENCES public.Gifts,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  embedding vector(1536) -- OpenAI embedding dimension
);

-- Create index for embedding similarity searches
CREATE INDEX idx_useractivities_embedding 
  ON public.UserActivities 
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Row Level Security
ALTER TABLE public.UserActivities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User access to own activities"
ON public.UserActivities
FOR ALL
USING (user_id = auth.uid());