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
export declare class MailService {
    private transporter;
    sendOtpVerificationEmail(input: SendOtpMailInput): Promise<void>;
    sendPasswordResetEmail(input: SendPasswordResetMailInput): Promise<void>;
    private getTransporter;
    private buildCodeEmailText;
    private renderCodeTemplate;
    private getRequiredEnv;
    private getRequiredNumberEnv;
    private getBooleanEnv;
    private escapeHtml;
}
export {};
