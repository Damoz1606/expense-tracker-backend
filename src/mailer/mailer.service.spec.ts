import { MailerService } from './mailer.service';
import { MailerOptions, MODULE_OPTIONS_TOKEN } from './mailer.module-definition';
import { TestBed } from '@automock/jest';
import { MailSenderOptions } from './mailer.interface';

describe('MailerService', () => {
  let service: MailerService;

  beforeEach(async () => {
    const { unit } = TestBed.create(MailerService)
      .mock(MODULE_OPTIONS_TOKEN)
      .using({
        host: 'http://test.com',
        mail: 'test@email.com',
        name: 'test',
        password: 'test-password',
        port: 465,
        secure: true,
        user: 'test'
      } as MailerOptions).compile();

    service = unit
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('send', () => {
    let transporter;
    const mailOptions: MailSenderOptions = {
      from: { address: 'sender@example.com', name: 'sender@example.com' },
      recipients: [{ address: 'recipient@example.com', name: 'recipient@example.com' }],
      subject: 'Test Subject',
      text: 'Test Email Body',
    };

    beforeEach(() => {
      transporter = (service as any).transporter = {
        sendMail: jest.fn()
      }
    });

    it('should send an email with the provided options', async () => {
      // Arrange
      transporter.sendMail.mockResolvedValue({ accepted: [mailOptions.recipients] });

      // Act
      const result = await service.send(mailOptions);

      // Assert
      expect(transporter.sendMail).toHaveBeenCalledWith({
        from: mailOptions.from,
        to: mailOptions.recipients,
        subject: mailOptions.subject,
        text: mailOptions.text,
      });
      expect(result).toEqual({ accepted: [mailOptions.recipients] });
    });

    it('should use default sender if no from is provided', async () => {
      // Arrange
      transporter.sendMail.mockResolvedValue({ accepted: [mailOptions.recipients] });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { from, ...options } = mailOptions;

      // Act
      const result = await service.send(options);

      // Assert
      expect(transporter.sendMail).toHaveBeenCalledWith({
        from: 'test@email.com',
        to: mailOptions.recipients,
        subject: mailOptions.subject,
        text: mailOptions.text,
      });
      expect(result).toEqual({ accepted: [mailOptions.recipients] });
    });

    it('should handle errors when sending email', async () => {
      // Arrange
      transporter.sendMail.mockRejectedValue(new Error);

      // Act & Assert
      await expect(service.send(mailOptions)).rejects.toThrow(Error);
    });
  });
});
