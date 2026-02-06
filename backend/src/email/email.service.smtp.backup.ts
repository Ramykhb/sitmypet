/*
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailServiceSMTP {
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
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to send verification email: ${(error as Error).message}`,
      );
    }
  }

  async sendPasswordResetOtp(email: string, otp: string): Promise<void> {
    if (!this.transporter) {
      return;
    }

    const smtpFrom = this.configService.get<string>('SMTP_FROM');

    try {
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
                <h2>Reset Your Password</h2>
                <p>You requested to reset your password. Your reset code is:</p>
                <div class="otp-code">${otp}</div>
                <p><strong>This code expires in 10 minutes.</strong></p>
                <p>If you didn't request this code, please ignore this email and your password will remain unchanged.</p>
              </div>
              <div class="footer">
                <p>© 2025 SitMyPet. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to send password reset email: ${(error as Error).message}`,
      );
    }
  }

  async sendContactForm(
    fullName: string,
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    if (!this.transporter) {
      throw new InternalServerErrorException('Email service is not configured');
    }

    const smtpFrom = this.configService.get<string>('SMTP_FROM');
    const ramyEmail = 'ramykhb18@gmail.com';
    const tarekEmail = 'tarekalkhatibb@gmail.com;';

    try {
      await this.transporter.sendMail({
        from: smtpFrom,
        to: [tarekEmail, ramyEmail],
        replyTo: email,
        subject: `Contact Form: ${subject}`,
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .info-row { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
              .label { font-weight: bold; color: #4F46E5; }
              .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4F46E5; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="content">
                <h2>New Contact Form Submission</h2>
                <div class="info-row">
                  <span class="label">From:</span> ${fullName}
                </div>
                <div class="info-row">
                  <span class="label">Email:</span> ${email}
                </div>
                <div class="info-row">
                  <span class="label">Subject:</span> ${subject}
                </div>
                <div class="message-box">
                  <div class="label">Message:</div>
                  <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
              <div class="footer">
                <p>© 2025 SitMyPet. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to send contact form email: ${(error as Error).message}`,
      );
    }
  }
}
*/
