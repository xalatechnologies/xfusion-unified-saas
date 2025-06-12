import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const orgId = url.searchParams.get("orgId");
    if (!orgId) {
      return new Response(JSON.stringify({ error: "Missing orgId" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));

    // Try to fetch org theme
    const { data: orgTheme, error: orgError } = await supabase
      .from("organization_themes")
      .select("theme_overrides")
      .eq("organization_id", orgId)
      .eq("is_active", true)
      .maybeSingle();

    if (orgError) throw orgError;

    if (orgTheme && orgTheme.theme_overrides && Object.keys(orgTheme.theme_overrides).length > 0) {
      return new Response(JSON.stringify(orgTheme.theme_overrides), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Fallback to global theme
    const { data: globalTheme, error: globalError } = await supabase
      .from("global_theme_settings")
      .select("theme_config")
      .eq("is_active", true)
      .maybeSingle();

    if (globalError) throw globalError;

    return new Response(JSON.stringify(globalTheme?.theme_config || {}), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error fetching theme:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
}); 