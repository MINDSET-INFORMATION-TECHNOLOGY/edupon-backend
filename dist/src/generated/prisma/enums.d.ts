export declare const Role: {
    readonly STUDENT: "STUDENT";
    readonly EDUCATOR: "EDUCATOR";
    readonly COMPANY: "COMPANY";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const AuthProviderType: {
    readonly GOOGLE: "GOOGLE";
    readonly LINKEDIN: "LINKEDIN";
};
export type AuthProviderType = (typeof AuthProviderType)[keyof typeof AuthProviderType];
