import { Injectable, InternalServerErrorException } from '@nestjs/common';
import mjml2html from 'mjml';
import nodemailer, { Transporter } from 'nodemailer';

type SendOtpMailInput = {
  to: string;
  otp: string;
  expiresAt: Date;
  fullname?: string;
};

type SendPasswordResetMailInput = {
  to: string;
  otp: string;
  expiresAt: Date;
  fullname?: string;
};

@Injectable()
export class MailService {
  private transporter: Transporter | null = null;

  async sendOtpVerificationEmail(input: SendOtpMailInput): Promise<void> {
    const from = this.getRequiredEnv('MAIL_FROM');
    const appName = process.env.MAIL_APP_NAME?.trim() || 'Edupon';
    const subject = process.env.MAIL_OTP_SUBJECT?.trim() || `${appName} OTP Verification`;
    const greetingName = input.fullname?.trim() || 'there';
    const expiryTime = input.expiresAt.toISOString();

    const text = this.buildCodeEmailText({
      greetingName,
      code: input.otp,
      codeLabel: 'verification code',
      expiryTime,
      ignoreMessage: 'If you did not request this code, ignore this email.',
    });

    const html = this.renderCodeTemplate({
      appName,
      greetingName,
      code: input.otp,
      codeLabel: 'verification code',
      expiryTime,
      ignoreMessage: 'If you did not request this code, ignore this email.',
      renderErrorMessage: 'Failed to render OTP email template',
    });

    await this.getTransporter().sendMail({
      from,
      to: input.to,
      subject,
      text,
      html,
    });
  }

  async sendPasswordResetEmail(input: SendPasswordResetMailInput): Promise<void> {
    const from = this.getRequiredEnv('MAIL_FROM');
    const appName = process.env.MAIL_APP_NAME?.trim() || 'Edupon';
    const subject = process.env.MAIL_PASSWORD_RESET_SUBJECT?.trim() || `${appName} Password Reset`;
    const greetingName = input.fullname?.trim() || 'there';
    const expiryTime = input.expiresAt.toISOString();

    const text = this.buildCodeEmailText({
      greetingName,
      code: input.otp,
      codeLabel: 'password reset code',
      expiryTime,
      ignoreMessage: 'If you did not request this reset, ignore this email.',
    });

    const html = this.renderCodeTemplate({
      appName,
      greetingName,
      code: input.otp,
      codeLabel: 'password reset code',
      expiryTime,
      ignoreMessage: 'If you did not request this reset, ignore this email.',
      renderErrorMessage: 'Failed to render password reset email template',
    });

    await this.getTransporter().sendMail({
      from,
      to: input.to,
      subject,
      text,
      html,
    });
  }

  private getTransporter(): Transporter {
    if (this.transporter) {
      return this.transporter;
    }

    const host = this.getRequiredEnv('MAIL_HOST');
    const port = this.getRequiredNumberEnv('MAIL_PORT');
    const user = this.getRequiredEnv('MAIL_USER');
    const pass = this.getRequiredEnv('MAIL_PASS');
    const secure = this.getBooleanEnv('MAIL_SECURE', port === 465);

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    return this.transporter;
  }

  private buildCodeEmailText(input: {
    greetingName: string;
    code: string;
    codeLabel: string;
    expiryTime: string;
    ignoreMessage: string;
  }): string {
    return [
      `Hello ${input.greetingName},`,
      '',
      `Your ${input.codeLabel} is: ${input.code}`,
      '',
      `This code expires at ${input.expiryTime} and is valid for up to 5 minutes.`,
      '',
      input.ignoreMessage,
    ].join('\n');
  }

  private renderCodeTemplate(input: {
    appName: string;
    greetingName: string;
    code: string;
    codeLabel: string;
    expiryTime: string;
    ignoreMessage: string;
    renderErrorMessage: string;
  }): string {
    const mjmlTemplate = `
      <mjml>
        <mj-body background-color="#ffffff">
          <mj-section background-color="#0b5ed7" padding="20px">
            <mj-column>
              <mj-text align="center" color="#ffffff" font-size="22px" font-weight="700">
                ${this.escapeHtml(input.appName)}
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section background-color="#ffffff" padding="24px">
            <mj-column>
              <mj-text color="#000000" font-size="16px">
                Hello ${this.escapeHtml(input.greetingName)},
              </mj-text>
              <mj-text color="#000000" font-size="16px">
                Your ${this.escapeHtml(input.codeLabel)} is:
              </mj-text>
              <mj-text align="center" color="#000000" font-size="28px" font-weight="700">
                ${this.escapeHtml(input.code)}
              </mj-text>
              <mj-text color="#000000" font-size="14px">
                This code expires at ${this.escapeHtml(input.expiryTime)} and is valid for up to 5 minutes.
              </mj-text>
              <mj-text color="#000000" font-size="14px">
                ${this.escapeHtml(input.ignoreMessage)}
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `;

    const rendered = mjml2html(mjmlTemplate, { validationLevel: 'strict' });
    if (rendered.errors.length > 0) {
      throw new InternalServerErrorException(input.renderErrorMessage);
    }

    return rendered.html;
  }

  private getRequiredEnv(key: string): string {
    const value = process.env[key]?.trim();
    if (!value) {
      throw new InternalServerErrorException(`Missing required mail configuration: ${key}`);
    }
    return value;
  }

  private getRequiredNumberEnv(key: string): number {
    const value = this.getRequiredEnv(key);
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      throw new InternalServerErrorException(`Invalid number for mail configuration: ${key}`);
    }
    return parsed;
  }

  private getBooleanEnv(key: string, defaultValue: boolean): boolean {
    const value = process.env[key]?.trim().toLowerCase();
    if (!value) {
      return defaultValue;
    }
    return value === '1' || value === 'true' || value === 'yes';
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
