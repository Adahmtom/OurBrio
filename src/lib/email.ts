import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"OurBrio" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}

// Email templates
export function projectInquiryEmail(data: {
  businessName: string;
  contactName: string;
  email: string;
  services: string[];
  budget: string;
  preferredDate: string;
  preferredTime: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #059669; }
        .highlight { background: #10b981; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Project Inquiry!</h1>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Business:</span> ${data.businessName}
          </div>
          <div class="field">
            <span class="label">Contact:</span> ${data.contactName}
          </div>
          <div class="field">
            <span class="label">Email:</span> ${data.email}
          </div>
          <div class="field">
            <span class="label">Services:</span> ${data.services.join(", ")}
          </div>
          <div class="field">
            <span class="label">Budget:</span> ${data.budget}
          </div>
          <div class="highlight">
            📅 Scheduled: ${data.preferredDate} at ${data.preferredTime}
          </div>
          <p style="margin-top: 30px; color: #666;">
            View full details in the <a href="${process.env.NEXTAUTH_URL}/admin/inquiries" style="color: #10b981;">Admin Dashboard</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function contactSubmissionEmail(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #059669; }
        .message { background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #10b981; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Name:</span> ${data.name}
          </div>
          <div class="field">
            <span class="label">Email:</span> ${data.email}
          </div>
          ${data.company ? `<div class="field"><span class="label">Company:</span> ${data.company}</div>` : ""}
          <div class="message">
            <span class="label">Message:</span>
            <p>${data.message}</p>
          </div>
          <p style="margin-top: 30px; color: #666;">
            View in <a href="${process.env.NEXTAUTH_URL}/admin/contacts" style="color: #10b981;">Admin Dashboard</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function confirmationEmail(data: {
  name: string;
  preferredDate?: string;
  preferredTime?: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .highlight { background: #10b981; color: white; padding: 15px 25px; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Thank You, ${data.name}!</h1>
        </div>
        <div class="content">
          <p>We've received your inquiry and our team will review it shortly.</p>
          ${data.preferredDate ? `
            <p>Your consultation is scheduled for:</p>
            <div class="highlight">
              📅 ${data.preferredDate} at ${data.preferredTime}
            </div>
            <p>We'll send you a calendar invite with meeting details within 24 hours.</p>
          ` : ""}
          <p>In the meantime, feel free to explore our <a href="${process.env.NEXTAUTH_URL}/case-studies" style="color: #10b981;">case studies</a> to see examples of our work.</p>
          <div class="footer">
            <p>Best regards,<br><strong>The OurBrio Team</strong></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
