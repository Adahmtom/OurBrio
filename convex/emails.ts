"use node";

import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Email templates ───────────────────────────────────────────────────────────

function customerConfirmationHtml(args: {
  name: string;
  date: string;
  time: string;
  email: string;
}) {
  const firstName = args.name.split(" ")[0];
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Your Diagnosis Call is Booked — OurBrio</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Logo / Header -->
        <tr>
          <td style="background:#111111;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;border-bottom:1px solid #1f1f1f;">
            <p style="margin:0;font-size:26px;font-weight:800;color:#34d399;letter-spacing:-0.5px;">OurBrio</p>
            <p style="margin:6px 0 0;font-size:11px;color:#6b7280;letter-spacing:2px;text-transform:uppercase;">Diagnose. Prescribe. Build.</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#111111;padding:40px;">

            <!-- Checkmark icon (text fallback) -->
            <div style="text-align:center;margin-bottom:24px;">
              <div style="display:inline-block;width:60px;height:60px;background:#064e3b;border-radius:50%;line-height:60px;font-size:26px;color:#34d399;text-align:center;">&#10003;</div>
            </div>

            <h2 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#ffffff;text-align:center;">
              You&apos;re booked, ${firstName}!
            </h2>
            <p style="margin:0 0 32px;font-size:14px;color:#9ca3af;text-align:center;">
              Your Diagnosis Call request has been received. We&apos;ll confirm shortly.
            </p>

            <!-- Booking card -->
            <table width="100%" cellpadding="0" cellspacing="0"
              style="background:#1a1a1a;border-radius:12px;border:1px solid #2d2d2d;margin-bottom:28px;">
              <tr>
                <td style="padding:24px 28px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:10px 0;border-bottom:1px solid #252525;">
                        <span style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:4px;">Name</span>
                        <span style="font-size:15px;color:#ffffff;font-weight:600;">${args.name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;border-bottom:1px solid #252525;">
                        <span style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:4px;">Date</span>
                        <span style="font-size:15px;color:#ffffff;font-weight:600;">${formatDate(args.date)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;">
                        <span style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:4px;">Time</span>
                        <span style="font-size:20px;color:#34d399;font-weight:700;">${args.time}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- What happens next -->
            <div style="background:#0d2818;border-radius:12px;border:1px solid #14532d;padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#34d399;text-transform:uppercase;letter-spacing:0.5px;">
                What happens next
              </p>
              <p style="margin:0 0 8px;font-size:14px;color:#d1fae5;line-height:1.5;">
                &#10003;&nbsp; We&apos;ll review your booking and confirm it within a few hours.
              </p>
              <p style="margin:0 0 8px;font-size:14px;color:#d1fae5;line-height:1.5;">
                &#10003;&nbsp; You&apos;ll receive a calendar invite with the video call link.
              </p>
              <p style="margin:0;font-size:14px;color:#d1fae5;line-height:1.5;">
                &#10003;&nbsp; Come prepared to talk about your business goals — we&apos;ll take it from there.
              </p>
            </div>

            <p style="margin:0;font-size:13px;color:#6b7280;text-align:center;">
              Questions? Email us at
              <a href="mailto:info@ourbrio.com" style="color:#34d399;text-decoration:none;font-weight:600;">info@ourbrio.com</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0d0d0d;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;border-top:1px solid #1a1a1a;">
            <p style="margin:0;font-size:12px;color:#4b5563;">
              &copy; ${new Date().getFullYear()} OurBrio &mdash; Remote-first, serving clients globally.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function adminNotificationHtml(args: {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  message?: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Diagnosis Call Booking</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#111111;border-radius:16px 16px 0 0;padding:24px 36px;border-bottom:1px solid #1f1f1f;">
            <p style="margin:0;font-size:18px;font-weight:700;color:#34d399;">&#128197; New Diagnosis Call Booking</p>
            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">
              Received ${new Date().toLocaleString("en-US", {
                timeZone: "America/Toronto",
                dateStyle: "full",
                timeStyle: "short",
              })} ET
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#111111;padding:28px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0"
              style="background:#1a1a1a;border-radius:12px;border:1px solid #2d2d2d;">
              <tr><td style="padding:24px 28px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding:8px 0;border-bottom:1px solid #252525;">
                    <span style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;">Client Name</span>
                    <span style="font-size:16px;color:#fff;font-weight:700;">${args.name}</span>
                  </td></tr>
                  <tr><td style="padding:8px 0;border-bottom:1px solid #252525;">
                    <span style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;">Email</span>
                    <a href="mailto:${args.email}" style="font-size:15px;color:#34d399;font-weight:600;text-decoration:none;">${args.email}</a>
                  </td></tr>
                  ${args.phone ? `
                  <tr><td style="padding:8px 0;border-bottom:1px solid #252525;">
                    <span style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;">Phone</span>
                    <a href="tel:${args.phone}" style="font-size:15px;color:#fff;font-weight:600;text-decoration:none;">${args.phone}</a>
                  </td></tr>` : ""}
                  <tr><td style="padding:8px 0;border-bottom:1px solid #252525;">
                    <span style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;">Date</span>
                    <span style="font-size:15px;color:#fff;font-weight:600;">${formatDate(args.date)}</span>
                  </td></tr>
                  <tr><td style="padding:8px 0;${args.message ? "border-bottom:1px solid #252525;" : ""}">
                    <span style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;">Time</span>
                    <span style="font-size:20px;color:#34d399;font-weight:700;">${args.time}</span>
                  </td></tr>
                  ${args.message ? `
                  <tr><td style="padding:8px 0;">
                    <span style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;">Message</span>
                    <span style="font-size:14px;color:#d1d5db;line-height:1.6;">${args.message}</span>
                  </td></tr>` : ""}
                </table>
              </td></tr>
            </table>

            <div style="margin-top:20px;padding:14px 18px;background:#1a2e1a;border-radius:10px;border:1px solid #166534;">
              <p style="margin:0;font-size:13px;color:#86efac;line-height:1.5;">
                &#128279; Log in to the
                <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://ourbrio.com"}/admin/calendar"
                  style="color:#34d399;text-decoration:underline;">admin calendar</a>
                to confirm or reschedule this booking.
              </p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0d0d0d;border-radius:0 0 16px 16px;padding:16px 36px;text-align:center;border-top:1px solid #1a1a1a;">
            <p style="margin:0;font-size:11px;color:#4b5563;">OurBrio Admin &mdash; do not reply to this email</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Internal action ───────────────────────────────────────────────────────────

export const sendBookingConfirmation = internalAction({
  args: {
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.optional(v.string()),
    date: v.string(),
    time: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn(
        "[emails] RESEND_API_KEY is not set — skipping email. " +
          "Run: npx convex env set RESEND_API_KEY re_xxxx",
      );
      return;
    }

    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM_EMAIL ?? "OurBrio <onboarding@resend.dev>";
    const adminEmail = process.env.ADMIN_EMAIL ?? "info@ourbrio.com";

    // 1. Confirmation to customer
    const { error: customerError } = await resend.emails.send({
      from,
      to: args.customerEmail,
      subject: `Your Diagnosis Call is Booked — ${formatDate(args.date)} at ${args.time}`,
      html: customerConfirmationHtml({
        name: args.customerName,
        email: args.customerEmail,
        date: args.date,
        time: args.time,
      }),
    });
    if (customerError) {
      console.error("[emails] Failed to send customer confirmation:", customerError);
    }

    // 2. Alert to admin
    const { error: adminError } = await resend.emails.send({
      from,
      to: adminEmail,
      subject: `📅 New Diagnosis Call: ${args.customerName} — ${args.date} at ${args.time}`,
      html: adminNotificationHtml({
        name: args.customerName,
        email: args.customerEmail,
        phone: args.customerPhone,
        date: args.date,
        time: args.time,
        message: args.message,
      }),
    });
    if (adminError) {
      console.error("[emails] Failed to send admin notification:", adminError);
    }

    if (!customerError && !adminError) {
      console.log(
        `[emails] ✓ Sent confirmation to ${args.customerEmail} + alert to ${adminEmail}`,
      );
    }
  },
});
