import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const from = process.env.RESEND_FROM ?? "GLAM Parapharmacie <noreply@example.com>";

export async function sendEmail(params: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  if (!resend) return { skipped: true };

  return resend.emails.send({
    from,
    to: params.to,
    subject: params.subject,
    html: params.html,
  });
}
