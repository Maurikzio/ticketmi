import EmailPasswordReset from "@/emails/password/email-password-reset"
import { resend } from "@/lib/resend"


export const sendEmailPassword = async (username: string, email: string, passwordResetLink: string) => {
  return await resend.emails.send({
    from: "no-reply@ticketmi.com",
    to: email,
    subject: "Password Reset from TicketBounty",
    react: <EmailPasswordReset toName={username} url={passwordResetLink} />
  })
}
