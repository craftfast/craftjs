import { Resend } from "resend";

/**
 * Resend Email Client
 * For transactional emails
 */

// Initialize Resend client (only if API key is available)
function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }

  return new Resend(process.env.RESEND_API_KEY);
}

export const resend = getResendClient();

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@example.com";

/**
 * Send a simple text email
 */
export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
}): Promise<{ id: string } | null> {
  if (!resend) {
    console.warn("Email not sent: Resend is not configured");
    return null;
  }

  const emailOptions: {
    from: string;
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
  } = {
    from: FROM_EMAIL,
    to,
    subject,
  };

  if (text) emailOptions.text = text;
  if (html) emailOptions.html = html;

  // @ts-expect-error - Resend's types are overly strict, but text/html emails are valid
  const { data, error } = await resend.emails.send(emailOptions);

  if (error) {
    console.error("Failed to send email:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Send a React Email template
 */
export async function sendEmailTemplate({
  to,
  subject,
  react,
}: {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
}): Promise<{ id: string } | null> {
  if (!resend) {
    console.warn("Email not sent: Resend is not configured");
    return null;
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    react,
  });

  if (error) {
    console.error("Failed to send email:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Check if Resend is configured
 */
export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}
