import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8"

const RESEND_API_KEY = Deno.env.get("RESEND_API");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("Missing RESEND_API secret");
    }

    // Initialize Supabase Client with Service Role Key to bypass RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Fetch pending emails that are scheduled for now or in the past, and not yet sent
    const { data: queueItems, error: queueError } = await supabase
      .from('email_queue')
      .select('id, lead_id, email_type, scheduled_for')
      .is('sent_at', null)
      .lte('scheduled_for', new Date().toISOString());

    if (queueError) throw queueError;

    if (!queueItems || queueItems.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'No pending emails in queue' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    let processedCount = 0;
    const errors = [];

    // 2. Process each item in the queue
    for (const item of queueItems) {
      try {
        // Fetch lead information
        const { data: lead, error: leadError } = await supabase
          .from('leads')
          .select('first_name, last_name, email, company, website, lead_magnet')
          .eq('id', item.lead_id)
          .single();

        if (leadError) throw leadError;
        if (!lead) throw new Error(`Lead not found for ID: ${item.lead_id}`);

        const leadName = lead.first_name || 'there';
        let subject = '';
        let htmlBody = '';

        // 3. Compile email content based on email_type
        if (item.email_type === 'nurture_2') {
          subject = "Vanity metrics are costing you money.";
          htmlBody = `
            <p>Hey ${leadName},</p>
            <p>Steve Martin here, founder of Gobiya.</p>
            <p>Most B2B companies share a frustrating pattern: organic traffic climbs steadily month over month, but their pipeline report stays flat. Leadership celebrates the traffic; sales asks where the leads are.</p>
            <p>The disconnect is structural. Traditional agencies optimize for raw impressions. But traffic doesn't pay salaries. Predictable revenue does.</p>
            <p>At Gobiya, we look at organic search as a pipeline engineering problem. We design topical architectures and schema graphs to capture high-intent buyers, connect them directly to your CRM pipeline, and map exactly where they clicked.</p>
            <p>In our next email, I will share the exact RAG/GEO strategy we used to drive a 3.5x organic MQL increase for one of our B2B tech clients. Keep an eye out.</p>
            <p>Best,</p>
            <p><strong>Steve Martin</strong><br>CEO & Lead Engineer, Gobiya</p>
          `;
        } else if (item.email_type === 'nurture_3') {
          subject = "Case Study: 3.5x B2B MQL growth in 9 months";
          htmlBody = `
            <p>Hey ${leadName},</p>
            <p>Yesterday we discussed vanity metrics. Today, let's look at a real-world B2B success story.</p>
            <p>We partnered with a high-growth B2B enterprise software brand whose search traffic was flat. Instead of writing generic 800-word blog posts, we re-architected their entire site around RAG search engines and Generative Engine Optimization (GEO).</p>
            <p>Here is what we did:</p>
            <ul>
              <li><strong>Resolved Entity Conflicts</strong>: Integrated structured Organization and Service schemas linked to Wikidata, aligning their profiles.</li>
              <li><strong>Passage-Level Extraction</strong>: Rebuilt their technical core to satisfy Claude and ChatGPT crawling bots, allowing AI to cite their data natively.</li>
              <li><strong>Conversion Tracking</strong>: Linked their forms straight to CRM deals, tracking pipeline values rather than page impressions.</li>
            </ul>
            <p><strong>The result:</strong> An immediate 350% increase in generative citation share, leading to a 3.5x jump in qualified inbound MQLs inside 9 months.</p>
            <p>If you'd like to read the full technical breakdown, check out our insights page or schedule a session to run this audit live on your domain.</p>
            <p>Best,</p>
            <p><strong>Steve Martin</strong><br>CEO & Lead Engineer, Gobiya</p>
          `;
        } else if (item.email_type === 'nurture_4') {
          subject = "Why cheap SEO is the most expensive thing you'll buy";
          htmlBody = `
            <p>Hey ${leadName},</p>
            <p>Let's talk about budget.</p>
            <p>Cheap SEO services ($1,500 – $3,000/mo) are everywhere. They promise rankings, links, and content. But they are the most expensive thing you can buy.</p>
            <p>Why? Because they waste your most valuable asset: <strong>time</strong>. A Generalist agency spends 6 months executing basic SEO checklists only to show you reports of ranking for zero-value keywords while competitors capture the high-intent deals.</p>
            <p>B2B search in 2026 requires software engineering. It requires Core Web Vitals of 100, Core Update recovery protocols, schema graphs, and GEO citation architectures. That's why we build custom, sub-second React landing pages and treat organic search as a technical challenge.</p>
            <p>Investing in growth engineering means saving months of flatlined pipeline and capturing actual revenue buyers.</p>
            <p>Best,</p>
            <p><strong>Steve Martin</strong><br>CEO & Lead Engineer, Gobiya</p>
          `;
        } else if (item.email_type === 'nurture_5') {
          subject = "Let's audit your search pipeline (Live 15-min call)";
          htmlBody = `
            <p>Hey ${leadName},</p>
            <p>It's been a week since you downloaded our framework, and I hope it's helping you map out your topical strategy.</p>
            <p>If you are ready to stop losing organic search traffic to competitors and get cited natively by ChatGPT and Claude, let's look at your website together.</p>
            <p>I'd like to invite you to a live 15-minute screen-share audit. We'll run a forensic diagnostic on ${lead.website || 'your website'}, examine your Knowledge Graph entity resolution, and show you exactly where the gaps are.</p>
            <p>No sales pitch, just direct access to our engineering team to help you scale your pipeline.</p>
            <p>You can book your slot directly on our live calendar here: <a href="https://www.gobiya.com/book?email=${encodeURIComponent(lead.email)}">Schedule Audit Session</a>.</p>
            <p>Hope to speak soon,</p>
            <p><strong>Steve Martin</strong><br>CEO & Lead Engineer, Gobiya</p>
          `;
        } else {
          throw new Error(`Unknown email type: ${item.email_type}`);
        }

        // Wrap HTML body in a premium branding wrapper
        const finalHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111827; line-height: 1.6;">
            <div style="border-bottom: 2px solid #F26522; padding-bottom: 15px; margin-bottom: 25px;">
              <img src="https://www.gobiya.com/images/logo-gobiya-07082026.webp" alt="Gobiya" style="height: 35px; width: auto;" />
            </div>
            <div style="font-size: 15px;">
              ${htmlBody}
            </div>
            <div style="margin-top: 40px; border-t: 1px solid #e5e7eb; padding-top: 15px; font-size: 12px; color: #6b7280;">
              <p>Gobiya Search Engineering — 3580 Wilshire Blvd, Ste 132, Los Angeles, CA 90010</p>
              <p>To unsubscribe from nurture emails, reply with "unsubscribe".</p>
            </div>
          </div>
        `;

        // Send email using Resend API
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Steve Martin | Gobiya <onboarding@resend.dev>', // Update this to verified domain if needed
            to: lead.email,
            subject: subject,
            html: finalHtml,
          }),
        });

        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.message || 'Resend API error');
        }

        // Update email_queue entry as sent
        const { error: updateError } = await supabase
          .from('email_queue')
          .update({ sent_at: new Date().toISOString() })
          .eq('id', item.id);

        if (updateError) throw updateError;
        processedCount++;

      } catch (err: any) {
        console.error(`Error processing queue item ${item.id}:`, err.message);
        errors.push({ id: item.id, error: err.message });
      }
    }

    return new Response(
      JSON.stringify({ success: true, processed: processedCount, errors: errors }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('Edge function error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
