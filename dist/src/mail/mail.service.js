"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mjml_1 = __importDefault(require("mjml"));
const nodemailer_1 = __importDefault(require("nodemailer"));
let MailService = class MailService {
    transporter = null;
    async sendOtpVerificationEmail(input) {
        const from = this.getRequiredEnv('MAIL_FROM');
        const appName = process.env.MAIL_APP_NAME?.trim() || 'Edupon';
        const subject = process.env.MAIL_OTP_SUBJECT?.trim() || `${appName} OTP Verification`;
        const greetingName = input.fullname?.trim() || 'there';
        const expiryTime = input.expiresAt.toISOString();
        const text = [
            `Hello ${greetingName},`,
            '',
            `Your verification code is: ${input.otp}`,
            '',
            `This code expires at ${expiryTime} and is valid for up to 5 minutes.`,
            '',
            `If you did not request this code, ignore this email.`,
        ].join('\n');
        const html = this.renderOtpTemplate({
            appName,
            greetingName,
            otp: input.otp,
            expiryTime,
        });
        await this.getTransporter().sendMail({
            from,
            to: input.to,
            subject,
            text,
            html,
        });
    }
    async sendPasswordResetEmail(input) {
        const from = this.getRequiredEnv('MAIL_FROM');
        const appName = process.env.MAIL_APP_NAME?.trim() || 'Edupon';
        const subject = process.env.MAIL_PASSWORD_RESET_SUBJECT?.trim() || `${appName} Password Reset`;
        const greetingName = input.fullname?.trim() || 'there';
        const expiryTime = input.expiresAt.toISOString();
        const text = [
            `Hello ${greetingName},`,
            '',
            `Your password reset code is: ${input.otp}`,
            '',
            `This code expires at ${expiryTime} and is valid for up to 5 minutes.`,
            '',
            `If you did not request this reset, ignore this email.`,
        ].join('\n');
        const html = this.renderPasswordResetTemplate({
            appName,
            greetingName,
            otp: input.otp,
            expiryTime,
        });
        await this.getTransporter().sendMail({
            from,
            to: input.to,
            subject,
            text,
            html,
        });
    }
    getTransporter() {
        if (this.transporter) {
            return this.transporter;
        }
        const host = this.getRequiredEnv('MAIL_HOST');
        const port = this.getRequiredNumberEnv('MAIL_PORT');
        const user = this.getRequiredEnv('MAIL_USER');
        const pass = this.getRequiredEnv('MAIL_PASS');
        const secure = this.getBooleanEnv('MAIL_SECURE', port === 465);
        this.transporter = nodemailer_1.default.createTransport({
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
    renderOtpTemplate(input) {
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
                Your verification code is:
              </mj-text>
              <mj-text align="center" color="#000000" font-size="28px" font-weight="700">
                ${this.escapeHtml(input.otp)}
              </mj-text>
              <mj-text color="#000000" font-size="14px">
                This code expires at ${this.escapeHtml(input.expiryTime)} and is valid for up to 5 minutes.
              </mj-text>
              <mj-text color="#000000" font-size="14px">
                If you did not request this code, ignore this email.
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `;
        const rendered = (0, mjml_1.default)(mjmlTemplate, { validationLevel: 'strict' });
        if (rendered.errors.length > 0) {
            throw new common_1.InternalServerErrorException('Failed to render OTP email template');
        }
        return rendered.html;
    }
    renderPasswordResetTemplate(input) {
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
                Your password reset code is:
              </mj-text>
              <mj-text align="center" color="#000000" font-size="28px" font-weight="700">
                ${this.escapeHtml(input.otp)}
              </mj-text>
              <mj-text color="#000000" font-size="14px">
                This code expires at ${this.escapeHtml(input.expiryTime)} and is valid for up to 5 minutes.
              </mj-text>
              <mj-text color="#000000" font-size="14px">
                If you did not request this reset, ignore this email.
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `;
        const rendered = (0, mjml_1.default)(mjmlTemplate, { validationLevel: 'strict' });
        if (rendered.errors.length > 0) {
            throw new common_1.InternalServerErrorException('Failed to render password reset email template');
        }
        return rendered.html;
    }
    getRequiredEnv(key) {
        const value = process.env[key]?.trim();
        if (!value) {
            throw new common_1.InternalServerErrorException(`Missing required mail configuration: ${key}`);
        }
        return value;
    }
    getRequiredNumberEnv(key) {
        const value = this.getRequiredEnv(key);
        const parsed = Number(value);
        if (!Number.isFinite(parsed)) {
            throw new common_1.InternalServerErrorException(`Invalid number for mail configuration: ${key}`);
        }
        return parsed;
    }
    getBooleanEnv(key, defaultValue) {
        const value = process.env[key]?.trim().toLowerCase();
        if (!value) {
            return defaultValue;
        }
        return value === '1' || value === 'true' || value === 'yes';
    }
    escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)()
], MailService);
//# sourceMappingURL=mail.service.js.map