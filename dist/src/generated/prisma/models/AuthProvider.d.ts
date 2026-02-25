import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AuthProviderModel = runtime.Types.Result.DefaultSelection<Prisma.$AuthProviderPayload>;
export type AggregateAuthProvider = {
    _count: AuthProviderCountAggregateOutputType | null;
    _avg: AuthProviderAvgAggregateOutputType | null;
    _sum: AuthProviderSumAggregateOutputType | null;
    _min: AuthProviderMinAggregateOutputType | null;
    _max: AuthProviderMaxAggregateOutputType | null;
};
export type AuthProviderAvgAggregateOutputType = {
    userId: number | null;
};
export type AuthProviderSumAggregateOutputType = {
    userId: number | null;
};
export type AuthProviderMinAggregateOutputType = {
    id: string | null;
    userId: number | null;
    provider: $Enums.AuthProviderType | null;
    providerUserId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AuthProviderMaxAggregateOutputType = {
    id: string | null;
    userId: number | null;
    provider: $Enums.AuthProviderType | null;
    providerUserId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AuthProviderCountAggregateOutputType = {
    id: number;
    userId: number;
    provider: number;
    providerUserId: number;
    accessToken: number;
    refreshToken: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AuthProviderAvgAggregateInputType = {
    userId?: true;
};
export type AuthProviderSumAggregateInputType = {
    userId?: true;
};
export type AuthProviderMinAggregateInputType = {
    id?: true;
    userId?: true;
    provider?: true;
    providerUserId?: true;
    accessToken?: true;
    refreshToken?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AuthProviderMaxAggregateInputType = {
    id?: true;
    userId?: true;
    provider?: true;
    providerUserId?: true;
    accessToken?: true;
    refreshToken?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AuthProviderCountAggregateInputType = {
    id?: true;
    userId?: true;
    provider?: true;
    providerUserId?: true;
    accessToken?: true;
    refreshToken?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AuthProviderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthProviderWhereInput;
    orderBy?: Prisma.AuthProviderOrderByWithRelationInput | Prisma.AuthProviderOrderByWithRelationInput[];
    cursor?: Prisma.AuthProviderWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AuthProviderCountAggregateInputType;
    _avg?: AuthProviderAvgAggregateInputType;
    _sum?: AuthProviderSumAggregateInputType;
    _min?: AuthProviderMinAggregateInputType;
    _max?: AuthProviderMaxAggregateInputType;
};
export type GetAuthProviderAggregateType<T extends AuthProviderAggregateArgs> = {
    [P in keyof T & keyof AggregateAuthProvider]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuthProvider[P]> : Prisma.GetScalarType<T[P], AggregateAuthProvider[P]>;
};
export type AuthProviderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthProviderWhereInput;
    orderBy?: Prisma.AuthProviderOrderByWithAggregationInput | Prisma.AuthProviderOrderByWithAggregationInput[];
    by: Prisma.AuthProviderScalarFieldEnum[] | Prisma.AuthProviderScalarFieldEnum;
    having?: Prisma.AuthProviderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuthProviderCountAggregateInputType | true;
    _avg?: AuthProviderAvgAggregateInputType;
    _sum?: AuthProviderSumAggregateInputType;
    _min?: AuthProviderMinAggregateInputType;
    _max?: AuthProviderMaxAggregateInputType;
};
export type AuthProviderGroupByOutputType = {
    id: string;
    userId: number;
    provider: $Enums.AuthProviderType;
    providerUserId: string;
    accessToken: string | null;
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AuthProviderCountAggregateOutputType | null;
    _avg: AuthProviderAvgAggregateOutputType | null;
    _sum: AuthProviderSumAggregateOutputType | null;
    _min: AuthProviderMinAggregateOutputType | null;
    _max: AuthProviderMaxAggregateOutputType | null;
};
type GetAuthProviderGroupByPayload<T extends AuthProviderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AuthProviderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AuthProviderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AuthProviderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AuthProviderGroupByOutputType[P]>;
}>>;
export type AuthProviderWhereInput = {
    AND?: Prisma.AuthProviderWhereInput | Prisma.AuthProviderWhereInput[];
    OR?: Prisma.AuthProviderWhereInput[];
    NOT?: Prisma.AuthProviderWhereInput | Prisma.AuthProviderWhereInput[];
    id?: Prisma.StringFilter<"AuthProvider"> | string;
    userId?: Prisma.IntFilter<"AuthProvider"> | number;
    provider?: Prisma.EnumAuthProviderTypeFilter<"AuthProvider"> | $Enums.AuthProviderType;
    providerUserId?: Prisma.StringFilter<"AuthProvider"> | string;
    accessToken?: Prisma.StringNullableFilter<"AuthProvider"> | string | null;
    refreshToken?: Prisma.StringNullableFilter<"AuthProvider"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AuthProvider"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AuthProvider"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type AuthProviderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    refreshToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type AuthProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    provider_providerUserId?: Prisma.AuthProviderProviderProviderUserIdCompoundUniqueInput;
    userId_provider?: Prisma.AuthProviderUserIdProviderCompoundUniqueInput;
    AND?: Prisma.AuthProviderWhereInput | Prisma.AuthProviderWhereInput[];
    OR?: Prisma.AuthProviderWhereInput[];
    NOT?: Prisma.AuthProviderWhereInput | Prisma.AuthProviderWhereInput[];
    userId?: Prisma.IntFilter<"AuthProvider"> | number;
    provider?: Prisma.EnumAuthProviderTypeFilter<"AuthProvider"> | $Enums.AuthProviderType;
    providerUserId?: Prisma.StringFilter<"AuthProvider"> | string;
    accessToken?: Prisma.StringNullableFilter<"AuthProvider"> | string | null;
    refreshToken?: Prisma.StringNullableFilter<"AuthProvider"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AuthProvider"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AuthProvider"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "provider_providerUserId" | "userId_provider">;
export type AuthProviderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    refreshToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AuthProviderCountOrderByAggregateInput;
    _avg?: Prisma.AuthProviderAvgOrderByAggregateInput;
    _max?: Prisma.AuthProviderMaxOrderByAggregateInput;
    _min?: Prisma.AuthProviderMinOrderByAggregateInput;
    _sum?: Prisma.AuthProviderSumOrderByAggregateInput;
};
export type AuthProviderScalarWhereWithAggregatesInput = {
    AND?: Prisma.AuthProviderScalarWhereWithAggregatesInput | Prisma.AuthProviderScalarWhereWithAggregatesInput[];
    OR?: Prisma.AuthProviderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AuthProviderScalarWhereWithAggregatesInput | Prisma.AuthProviderScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AuthProvider"> | string;
    userId?: Prisma.IntWithAggregatesFilter<"AuthProvider"> | number;
    provider?: Prisma.EnumAuthProviderTypeWithAggregatesFilter<"AuthProvider"> | $Enums.AuthProviderType;
    providerUserId?: Prisma.StringWithAggregatesFilter<"AuthProvider"> | string;
    accessToken?: Prisma.StringNullableWithAggregatesFilter<"AuthProvider"> | string | null;
    refreshToken?: Prisma.StringNullableWithAggregatesFilter<"AuthProvider"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AuthProvider"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"AuthProvider"> | Date | string;
};
export type AuthProviderCreateInput = {
    id?: string;
    provider: $Enums.AuthProviderType;
    providerUserId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAuthProvidersInput;
};
export type AuthProviderUncheckedCreateInput = {
    id?: string;
    userId: number;
    provider: $Enums.AuthProviderType;
    providerUserId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AuthProviderUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAuthProvidersNestedInput;
};
export type AuthProviderUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    provider?: Prisma.EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthProviderCreateManyInput = {
    id?: string;
    userId: number;
    provider: $Enums.AuthProviderType;
    providerUserId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AuthProviderUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthProviderUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    provider?: Prisma.EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthProviderListRelationFilter = {
    every?: Prisma.AuthProviderWhereInput;
    some?: Prisma.AuthProviderWhereInput;
    none?: Prisma.AuthProviderWhereInput;
};
export type AuthProviderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AuthProviderProviderProviderUserIdCompoundUniqueInput = {
    provider: $Enums.AuthProviderType;
    providerUserId: string;
};
export type AuthProviderUserIdProviderCompoundUniqueInput = {
    userId: number;
    provider: $Enums.AuthProviderType;
};
export type AuthProviderCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AuthProviderAvgOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
};
export type AuthProviderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AuthProviderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AuthProviderSumOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
};
export type AuthProviderCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AuthProviderCreateWithoutUserInput, Prisma.AuthProviderUncheckedCreateWithoutUserInput> | Prisma.AuthProviderCreateWithoutUserInput[] | Prisma.AuthProviderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuthProviderCreateOrConnectWithoutUserInput | Prisma.AuthProviderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AuthProviderCreateManyUserInputEnvelope;
    connect?: Prisma.AuthProviderWhereUniqueInput | Prisma.AuthProviderWhereUniqueInput[];
};
export type AuthProviderUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AuthProviderCreateWithoutUserInput, Prisma.AuthProviderUncheckedCreateWithoutUserInput> | Prisma.AuthProviderCreateWithoutUserInput[] | Prisma.AuthProviderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuthProviderCreateOrConnectWithoutUserInput | Prisma.AuthProviderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AuthProviderCreateManyUserInputEnvelope;
    connect?: Prisma.AuthProviderWhereUniqueInput | Prisma.AuthProviderWhereUniqueInput[];
};
export type AuthProviderUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AuthProviderCreateWithoutUserInput, Prisma.AuthProviderUncheckedCreateWithoutUserInput> | Prisma.AuthProviderCreateWithoutUserInput[] | Prisma.AuthProviderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuthProviderCreateOrConnectWithoutUserInput | Prisma.AuthProviderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AuthProviderUpsertWithWhereUniqueWithoutUserInput | Prisma.AuthProviderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AuthProviderCreateManyUserInputEnvelope;
    set?: Prisma.AuthProviderWhereUniqueInput | Prisma.AuthProviderWhereUniqueInput[];
    disconnect?: Prisma.AuthProviderWhereUniqueInput | Prisma.AuthProviderWhereUniqueInput[];
    delete?: Prisma.AuthProviderWhereUniqueInput | Prisma.AuthProviderWhereUniqueInput[];
    connect?: Prisma.AuthProviderWhereUniqueInput | Prisma.AuthProviderWhereUniqueInput[];
    update?: Prisma.AuthProviderUpdateWithWhereUniqueWithoutUserInput | Prisma.AuthProviderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AuthProviderUpdateManyWithWhereWithoutUserInput | Prisma.AuthProviderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AuthProviderScalarWhereInput | Prisma.AuthProviderScalarWhereInput[];
};
export type AuthProviderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AuthProviderCreateWithoutUserInput, Prisma.AuthProviderUncheckedCreateWithoutUserInput> | Prisma.AuthProviderCreateWithoutUserInput[] | Prisma.AuthProviderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuthProviderCreateOrConnectWithoutUserInput | Prisma.AuthProviderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AuthProviderUpsertWithWhereUniqueWithoutUserInput | Prisma.AuthProviderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AuthProviderCreateManyUserInputEnvelope;
    set?: Prisma.AuthProviderWhereUniqueInput | Prisma.AuthProviderWhereUniqueInput[];
    disconnect?: Prisma.AuthProviderWhereUniqueInput | Prisma.AuthProviderWhereUniqueInput[];
    delete?: Prisma.AuthProviderWhereUniqueInput | Prisma.AuthProviderWhereUniqueInput[];
    connect?: Prisma.AuthProviderWhereUniqueInput | Prisma.AuthProviderWhereUniqueInput[];
    update?: Prisma.AuthProviderUpdateWithWhereUniqueWithoutUserInput | Prisma.AuthProviderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AuthProviderUpdateManyWithWhereWithoutUserInput | Prisma.AuthProviderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AuthProviderScalarWhereInput | Prisma.AuthProviderScalarWhereInput[];
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type EnumAuthProviderTypeFieldUpdateOperationsInput = {
    set?: $Enums.AuthProviderType;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type AuthProviderCreateWithoutUserInput = {
    id?: string;
    provider: $Enums.AuthProviderType;
    providerUserId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AuthProviderUncheckedCreateWithoutUserInput = {
    id?: string;
    provider: $Enums.AuthProviderType;
    providerUserId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AuthProviderCreateOrConnectWithoutUserInput = {
    where: Prisma.AuthProviderWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuthProviderCreateWithoutUserInput, Prisma.AuthProviderUncheckedCreateWithoutUserInput>;
};
export type AuthProviderCreateManyUserInputEnvelope = {
    data: Prisma.AuthProviderCreateManyUserInput | Prisma.AuthProviderCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AuthProviderUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AuthProviderWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuthProviderUpdateWithoutUserInput, Prisma.AuthProviderUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AuthProviderCreateWithoutUserInput, Prisma.AuthProviderUncheckedCreateWithoutUserInput>;
};
export type AuthProviderUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AuthProviderWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuthProviderUpdateWithoutUserInput, Prisma.AuthProviderUncheckedUpdateWithoutUserInput>;
};
export type AuthProviderUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AuthProviderScalarWhereInput;
    data: Prisma.XOR<Prisma.AuthProviderUpdateManyMutationInput, Prisma.AuthProviderUncheckedUpdateManyWithoutUserInput>;
};
export type AuthProviderScalarWhereInput = {
    AND?: Prisma.AuthProviderScalarWhereInput | Prisma.AuthProviderScalarWhereInput[];
    OR?: Prisma.AuthProviderScalarWhereInput[];
    NOT?: Prisma.AuthProviderScalarWhereInput | Prisma.AuthProviderScalarWhereInput[];
    id?: Prisma.StringFilter<"AuthProvider"> | string;
    userId?: Prisma.IntFilter<"AuthProvider"> | number;
    provider?: Prisma.EnumAuthProviderTypeFilter<"AuthProvider"> | $Enums.AuthProviderType;
    providerUserId?: Prisma.StringFilter<"AuthProvider"> | string;
    accessToken?: Prisma.StringNullableFilter<"AuthProvider"> | string | null;
    refreshToken?: Prisma.StringNullableFilter<"AuthProvider"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AuthProvider"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AuthProvider"> | Date | string;
};
export type AuthProviderCreateManyUserInput = {
    id?: string;
    provider: $Enums.AuthProviderType;
    providerUserId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AuthProviderUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthProviderUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthProviderUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthProviderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["authProvider"]>;
export type AuthProviderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["authProvider"]>;
export type AuthProviderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["authProvider"]>;
export type AuthProviderSelectScalar = {
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AuthProviderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "provider" | "providerUserId" | "accessToken" | "refreshToken" | "createdAt" | "updatedAt", ExtArgs["result"]["authProvider"]>;
export type AuthProviderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AuthProviderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AuthProviderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $AuthProviderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AuthProvider";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: number;
        provider: $Enums.AuthProviderType;
        providerUserId: string;
        accessToken: string | null;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["authProvider"]>;
    composites: {};
};
export type AuthProviderGetPayload<S extends boolean | null | undefined | AuthProviderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload, S>;
export type AuthProviderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AuthProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AuthProviderCountAggregateInputType | true;
};
export interface AuthProviderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AuthProvider'];
        meta: {
            name: 'AuthProvider';
        };
    };
    findUnique<T extends AuthProviderFindUniqueArgs>(args: Prisma.SelectSubset<T, AuthProviderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AuthProviderClient<runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AuthProviderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AuthProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuthProviderClient<runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AuthProviderFindFirstArgs>(args?: Prisma.SelectSubset<T, AuthProviderFindFirstArgs<ExtArgs>>): Prisma.Prisma__AuthProviderClient<runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AuthProviderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AuthProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuthProviderClient<runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AuthProviderFindManyArgs>(args?: Prisma.SelectSubset<T, AuthProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AuthProviderCreateArgs>(args: Prisma.SelectSubset<T, AuthProviderCreateArgs<ExtArgs>>): Prisma.Prisma__AuthProviderClient<runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AuthProviderCreateManyArgs>(args?: Prisma.SelectSubset<T, AuthProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AuthProviderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AuthProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AuthProviderDeleteArgs>(args: Prisma.SelectSubset<T, AuthProviderDeleteArgs<ExtArgs>>): Prisma.Prisma__AuthProviderClient<runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AuthProviderUpdateArgs>(args: Prisma.SelectSubset<T, AuthProviderUpdateArgs<ExtArgs>>): Prisma.Prisma__AuthProviderClient<runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AuthProviderDeleteManyArgs>(args?: Prisma.SelectSubset<T, AuthProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AuthProviderUpdateManyArgs>(args: Prisma.SelectSubset<T, AuthProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AuthProviderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AuthProviderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AuthProviderUpsertArgs>(args: Prisma.SelectSubset<T, AuthProviderUpsertArgs<ExtArgs>>): Prisma.Prisma__AuthProviderClient<runtime.Types.Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AuthProviderCountArgs>(args?: Prisma.Subset<T, AuthProviderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AuthProviderCountAggregateOutputType> : number>;
    aggregate<T extends AuthProviderAggregateArgs>(args: Prisma.Subset<T, AuthProviderAggregateArgs>): Prisma.PrismaPromise<GetAuthProviderAggregateType<T>>;
    groupBy<T extends AuthProviderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AuthProviderGroupByArgs['orderBy'];
    } : {
        orderBy?: AuthProviderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AuthProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AuthProviderFieldRefs;
}
export interface Prisma__AuthProviderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AuthProviderFieldRefs {
    readonly id: Prisma.FieldRef<"AuthProvider", 'String'>;
    readonly userId: Prisma.FieldRef<"AuthProvider", 'Int'>;
    readonly provider: Prisma.FieldRef<"AuthProvider", 'AuthProviderType'>;
    readonly providerUserId: Prisma.FieldRef<"AuthProvider", 'String'>;
    readonly accessToken: Prisma.FieldRef<"AuthProvider", 'String'>;
    readonly refreshToken: Prisma.FieldRef<"AuthProvider", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AuthProvider", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"AuthProvider", 'DateTime'>;
}
export type AuthProviderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthProviderSelect<ExtArgs> | null;
    omit?: Prisma.AuthProviderOmit<ExtArgs> | null;
    include?: Prisma.AuthProviderInclude<ExtArgs> | null;
    where: Prisma.AuthProviderWhereUniqueInput;
};
export type AuthProviderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthProviderSelect<ExtArgs> | null;
    omit?: Prisma.AuthProviderOmit<ExtArgs> | null;
    include?: Prisma.AuthProviderInclude<ExtArgs> | null;
    where: Prisma.AuthProviderWhereUniqueInput;
};
export type AuthProviderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuthProviderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuthProviderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuthProviderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthProviderSelect<ExtArgs> | null;
    omit?: Prisma.AuthProviderOmit<ExtArgs> | null;
    include?: Prisma.AuthProviderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuthProviderCreateInput, Prisma.AuthProviderUncheckedCreateInput>;
};
export type AuthProviderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AuthProviderCreateManyInput | Prisma.AuthProviderCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AuthProviderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthProviderSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuthProviderOmit<ExtArgs> | null;
    data: Prisma.AuthProviderCreateManyInput | Prisma.AuthProviderCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AuthProviderIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AuthProviderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthProviderSelect<ExtArgs> | null;
    omit?: Prisma.AuthProviderOmit<ExtArgs> | null;
    include?: Prisma.AuthProviderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuthProviderUpdateInput, Prisma.AuthProviderUncheckedUpdateInput>;
    where: Prisma.AuthProviderWhereUniqueInput;
};
export type AuthProviderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AuthProviderUpdateManyMutationInput, Prisma.AuthProviderUncheckedUpdateManyInput>;
    where?: Prisma.AuthProviderWhereInput;
    limit?: number;
};
export type AuthProviderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthProviderSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuthProviderOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuthProviderUpdateManyMutationInput, Prisma.AuthProviderUncheckedUpdateManyInput>;
    where?: Prisma.AuthProviderWhereInput;
    limit?: number;
    include?: Prisma.AuthProviderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AuthProviderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthProviderSelect<ExtArgs> | null;
    omit?: Prisma.AuthProviderOmit<ExtArgs> | null;
    include?: Prisma.AuthProviderInclude<ExtArgs> | null;
    where: Prisma.AuthProviderWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuthProviderCreateInput, Prisma.AuthProviderUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AuthProviderUpdateInput, Prisma.AuthProviderUncheckedUpdateInput>;
};
export type AuthProviderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthProviderSelect<ExtArgs> | null;
    omit?: Prisma.AuthProviderOmit<ExtArgs> | null;
    include?: Prisma.AuthProviderInclude<ExtArgs> | null;
    where: Prisma.AuthProviderWhereUniqueInput;
};
export type AuthProviderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthProviderWhereInput;
    limit?: number;
};
export type AuthProviderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthProviderSelect<ExtArgs> | null;
    omit?: Prisma.AuthProviderOmit<ExtArgs> | null;
    include?: Prisma.AuthProviderInclude<ExtArgs> | null;
};
export {};
