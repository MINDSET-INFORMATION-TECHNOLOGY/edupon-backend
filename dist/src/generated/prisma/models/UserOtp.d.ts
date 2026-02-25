import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserOtpModel = runtime.Types.Result.DefaultSelection<Prisma.$UserOtpPayload>;
export type AggregateUserOtp = {
    _count: UserOtpCountAggregateOutputType | null;
    _avg: UserOtpAvgAggregateOutputType | null;
    _sum: UserOtpSumAggregateOutputType | null;
    _min: UserOtpMinAggregateOutputType | null;
    _max: UserOtpMaxAggregateOutputType | null;
};
export type UserOtpAvgAggregateOutputType = {
    userId: number | null;
};
export type UserOtpSumAggregateOutputType = {
    userId: number | null;
};
export type UserOtpMinAggregateOutputType = {
    id: string | null;
    userId: number | null;
    codeHash: string | null;
    expiresAt: Date | null;
    verifiedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserOtpMaxAggregateOutputType = {
    id: string | null;
    userId: number | null;
    codeHash: string | null;
    expiresAt: Date | null;
    verifiedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserOtpCountAggregateOutputType = {
    id: number;
    userId: number;
    codeHash: number;
    expiresAt: number;
    verifiedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserOtpAvgAggregateInputType = {
    userId?: true;
};
export type UserOtpSumAggregateInputType = {
    userId?: true;
};
export type UserOtpMinAggregateInputType = {
    id?: true;
    userId?: true;
    codeHash?: true;
    expiresAt?: true;
    verifiedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserOtpMaxAggregateInputType = {
    id?: true;
    userId?: true;
    codeHash?: true;
    expiresAt?: true;
    verifiedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserOtpCountAggregateInputType = {
    id?: true;
    userId?: true;
    codeHash?: true;
    expiresAt?: true;
    verifiedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserOtpAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserOtpWhereInput;
    orderBy?: Prisma.UserOtpOrderByWithRelationInput | Prisma.UserOtpOrderByWithRelationInput[];
    cursor?: Prisma.UserOtpWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserOtpCountAggregateInputType;
    _avg?: UserOtpAvgAggregateInputType;
    _sum?: UserOtpSumAggregateInputType;
    _min?: UserOtpMinAggregateInputType;
    _max?: UserOtpMaxAggregateInputType;
};
export type GetUserOtpAggregateType<T extends UserOtpAggregateArgs> = {
    [P in keyof T & keyof AggregateUserOtp]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserOtp[P]> : Prisma.GetScalarType<T[P], AggregateUserOtp[P]>;
};
export type UserOtpGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserOtpWhereInput;
    orderBy?: Prisma.UserOtpOrderByWithAggregationInput | Prisma.UserOtpOrderByWithAggregationInput[];
    by: Prisma.UserOtpScalarFieldEnum[] | Prisma.UserOtpScalarFieldEnum;
    having?: Prisma.UserOtpScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserOtpCountAggregateInputType | true;
    _avg?: UserOtpAvgAggregateInputType;
    _sum?: UserOtpSumAggregateInputType;
    _min?: UserOtpMinAggregateInputType;
    _max?: UserOtpMaxAggregateInputType;
};
export type UserOtpGroupByOutputType = {
    id: string;
    userId: number;
    codeHash: string;
    expiresAt: Date;
    verifiedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserOtpCountAggregateOutputType | null;
    _avg: UserOtpAvgAggregateOutputType | null;
    _sum: UserOtpSumAggregateOutputType | null;
    _min: UserOtpMinAggregateOutputType | null;
    _max: UserOtpMaxAggregateOutputType | null;
};
type GetUserOtpGroupByPayload<T extends UserOtpGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserOtpGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserOtpGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserOtpGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserOtpGroupByOutputType[P]>;
}>>;
export type UserOtpWhereInput = {
    AND?: Prisma.UserOtpWhereInput | Prisma.UserOtpWhereInput[];
    OR?: Prisma.UserOtpWhereInput[];
    NOT?: Prisma.UserOtpWhereInput | Prisma.UserOtpWhereInput[];
    id?: Prisma.StringFilter<"UserOtp"> | string;
    userId?: Prisma.IntFilter<"UserOtp"> | number;
    codeHash?: Prisma.StringFilter<"UserOtp"> | string;
    expiresAt?: Prisma.DateTimeFilter<"UserOtp"> | Date | string;
    verifiedAt?: Prisma.DateTimeNullableFilter<"UserOtp"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserOtp"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserOtp"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserOtpOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UserOtpWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: number;
    AND?: Prisma.UserOtpWhereInput | Prisma.UserOtpWhereInput[];
    OR?: Prisma.UserOtpWhereInput[];
    NOT?: Prisma.UserOtpWhereInput | Prisma.UserOtpWhereInput[];
    codeHash?: Prisma.StringFilter<"UserOtp"> | string;
    expiresAt?: Prisma.DateTimeFilter<"UserOtp"> | Date | string;
    verifiedAt?: Prisma.DateTimeNullableFilter<"UserOtp"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserOtp"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserOtp"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type UserOtpOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserOtpCountOrderByAggregateInput;
    _avg?: Prisma.UserOtpAvgOrderByAggregateInput;
    _max?: Prisma.UserOtpMaxOrderByAggregateInput;
    _min?: Prisma.UserOtpMinOrderByAggregateInput;
    _sum?: Prisma.UserOtpSumOrderByAggregateInput;
};
export type UserOtpScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserOtpScalarWhereWithAggregatesInput | Prisma.UserOtpScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserOtpScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserOtpScalarWhereWithAggregatesInput | Prisma.UserOtpScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserOtp"> | string;
    userId?: Prisma.IntWithAggregatesFilter<"UserOtp"> | number;
    codeHash?: Prisma.StringWithAggregatesFilter<"UserOtp"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"UserOtp"> | Date | string;
    verifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"UserOtp"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserOtp"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"UserOtp"> | Date | string;
};
export type UserOtpCreateInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    verifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutOtpVerificationInput;
};
export type UserOtpUncheckedCreateInput = {
    id?: string;
    userId: number;
    codeHash: string;
    expiresAt: Date | string;
    verifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserOtpUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutOtpVerificationNestedInput;
};
export type UserOtpUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserOtpCreateManyInput = {
    id?: string;
    userId: number;
    codeHash: string;
    expiresAt: Date | string;
    verifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserOtpUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserOtpUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserOtpNullableScalarRelationFilter = {
    is?: Prisma.UserOtpWhereInput | null;
    isNot?: Prisma.UserOtpWhereInput | null;
};
export type UserOtpCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserOtpAvgOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
};
export type UserOtpMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserOtpMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserOtpSumOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
};
export type UserOtpCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserOtpCreateWithoutUserInput, Prisma.UserOtpUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserOtpCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserOtpWhereUniqueInput;
};
export type UserOtpUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserOtpCreateWithoutUserInput, Prisma.UserOtpUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserOtpCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserOtpWhereUniqueInput;
};
export type UserOtpUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserOtpCreateWithoutUserInput, Prisma.UserOtpUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserOtpCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserOtpUpsertWithoutUserInput;
    disconnect?: Prisma.UserOtpWhereInput | boolean;
    delete?: Prisma.UserOtpWhereInput | boolean;
    connect?: Prisma.UserOtpWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserOtpUpdateToOneWithWhereWithoutUserInput, Prisma.UserOtpUpdateWithoutUserInput>, Prisma.UserOtpUncheckedUpdateWithoutUserInput>;
};
export type UserOtpUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserOtpCreateWithoutUserInput, Prisma.UserOtpUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserOtpCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserOtpUpsertWithoutUserInput;
    disconnect?: Prisma.UserOtpWhereInput | boolean;
    delete?: Prisma.UserOtpWhereInput | boolean;
    connect?: Prisma.UserOtpWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserOtpUpdateToOneWithWhereWithoutUserInput, Prisma.UserOtpUpdateWithoutUserInput>, Prisma.UserOtpUncheckedUpdateWithoutUserInput>;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type UserOtpCreateWithoutUserInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    verifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserOtpUncheckedCreateWithoutUserInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    verifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserOtpCreateOrConnectWithoutUserInput = {
    where: Prisma.UserOtpWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserOtpCreateWithoutUserInput, Prisma.UserOtpUncheckedCreateWithoutUserInput>;
};
export type UserOtpUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.UserOtpUpdateWithoutUserInput, Prisma.UserOtpUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserOtpCreateWithoutUserInput, Prisma.UserOtpUncheckedCreateWithoutUserInput>;
    where?: Prisma.UserOtpWhereInput;
};
export type UserOtpUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.UserOtpWhereInput;
    data: Prisma.XOR<Prisma.UserOtpUpdateWithoutUserInput, Prisma.UserOtpUncheckedUpdateWithoutUserInput>;
};
export type UserOtpUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserOtpUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserOtpSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    verifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userOtp"]>;
export type UserOtpSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    verifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userOtp"]>;
export type UserOtpSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    verifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userOtp"]>;
export type UserOtpSelectScalar = {
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    verifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOtpOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "codeHash" | "expiresAt" | "verifiedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["userOtp"]>;
export type UserOtpInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserOtpIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserOtpIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserOtpPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserOtp";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: number;
        codeHash: string;
        expiresAt: Date;
        verifiedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["userOtp"]>;
    composites: {};
};
export type UserOtpGetPayload<S extends boolean | null | undefined | UserOtpDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserOtpPayload, S>;
export type UserOtpCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserOtpFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserOtpCountAggregateInputType | true;
};
export interface UserOtpDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserOtp'];
        meta: {
            name: 'UserOtp';
        };
    };
    findUnique<T extends UserOtpFindUniqueArgs>(args: Prisma.SelectSubset<T, UserOtpFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserOtpClient<runtime.Types.Result.GetResult<Prisma.$UserOtpPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserOtpFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserOtpFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserOtpClient<runtime.Types.Result.GetResult<Prisma.$UserOtpPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserOtpFindFirstArgs>(args?: Prisma.SelectSubset<T, UserOtpFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserOtpClient<runtime.Types.Result.GetResult<Prisma.$UserOtpPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserOtpFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserOtpFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserOtpClient<runtime.Types.Result.GetResult<Prisma.$UserOtpPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserOtpFindManyArgs>(args?: Prisma.SelectSubset<T, UserOtpFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserOtpPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserOtpCreateArgs>(args: Prisma.SelectSubset<T, UserOtpCreateArgs<ExtArgs>>): Prisma.Prisma__UserOtpClient<runtime.Types.Result.GetResult<Prisma.$UserOtpPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserOtpCreateManyArgs>(args?: Prisma.SelectSubset<T, UserOtpCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserOtpCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserOtpCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserOtpPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserOtpDeleteArgs>(args: Prisma.SelectSubset<T, UserOtpDeleteArgs<ExtArgs>>): Prisma.Prisma__UserOtpClient<runtime.Types.Result.GetResult<Prisma.$UserOtpPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserOtpUpdateArgs>(args: Prisma.SelectSubset<T, UserOtpUpdateArgs<ExtArgs>>): Prisma.Prisma__UserOtpClient<runtime.Types.Result.GetResult<Prisma.$UserOtpPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserOtpDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserOtpDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserOtpUpdateManyArgs>(args: Prisma.SelectSubset<T, UserOtpUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserOtpUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserOtpUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserOtpPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserOtpUpsertArgs>(args: Prisma.SelectSubset<T, UserOtpUpsertArgs<ExtArgs>>): Prisma.Prisma__UserOtpClient<runtime.Types.Result.GetResult<Prisma.$UserOtpPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserOtpCountArgs>(args?: Prisma.Subset<T, UserOtpCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserOtpCountAggregateOutputType> : number>;
    aggregate<T extends UserOtpAggregateArgs>(args: Prisma.Subset<T, UserOtpAggregateArgs>): Prisma.PrismaPromise<GetUserOtpAggregateType<T>>;
    groupBy<T extends UserOtpGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserOtpGroupByArgs['orderBy'];
    } : {
        orderBy?: UserOtpGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserOtpGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserOtpGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserOtpFieldRefs;
}
export interface Prisma__UserOtpClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserOtpFieldRefs {
    readonly id: Prisma.FieldRef<"UserOtp", 'String'>;
    readonly userId: Prisma.FieldRef<"UserOtp", 'Int'>;
    readonly codeHash: Prisma.FieldRef<"UserOtp", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"UserOtp", 'DateTime'>;
    readonly verifiedAt: Prisma.FieldRef<"UserOtp", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"UserOtp", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"UserOtp", 'DateTime'>;
}
export type UserOtpFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelect<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    include?: Prisma.UserOtpInclude<ExtArgs> | null;
    where: Prisma.UserOtpWhereUniqueInput;
};
export type UserOtpFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelect<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    include?: Prisma.UserOtpInclude<ExtArgs> | null;
    where: Prisma.UserOtpWhereUniqueInput;
};
export type UserOtpFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelect<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    include?: Prisma.UserOtpInclude<ExtArgs> | null;
    where?: Prisma.UserOtpWhereInput;
    orderBy?: Prisma.UserOtpOrderByWithRelationInput | Prisma.UserOtpOrderByWithRelationInput[];
    cursor?: Prisma.UserOtpWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserOtpScalarFieldEnum | Prisma.UserOtpScalarFieldEnum[];
};
export type UserOtpFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelect<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    include?: Prisma.UserOtpInclude<ExtArgs> | null;
    where?: Prisma.UserOtpWhereInput;
    orderBy?: Prisma.UserOtpOrderByWithRelationInput | Prisma.UserOtpOrderByWithRelationInput[];
    cursor?: Prisma.UserOtpWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserOtpScalarFieldEnum | Prisma.UserOtpScalarFieldEnum[];
};
export type UserOtpFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelect<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    include?: Prisma.UserOtpInclude<ExtArgs> | null;
    where?: Prisma.UserOtpWhereInput;
    orderBy?: Prisma.UserOtpOrderByWithRelationInput | Prisma.UserOtpOrderByWithRelationInput[];
    cursor?: Prisma.UserOtpWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserOtpScalarFieldEnum | Prisma.UserOtpScalarFieldEnum[];
};
export type UserOtpCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelect<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    include?: Prisma.UserOtpInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserOtpCreateInput, Prisma.UserOtpUncheckedCreateInput>;
};
export type UserOtpCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserOtpCreateManyInput | Prisma.UserOtpCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserOtpCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    data: Prisma.UserOtpCreateManyInput | Prisma.UserOtpCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserOtpIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserOtpUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelect<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    include?: Prisma.UserOtpInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserOtpUpdateInput, Prisma.UserOtpUncheckedUpdateInput>;
    where: Prisma.UserOtpWhereUniqueInput;
};
export type UserOtpUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserOtpUpdateManyMutationInput, Prisma.UserOtpUncheckedUpdateManyInput>;
    where?: Prisma.UserOtpWhereInput;
    limit?: number;
};
export type UserOtpUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserOtpUpdateManyMutationInput, Prisma.UserOtpUncheckedUpdateManyInput>;
    where?: Prisma.UserOtpWhereInput;
    limit?: number;
    include?: Prisma.UserOtpIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserOtpUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelect<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    include?: Prisma.UserOtpInclude<ExtArgs> | null;
    where: Prisma.UserOtpWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserOtpCreateInput, Prisma.UserOtpUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserOtpUpdateInput, Prisma.UserOtpUncheckedUpdateInput>;
};
export type UserOtpDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelect<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    include?: Prisma.UserOtpInclude<ExtArgs> | null;
    where: Prisma.UserOtpWhereUniqueInput;
};
export type UserOtpDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserOtpWhereInput;
    limit?: number;
};
export type UserOtpDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserOtpSelect<ExtArgs> | null;
    omit?: Prisma.UserOtpOmit<ExtArgs> | null;
    include?: Prisma.UserOtpInclude<ExtArgs> | null;
};
export {};
