-- Fix NULL values in painter_details table
UPDATE painter_details SET is_verified = false WHERE is_verified IS NULL;
UPDATE painter_details SET is_available = false WHERE is_available IS NULL;

-- Add NOT NULL constraints with defaults
ALTER TABLE painter_details MODIFY is_verified BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE painter_details MODIFY is_available BOOLEAN NOT NULL DEFAULT true;