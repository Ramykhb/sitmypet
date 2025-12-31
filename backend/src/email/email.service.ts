import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor(private readonly configService: ConfigService) {
    const smtpHost = this.configService.get<string>('SMTP_HOST');
    const smtpPort = this.configService.get<number>('SMTP_PORT');
    const smtpUser = this.configService.get<string>('SMTP_USER');
    const smtpPass = this.configService.get<string>('SMTP_PASS');

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: false,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
    }
  }

  async sendOtp(email: string, otp: string): Promise<void> {
    if (!this.transporter) {
      return;
    }

    const smtpFrom = this.configService.get<string>('SMTP_FROM');

    try {
      await this.transporter.sendMail({
        from: smtpFrom,
        to: email,
        subject: 'Your SitMyPet Verification Code',
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #4F46E5; text-align: center; padding: 20px; background: white; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🐾 SitMyPet</h1>
              </div>
              <div class="content">
                <h2>Verify Your Email</h2>
                <p>Thank you for signing up! Your verification code is:</p>
                <div class="otp-code">${otp}</div>
                <p><strong>This code expires in 10 minutes.</strong></p>
                <p>If you didn't request this code, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>© 2025 SitMyPet. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      });

      console.log(`✅ Verification OTP sent to ${email}`);
    } catch (error) {
      console.error('❌ Failed to send OTP email:', error);
      throw new Error(
        `Failed to send verification email: ${(error as Error).message}`,
      );
    }
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const frontendUrl =
      this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3001';
    const resetLink = `${frontendUrl}/reset-password?token=${token}`;

    if (!this.transporter) {
      return;
    }

    const smtpFrom = this.configService.get<string>('SMTP_FROM');

    await this.transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: 'Reset Your SitMyPet Password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🐾 SitMyPet</h1>
              </div>
              <div class="content">
                <h2>Reset Your Password</h2>
                <p>You requested to reset your password. Click the button below to proceed:</p>
                <div style="text-align: center;">
                  <a href="${resetLink}" class="button">Reset Password</a>
                </div>
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #4F46E5;">${resetLink}</p>
                <p><strong>This link expires in 1 hour.</strong></p>
                <p>If you didn't request this, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>© 2025 SitMyPet. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`✅ Password reset email sent to ${email}`);
  }
}
