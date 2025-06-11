begin;
-- remove the supabase_realtime publication if it exists
drop publication if exists supabase_realtime;

-- re-create the supabase_realtime publication
create publication supabase_realtime;

-- add the notifications table to the publication
alter publication supabase_realtime add table notifications;

commit; 