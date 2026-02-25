type SendOtpMailInput = {
    to: string;
    otp: string;
    expiresAt: Date;
    fullname?: string;
};
export declare class MailService {
    private transporter;
    sendOtpVerificationEmail(input: SendOtpMailInput): Promise<void>;
    private getTransporter;
    private renderOtpTemplate;
    private getRequiredEnv;
    private getRequiredNumberEnv;
    private getBooleanEnv;
    private escapeHtml;
}
export {};
