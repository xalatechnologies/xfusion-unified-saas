begin;

-- Drop the existing insert policy if it exists
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;

-- Create a new policy that allows users to insert their own notifications
CREATE POLICY "Users can create their own notifications"
  ON public.notifications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

commit; 