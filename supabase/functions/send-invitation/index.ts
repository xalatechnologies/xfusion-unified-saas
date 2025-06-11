import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvitationEmailRequest {
  email: string;
  organizationName: string;
  inviterName: string;
  role: string;
  invitationToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, organizationName, inviterName, role, invitationToken }: InvitationEmailRequest = await req.json();

    const invitationUrl = `${new URL(req.url).origin}/invite/${invitationToken}`;

    const emailResponse = await resend.emails.send({
      from: "SupplyMantix <noreply@yourdomain.com>",
      to: [email],
      subject: `You're invited to join ${organizationName} on SupplyMantix`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3B82F6;">You're invited to join ${organizationName}</h1>
          <p>Hello,</p>
          <p>${inviterName} has invited you to join <strong>${organizationName}</strong> on SupplyMantix as a <strong>${role}</strong>.</p>
          <p>SupplyMantix is a modern platform that unifies maintenance and supply-chain operations into one comprehensive system.</p>
          
          <div style="margin: 30px 0;">
            <a href="${invitationUrl}" 
               style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Accept Invitation
            </a>
          </div>
          
          <p>Or copy and paste this link into your browser:</p>
          <p style="background-color: #f5f5f5; padding: 10px; word-break: break-all;">${invitationUrl}</p>
          
          <p style="color: #666; font-size: 14px;">This invitation will expire in 7 days.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            If you didn't expect this invitation, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    console.log("Invitation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending invitation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
