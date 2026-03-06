// @ts-nocheck
import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";

const resendApiKey =
  Deno.env.get("RESEND_API_KEY") ??
  "re_7fqupjCs_HmZDkRaPpXDUvvpLZmwZxegV";

const resend = new Resend(resendApiKey);

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseKey =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
  Deno.env.get("SUPABASE_ANON_KEY") ??
  "";

const supabase = createClient(supabaseUrl, supabaseKey);

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async () => {
  try {
    const now = new Date().toISOString();

    const { data: letters, error } = await supabase
      .from("letters")
      .select("id,email,title,body")
      .lte("send_at", now)
      .is("sent_at", null);

    if (error) {
      throw error;
    }

    if (!letters || letters.length === 0) {
      return new Response(
        JSON.stringify({ sent: 0, message: "No pending letters." }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    let sentCount = 0;
    const results: unknown[] = [];

    for (const letter of letters) {
      const { id, email, title, body } = letter as {
        id: number;
        email: string;
        title: string | null;
        body: string | null;
      };

      if (!email) continue;

      const { error: sendError } = await resend.emails.send({
        from: "Future Letter <onboarding@resend.dev>",
        to: email,
        subject: title || "미래에서 온 편지",
        html: `<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; white-space: pre-line;">${escapeHtml(body ?? "")}</div>`,
      });

      if (sendError) {
        results.push({ id, status: "error", message: sendError.message });
        continue;
      }

      await supabase
        .from("letters")
        .update({ sent_at: now })
        .eq("id", id);

      sentCount += 1;
      results.push({ id, status: "sent" });
    }

    return new Response(
      JSON.stringify({ sent: sentCount, results }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("send-letter error", err);

    return new Response(
      JSON.stringify({
        error: (err && (err as { message?: string }).message) ||
          String(err),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});
