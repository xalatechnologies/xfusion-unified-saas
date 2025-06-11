import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'npm:resend';
import { corsHeaders } from '../_shared/cors.ts';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  unsubscribeLink?: string;
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const defaultFromEmail = 'notifications@supplymantix.com';

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to, subject, html, from, replyTo, unsubscribeLink } = await req.json() as EmailPayload;

    // Validate required fields
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields: to, subject, html'
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Add unsubscribe header if link is provided
    const headers: Record<string, string> = {};
    if (unsubscribeLink) {
      headers['List-Unsubscribe'] = `<${unsubscribeLink}>`;
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: from || defaultFromEmail,
      to,
      subject,
      html,
      reply_to: replyTo,
      headers
    });

    if (error) {
      console.error('Failed to send email:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    return new Response(
      JSON.stringify({ data }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}); 