import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailerOptions, MODULE_OPTIONS_TOKEN } from './mailer.module-definition';
import { createTransport, Transporter } from 'nodemailer';
import { MailSenderOptions } from './mailer.interface';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
    private readonly transporter: Transporter;
    private readonly default: string;
    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) options: MailerOptions
    ) {
        console.log(options);
        this.default = options.mail;
        this.transporter = createTransport({
            host: options.host,
            port: options.port,
            secure: options.secure,
            auth: {
                user: options.user,
                pass: options.password
            }
        });
    }

    /**
     * Send email to the given recipients
     * @param param0 - Parameters that specify the recipients, subject, and the message
     * @returns Object
     */
    public async send({ from, recipients, subject, text }: MailSenderOptions): Promise<any> {

        const mailOptions: Mail.Options = {
            from: from ?? this.default,
            to: recipients,
            subject,
            text
        }

        try {
            const result = await this.transporter.sendMail(mailOptions);
            return result;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }
}
