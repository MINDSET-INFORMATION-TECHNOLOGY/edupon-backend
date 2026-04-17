import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserAvgAggregateOutputType = {
    id: number | null;
};
export type UserSumAggregateOutputType = {
    id: number | null;
};
export type UserMinAggregateOutputType = {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    profile: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserAvgAggregateInputType = {
    id?: true;
};
export type UserSumAggregateInputType = {
    id?: true;
};
export type UserMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    profile?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: number;
    profile: runtime.JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.IntFilter<"User"> | number;
    profile?: Prisma.JsonNullableFilter<"User">;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    authProviders?: Prisma.AuthProviderListRelationFilter;
    otpVerification?: Prisma.XOR<Prisma.UserOtpNullableScalarRelationFilter, Prisma.UserOtpWhereInput> | null;
    passwordReset?: Prisma.XOR<Prisma.UserPasswordResetNullableScalarRelationFilter, Prisma.UserPasswordResetWhereInput> | null;
    portfolio?: Prisma.XOR<Prisma.PortfolioNullableScalarRelationFilter, Prisma.PortfolioWhereInput> | null;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    profile?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    authProviders?: Prisma.AuthProviderOrderByRelationAggregateInput;
    otpVerification?: Prisma.UserOtpOrderByWithRelationInput;
    passwordReset?: Prisma.UserPasswordResetOrderByWithRelationInput;
    portfolio?: Prisma.PortfolioOrderByWithRelationInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    profile?: Prisma.JsonNullableFilter<"User">;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    authProviders?: Prisma.AuthProviderListRelationFilter;
    otpVerification?: Prisma.XOR<Prisma.UserOtpNullableScalarRelationFilter, Prisma.UserOtpWhereInput> | null;
    passwordReset?: Prisma.XOR<Prisma.UserPasswordResetNullableScalarRelationFilter, Prisma.UserPasswordResetWhereInput> | null;
    portfolio?: Prisma.XOR<Prisma.PortfolioNullableScalarRelationFilter, Prisma.PortfolioWhereInput> | null;
}, "id">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    profile?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _avg?: Prisma.UserAvgOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
    _sum?: Prisma.UserSumOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"User"> | number;
    profile?: Prisma.JsonNullableWithAggregatesFilter<"User">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: Prisma.AuthProviderCreateNestedManyWithoutUserInput;
    otpVerification?: Prisma.UserOtpCreateNestedOneWithoutUserInput;
    passwordReset?: Prisma.UserPasswordResetCreateNestedOneWithoutUserInput;
    portfolio?: Prisma.PortfolioCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: number;
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: Prisma.AuthProviderUncheckedCreateNestedManyWithoutUserInput;
    otpVerification?: Prisma.UserOtpUncheckedCreateNestedOneWithoutUserInput;
    passwordReset?: Prisma.UserPasswordResetUncheckedCreateNestedOneWithoutUserInput;
    portfolio?: Prisma.PortfolioUncheckedCreateNestedOneWithoutUserInput;
};
export type UserUpdateInput = {
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: Prisma.AuthProviderUpdateManyWithoutUserNestedInput;
    otpVerification?: Prisma.UserOtpUpdateOneWithoutUserNestedInput;
    passwordReset?: Prisma.UserPasswordResetUpdateOneWithoutUserNestedInput;
    portfolio?: Prisma.PortfolioUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: Prisma.AuthProviderUncheckedUpdateManyWithoutUserNestedInput;
    otpVerification?: Prisma.UserOtpUncheckedUpdateOneWithoutUserNestedInput;
    passwordReset?: Prisma.UserPasswordResetUncheckedUpdateOneWithoutUserNestedInput;
    portfolio?: Prisma.PortfolioUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: number;
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    profile?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type UserCreateNestedOneWithoutAuthProvidersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAuthProvidersInput, Prisma.UserUncheckedCreateWithoutAuthProvidersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAuthProvidersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutAuthProvidersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAuthProvidersInput, Prisma.UserUncheckedCreateWithoutAuthProvidersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAuthProvidersInput;
    upsert?: Prisma.UserUpsertWithoutAuthProvidersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAuthProvidersInput, Prisma.UserUpdateWithoutAuthProvidersInput>, Prisma.UserUncheckedUpdateWithoutAuthProvidersInput>;
};
export type UserCreateNestedOneWithoutOtpVerificationInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOtpVerificationInput, Prisma.UserUncheckedCreateWithoutOtpVerificationInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOtpVerificationInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOtpVerificationNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOtpVerificationInput, Prisma.UserUncheckedCreateWithoutOtpVerificationInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOtpVerificationInput;
    upsert?: Prisma.UserUpsertWithoutOtpVerificationInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOtpVerificationInput, Prisma.UserUpdateWithoutOtpVerificationInput>, Prisma.UserUncheckedUpdateWithoutOtpVerificationInput>;
};
export type UserCreateNestedOneWithoutPasswordResetInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetInput, Prisma.UserUncheckedCreateWithoutPasswordResetInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPasswordResetInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPasswordResetNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetInput, Prisma.UserUncheckedCreateWithoutPasswordResetInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPasswordResetInput;
    upsert?: Prisma.UserUpsertWithoutPasswordResetInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPasswordResetInput, Prisma.UserUpdateWithoutPasswordResetInput>, Prisma.UserUncheckedUpdateWithoutPasswordResetInput>;
};
export type UserCreateNestedOneWithoutPortfolioInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPortfolioInput, Prisma.UserUncheckedCreateWithoutPortfolioInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPortfolioInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPortfolioNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPortfolioInput, Prisma.UserUncheckedCreateWithoutPortfolioInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPortfolioInput;
    upsert?: Prisma.UserUpsertWithoutPortfolioInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPortfolioInput, Prisma.UserUpdateWithoutPortfolioInput>, Prisma.UserUncheckedUpdateWithoutPortfolioInput>;
};
export type UserCreateWithoutAuthProvidersInput = {
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    otpVerification?: Prisma.UserOtpCreateNestedOneWithoutUserInput;
    passwordReset?: Prisma.UserPasswordResetCreateNestedOneWithoutUserInput;
    portfolio?: Prisma.PortfolioCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutAuthProvidersInput = {
    id?: number;
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    otpVerification?: Prisma.UserOtpUncheckedCreateNestedOneWithoutUserInput;
    passwordReset?: Prisma.UserPasswordResetUncheckedCreateNestedOneWithoutUserInput;
    portfolio?: Prisma.PortfolioUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutAuthProvidersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAuthProvidersInput, Prisma.UserUncheckedCreateWithoutAuthProvidersInput>;
};
export type UserUpsertWithoutAuthProvidersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAuthProvidersInput, Prisma.UserUncheckedUpdateWithoutAuthProvidersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAuthProvidersInput, Prisma.UserUncheckedCreateWithoutAuthProvidersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAuthProvidersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAuthProvidersInput, Prisma.UserUncheckedUpdateWithoutAuthProvidersInput>;
};
export type UserUpdateWithoutAuthProvidersInput = {
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    otpVerification?: Prisma.UserOtpUpdateOneWithoutUserNestedInput;
    passwordReset?: Prisma.UserPasswordResetUpdateOneWithoutUserNestedInput;
    portfolio?: Prisma.PortfolioUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutAuthProvidersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    otpVerification?: Prisma.UserOtpUncheckedUpdateOneWithoutUserNestedInput;
    passwordReset?: Prisma.UserPasswordResetUncheckedUpdateOneWithoutUserNestedInput;
    portfolio?: Prisma.PortfolioUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutOtpVerificationInput = {
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: Prisma.AuthProviderCreateNestedManyWithoutUserInput;
    passwordReset?: Prisma.UserPasswordResetCreateNestedOneWithoutUserInput;
    portfolio?: Prisma.PortfolioCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutOtpVerificationInput = {
    id?: number;
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: Prisma.AuthProviderUncheckedCreateNestedManyWithoutUserInput;
    passwordReset?: Prisma.UserPasswordResetUncheckedCreateNestedOneWithoutUserInput;
    portfolio?: Prisma.PortfolioUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutOtpVerificationInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOtpVerificationInput, Prisma.UserUncheckedCreateWithoutOtpVerificationInput>;
};
export type UserUpsertWithoutOtpVerificationInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOtpVerificationInput, Prisma.UserUncheckedUpdateWithoutOtpVerificationInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOtpVerificationInput, Prisma.UserUncheckedCreateWithoutOtpVerificationInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOtpVerificationInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOtpVerificationInput, Prisma.UserUncheckedUpdateWithoutOtpVerificationInput>;
};
export type UserUpdateWithoutOtpVerificationInput = {
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: Prisma.AuthProviderUpdateManyWithoutUserNestedInput;
    passwordReset?: Prisma.UserPasswordResetUpdateOneWithoutUserNestedInput;
    portfolio?: Prisma.PortfolioUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutOtpVerificationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: Prisma.AuthProviderUncheckedUpdateManyWithoutUserNestedInput;
    passwordReset?: Prisma.UserPasswordResetUncheckedUpdateOneWithoutUserNestedInput;
    portfolio?: Prisma.PortfolioUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutPasswordResetInput = {
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: Prisma.AuthProviderCreateNestedManyWithoutUserInput;
    otpVerification?: Prisma.UserOtpCreateNestedOneWithoutUserInput;
    portfolio?: Prisma.PortfolioCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutPasswordResetInput = {
    id?: number;
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: Prisma.AuthProviderUncheckedCreateNestedManyWithoutUserInput;
    otpVerification?: Prisma.UserOtpUncheckedCreateNestedOneWithoutUserInput;
    portfolio?: Prisma.PortfolioUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutPasswordResetInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetInput, Prisma.UserUncheckedCreateWithoutPasswordResetInput>;
};
export type UserUpsertWithoutPasswordResetInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPasswordResetInput, Prisma.UserUncheckedUpdateWithoutPasswordResetInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetInput, Prisma.UserUncheckedCreateWithoutPasswordResetInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPasswordResetInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPasswordResetInput, Prisma.UserUncheckedUpdateWithoutPasswordResetInput>;
};
export type UserUpdateWithoutPasswordResetInput = {
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: Prisma.AuthProviderUpdateManyWithoutUserNestedInput;
    otpVerification?: Prisma.UserOtpUpdateOneWithoutUserNestedInput;
    portfolio?: Prisma.PortfolioUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPasswordResetInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: Prisma.AuthProviderUncheckedUpdateManyWithoutUserNestedInput;
    otpVerification?: Prisma.UserOtpUncheckedUpdateOneWithoutUserNestedInput;
    portfolio?: Prisma.PortfolioUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutPortfolioInput = {
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: Prisma.AuthProviderCreateNestedManyWithoutUserInput;
    otpVerification?: Prisma.UserOtpCreateNestedOneWithoutUserInput;
    passwordReset?: Prisma.UserPasswordResetCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutPortfolioInput = {
    id?: number;
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: Prisma.AuthProviderUncheckedCreateNestedManyWithoutUserInput;
    otpVerification?: Prisma.UserOtpUncheckedCreateNestedOneWithoutUserInput;
    passwordReset?: Prisma.UserPasswordResetUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutPortfolioInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPortfolioInput, Prisma.UserUncheckedCreateWithoutPortfolioInput>;
};
export type UserUpsertWithoutPortfolioInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPortfolioInput, Prisma.UserUncheckedUpdateWithoutPortfolioInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPortfolioInput, Prisma.UserUncheckedCreateWithoutPortfolioInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPortfolioInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPortfolioInput, Prisma.UserUncheckedUpdateWithoutPortfolioInput>;
};
export type UserUpdateWithoutPortfolioInput = {
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: Prisma.AuthProviderUpdateManyWithoutUserNestedInput;
    otpVerification?: Prisma.UserOtpUpdateOneWithoutUserNestedInput;
    passwordReset?: Prisma.UserPasswordResetUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPortfolioInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    profile?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: Prisma.AuthProviderUncheckedUpdateManyWithoutUserNestedInput;
    otpVerification?: Prisma.UserOtpUncheckedUpdateOneWithoutUserNestedInput;
    passwordReset?: Prisma.UserPasswordResetUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCountOutputType = {
    authProviders: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    authProviders?: boolean | UserCountOutputTypeCountAuthProvidersArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountAuthProvidersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthProviderWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    profile?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    authProviders?: boolean | Prisma.User$authProvidersArgs<ExtArgs>;
    otpVerification?: boolean | Prisma.User$otpVerificationArgs<ExtArgs>;
    passwordReset?: boolean | Prisma.User$passwordResetArgs<ExtArgs>;
    portfolio?: boolean | Prisma.User$portfolioArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    profile?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    profile?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    profile?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "profile" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    authProviders?: boolean | Prisma.User$authProvidersArgs<ExtArgs>;
    otpVerification?: boolean | Prisma.User$otpVerificationArgs<ExtArgs>;
    passwordReset?: boolean | Prisma.User$passwordResetArgs<ExtArgs>;
    portfolio?: boolean | Prisma.User$portfolioArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        authProviders: Prisma.$AuthProviderPayload<ExtArgs>[];
        otpVerification: Prisma.$UserOtpPayload<ExtArgs> | null;
        passwordReset: Prisma.$UserPasswordResetPayload<ExtArgs> | null;
        portfolio: Prisma.$PortfolioPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        profile: runtime.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    authProviders<T extends Prisma.User$authProvidersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$authProvidersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    otpVerification<T extends Prisma.User$otpVerificationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$otpVerificationArgs<ExtArgs>>): Prisma.Prisma__UserOtpClient<runtime.Types.Result.GetResult<Prisma.$UserOtpPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    passwordReset<T extends Prisma.User$passwordResetArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$passwordResetArgs<ExtArgs>>): Prisma.Prisma__UserPasswordResetClient<runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    portfolio<T extends Prisma.User$portfolioArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$portfolioArgs<ExtArgs>>): Prisma.Prisma__PortfolioClient<runtime.Types.Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'Int'>;
    readonly profile: Prisma.FieldRef<"User", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$authProvidersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthProviderSelect<ExtArgs> | null;
    omit?: Prisma.AuthProviderOmit<ExtArgs> | null;
    include?: Prisma.AuthProviderInclude<ExtArgs> | null;
    where?: Prisma.AuthProviderWhereInput;
    orderBy?: Prisma.AuthProviderOrderByWithRelationInput | Prisma.AuthProviderOrderByWithRelationInput[];
    cursor?: Prisma.AuthProviderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuthProviderScalarFieldEnum | Prisma.AuthProviderScalarFieldEnum[];
};
export type User$otpVerificationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelect<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    include?: Prisma.UserOtpInclude<ExtArgs> | null;
    where?: Prisma.UserOtpWhereInput;
};
export type User$passwordResetArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    include?: Prisma.UserPasswordResetInclude<ExtArgs> | null;
    where?: Prisma.UserPasswordResetWhereInput;
};
export type User$portfolioArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelect<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    include?: Prisma.PortfolioInclude<ExtArgs> | null;
    where?: Prisma.PortfolioWhereInput;
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
export {};
