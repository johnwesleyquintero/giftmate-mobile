CREATE OR REPLACE FUNCTION get_personalized_recommendations(user_id UUID)
RETURNS TABLE (gift_id UUID, similarity_score FLOAT) AS $$
BEGIN
  RETURN QUERY
  WITH user_embeddings AS (
    SELECT activity_type, embedding
    FROM UserActivities
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 50
  ),
  event_insights AS (
    SELECT event_category, event_date
    FROM EventInsights
    WHERE user_id = $1
      AND event_date BETWEEN NOW() - INTERVAL '6 months' AND NOW() + INTERVAL '1 month'
  )
  SELECT 
    g.id AS gift_id,
    SUM(
      CASE 
        WHEN ue.activity_type = 'purchase' THEN 1.5
        WHEN ue.activity_type = 'save' THEN 1.2
        WHEN ei.event_category = 'anniversary' THEN 1.4
        WHEN ei.event_category = 'birthday' THEN 1.3
        ELSE 1.0
      END * (1 - (g.embedding <=> ue.embedding))
    ) AS similarity_score
  FROM Gifts g
  JOIN user_embeddings ue ON true
  LEFT JOIN event_insights ei ON
    EXTRACT(MONTH FROM ei.event_date) = EXTRACT(MONTH FROM NOW())
    AND EXTRACT(DAY FROM ei.event_date) = EXTRACT(DAY FROM NOW())
  GROUP BY g.id
  ORDER BY similarity_score DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- Add composite index for gift categories
CREATE INDEX idx_gifts_category ON Gifts(category);

-- Add index for event date filtering
CREATE INDEX idx_eventinsights_dates_filter ON EventInsights USING BRIN (event_date);

-- Create index for gift embeddings
CREATE INDEX idx_gifts_embedding ON Gifts USING ivfflat (embedding vector_cosine_ops);