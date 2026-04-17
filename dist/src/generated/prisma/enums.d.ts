export declare const Role: {
    readonly student: "student";
    readonly educator: "educator";
    readonly company: "company";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const AuthProviderType: {
    readonly GOOGLE: "GOOGLE";
    readonly LINKEDIN: "LINKEDIN";
};
export type AuthProviderType = (typeof AuthProviderType)[keyof typeof AuthProviderType];
