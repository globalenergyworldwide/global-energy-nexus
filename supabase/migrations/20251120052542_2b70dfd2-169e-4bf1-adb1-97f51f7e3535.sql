-- Add policy to allow viewing public trade listings (where buyer_id is null)
CREATE POLICY "Public can view available trade listings"
  ON public.trades FOR SELECT
  USING (buyer_id IS NULL AND status = 'pending');