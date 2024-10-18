import { Address } from "nodemailer/lib/mailer";

export interface MailSenderOptions {
    from?: Address;
    recipients: Address[],
    subject: string;
    text: string;
}