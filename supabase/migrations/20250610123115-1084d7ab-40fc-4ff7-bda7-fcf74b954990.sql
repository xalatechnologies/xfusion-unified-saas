
-- Fix the update_user_info function to remove updated_at reference
CREATE OR REPLACE FUNCTION public.update_user_info(
  user_id_param uuid,
  first_name_param text DEFAULT NULL,
  last_name_param text DEFAULT NULL,
  avatar_url_param text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- Only super admins can update user info
  IF NOT public.current_user_is_super_admin() THEN
    RAISE EXCEPTION 'Access denied. Only super admins can update user information.';
  END IF;

  UPDATE public.users
  SET 
    first_name = COALESCE(first_name_param, first_name),
    last_name = COALESCE(last_name_param, last_name),
    avatar_url = COALESCE(avatar_url_param, avatar_url)
  WHERE id = user_id_param;
END;
$function$;
