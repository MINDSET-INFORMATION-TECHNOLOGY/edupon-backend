import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserPasswordResetModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPasswordResetPayload>;
export type AggregateUserPasswordReset = {
    _count: UserPasswordResetCountAggregateOutputType | null;
    _avg: UserPasswordResetAvgAggregateOutputType | null;
    _sum: UserPasswordResetSumAggregateOutputType | null;
    _min: UserPasswordResetMinAggregateOutputType | null;
    _max: UserPasswordResetMaxAggregateOutputType | null;
};
export type UserPasswordResetAvgAggregateOutputType = {
    userId: number | null;
};
export type UserPasswordResetSumAggregateOutputType = {
    userId: number | null;
};
export type UserPasswordResetMinAggregateOutputType = {
    id: string | null;
    userId: number | null;
    codeHash: string | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserPasswordResetMaxAggregateOutputType = {
    id: string | null;
    userId: number | null;
    codeHash: string | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserPasswordResetCountAggregateOutputType = {
    id: number;
    userId: number;
    codeHash: number;
    expiresAt: number;
    usedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserPasswordResetAvgAggregateInputType = {
    userId?: true;
};
export type UserPasswordResetSumAggregateInputType = {
    userId?: true;
};
export type UserPasswordResetMinAggregateInputType = {
    id?: true;
    userId?: true;
    codeHash?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserPasswordResetMaxAggregateInputType = {
    id?: true;
    userId?: true;
    codeHash?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserPasswordResetCountAggregateInputType = {
    id?: true;
    userId?: true;
    codeHash?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserPasswordResetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserPasswordResetWhereInput;
    orderBy?: Prisma.UserPasswordResetOrderByWithRelationInput | Prisma.UserPasswordResetOrderByWithRelationInput[];
    cursor?: Prisma.UserPasswordResetWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserPasswordResetCountAggregateInputType;
    _avg?: UserPasswordResetAvgAggregateInputType;
    _sum?: UserPasswordResetSumAggregateInputType;
    _min?: UserPasswordResetMinAggregateInputType;
    _max?: UserPasswordResetMaxAggregateInputType;
};
export type GetUserPasswordResetAggregateType<T extends UserPasswordResetAggregateArgs> = {
    [P in keyof T & keyof AggregateUserPasswordReset]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserPasswordReset[P]> : Prisma.GetScalarType<T[P], AggregateUserPasswordReset[P]>;
};
export type UserPasswordResetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserPasswordResetWhereInput;
    orderBy?: Prisma.UserPasswordResetOrderByWithAggregationInput | Prisma.UserPasswordResetOrderByWithAggregationInput[];
    by: Prisma.UserPasswordResetScalarFieldEnum[] | Prisma.UserPasswordResetScalarFieldEnum;
    having?: Prisma.UserPasswordResetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserPasswordResetCountAggregateInputType | true;
    _avg?: UserPasswordResetAvgAggregateInputType;
    _sum?: UserPasswordResetSumAggregateInputType;
    _min?: UserPasswordResetMinAggregateInputType;
    _max?: UserPasswordResetMaxAggregateInputType;
};
export type UserPasswordResetGroupByOutputType = {
    id: string;
    userId: number;
    codeHash: string;
    expiresAt: Date;
    usedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserPasswordResetCountAggregateOutputType | null;
    _avg: UserPasswordResetAvgAggregateOutputType | null;
    _sum: UserPasswordResetSumAggregateOutputType | null;
    _min: UserPasswordResetMinAggregateOutputType | null;
    _max: UserPasswordResetMaxAggregateOutputType | null;
};
type GetUserPasswordResetGroupByPayload<T extends UserPasswordResetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserPasswordResetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserPasswordResetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserPasswordResetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserPasswordResetGroupByOutputType[P]>;
}>>;
export type UserPasswordResetWhereInput = {
    AND?: Prisma.UserPasswordResetWhereInput | Prisma.UserPasswordResetWhereInput[];
    OR?: Prisma.UserPasswordResetWhereInput[];
    NOT?: Prisma.UserPasswordResetWhereInput | Prisma.UserPasswordResetWhereInput[];
    id?: Prisma.StringFilter<"UserPasswordReset"> | string;
    userId?: Prisma.IntFilter<"UserPasswordReset"> | number;
    codeHash?: Prisma.StringFilter<"UserPasswordReset"> | string;
    expiresAt?: Prisma.DateTimeFilter<"UserPasswordReset"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"UserPasswordReset"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserPasswordReset"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserPasswordReset"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserPasswordResetOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UserPasswordResetWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: number;
    AND?: Prisma.UserPasswordResetWhereInput | Prisma.UserPasswordResetWhereInput[];
    OR?: Prisma.UserPasswordResetWhereInput[];
    NOT?: Prisma.UserPasswordResetWhereInput | Prisma.UserPasswordResetWhereInput[];
    codeHash?: Prisma.StringFilter<"UserPasswordReset"> | string;
    expiresAt?: Prisma.DateTimeFilter<"UserPasswordReset"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"UserPasswordReset"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserPasswordReset"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserPasswordReset"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type UserPasswordResetOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserPasswordResetCountOrderByAggregateInput;
    _avg?: Prisma.UserPasswordResetAvgOrderByAggregateInput;
    _max?: Prisma.UserPasswordResetMaxOrderByAggregateInput;
    _min?: Prisma.UserPasswordResetMinOrderByAggregateInput;
    _sum?: Prisma.UserPasswordResetSumOrderByAggregateInput;
};
export type UserPasswordResetScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserPasswordResetScalarWhereWithAggregatesInput | Prisma.UserPasswordResetScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserPasswordResetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserPasswordResetScalarWhereWithAggregatesInput | Prisma.UserPasswordResetScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserPasswordReset"> | string;
    userId?: Prisma.IntWithAggregatesFilter<"UserPasswordReset"> | number;
    codeHash?: Prisma.StringWithAggregatesFilter<"UserPasswordReset"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"UserPasswordReset"> | Date | string;
    usedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"UserPasswordReset"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserPasswordReset"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"UserPasswordReset"> | Date | string;
};
export type UserPasswordResetCreateInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPasswordResetInput;
};
export type UserPasswordResetUncheckedCreateInput = {
    id?: string;
    userId: number;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserPasswordResetUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPasswordResetNestedInput;
};
export type UserPasswordResetUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserPasswordResetCreateManyInput = {
    id?: string;
    userId: number;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserPasswordResetUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserPasswordResetUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserPasswordResetNullableScalarRelationFilter = {
    is?: Prisma.UserPasswordResetWhereInput | null;
    isNot?: Prisma.UserPasswordResetWhereInput | null;
};
export type UserPasswordResetCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserPasswordResetAvgOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
};
export type UserPasswordResetMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserPasswordResetMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserPasswordResetSumOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
};
export type UserPasswordResetCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserPasswordResetCreateWithoutUserInput, Prisma.UserPasswordResetUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserPasswordResetCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserPasswordResetWhereUniqueInput;
};
export type UserPasswordResetUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserPasswordResetCreateWithoutUserInput, Prisma.UserPasswordResetUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserPasswordResetCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserPasswordResetWhereUniqueInput;
};
export type UserPasswordResetUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserPasswordResetCreateWithoutUserInput, Prisma.UserPasswordResetUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserPasswordResetCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserPasswordResetUpsertWithoutUserInput;
    disconnect?: Prisma.UserPasswordResetWhereInput | boolean;
    delete?: Prisma.UserPasswordResetWhereInput | boolean;
    connect?: Prisma.UserPasswordResetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserPasswordResetUpdateToOneWithWhereWithoutUserInput, Prisma.UserPasswordResetUpdateWithoutUserInput>, Prisma.UserPasswordResetUncheckedUpdateWithoutUserInput>;
};
export type UserPasswordResetUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserPasswordResetCreateWithoutUserInput, Prisma.UserPasswordResetUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserPasswordResetCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserPasswordResetUpsertWithoutUserInput;
    disconnect?: Prisma.UserPasswordResetWhereInput | boolean;
    delete?: Prisma.UserPasswordResetWhereInput | boolean;
    connect?: Prisma.UserPasswordResetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserPasswordResetUpdateToOneWithWhereWithoutUserInput, Prisma.UserPasswordResetUpdateWithoutUserInput>, Prisma.UserPasswordResetUncheckedUpdateWithoutUserInput>;
};
export type UserPasswordResetCreateWithoutUserInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserPasswordResetUncheckedCreateWithoutUserInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserPasswordResetCreateOrConnectWithoutUserInput = {
    where: Prisma.UserPasswordResetWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserPasswordResetCreateWithoutUserInput, Prisma.UserPasswordResetUncheckedCreateWithoutUserInput>;
};
export type UserPasswordResetUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.UserPasswordResetUpdateWithoutUserInput, Prisma.UserPasswordResetUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserPasswordResetCreateWithoutUserInput, Prisma.UserPasswordResetUncheckedCreateWithoutUserInput>;
    where?: Prisma.UserPasswordResetWhereInput;
};
export type UserPasswordResetUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.UserPasswordResetWhereInput;
    data: Prisma.XOR<Prisma.UserPasswordResetUpdateWithoutUserInput, Prisma.UserPasswordResetUncheckedUpdateWithoutUserInput>;
};
export type UserPasswordResetUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserPasswordResetUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserPasswordResetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userPasswordReset"]>;
export type UserPasswordResetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userPasswordReset"]>;
export type UserPasswordResetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userPasswordReset"]>;
export type UserPasswordResetSelectScalar = {
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserPasswordResetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "codeHash" | "expiresAt" | "usedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["userPasswordReset"]>;
export type UserPasswordResetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserPasswordResetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserPasswordResetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserPasswordResetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserPasswordReset";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: number;
        codeHash: string;
        expiresAt: Date;
        usedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["userPasswordReset"]>;
    composites: {};
};
export type UserPasswordResetGetPayload<S extends boolean | null | undefined | UserPasswordResetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload, S>;
export type UserPasswordResetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserPasswordResetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserPasswordResetCountAggregateInputType | true;
};
export interface UserPasswordResetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserPasswordReset'];
        meta: {
            name: 'UserPasswordReset';
        };
    };
    findUnique<T extends UserPasswordResetFindUniqueArgs>(args: Prisma.SelectSubset<T, UserPasswordResetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserPasswordResetClient<runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserPasswordResetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserPasswordResetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserPasswordResetClient<runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserPasswordResetFindFirstArgs>(args?: Prisma.SelectSubset<T, UserPasswordResetFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserPasswordResetClient<runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserPasswordResetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserPasswordResetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserPasswordResetClient<runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserPasswordResetFindManyArgs>(args?: Prisma.SelectSubset<T, UserPasswordResetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserPasswordResetCreateArgs>(args: Prisma.SelectSubset<T, UserPasswordResetCreateArgs<ExtArgs>>): Prisma.Prisma__UserPasswordResetClient<runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserPasswordResetCreateManyArgs>(args?: Prisma.SelectSubset<T, UserPasswordResetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserPasswordResetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserPasswordResetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserPasswordResetDeleteArgs>(args: Prisma.SelectSubset<T, UserPasswordResetDeleteArgs<ExtArgs>>): Prisma.Prisma__UserPasswordResetClient<runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserPasswordResetUpdateArgs>(args: Prisma.SelectSubset<T, UserPasswordResetUpdateArgs<ExtArgs>>): Prisma.Prisma__UserPasswordResetClient<runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserPasswordResetDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserPasswordResetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserPasswordResetUpdateManyArgs>(args: Prisma.SelectSubset<T, UserPasswordResetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserPasswordResetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserPasswordResetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserPasswordResetUpsertArgs>(args: Prisma.SelectSubset<T, UserPasswordResetUpsertArgs<ExtArgs>>): Prisma.Prisma__UserPasswordResetClient<runtime.Types.Result.GetResult<Prisma.$UserPasswordResetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserPasswordResetCountArgs>(args?: Prisma.Subset<T, UserPasswordResetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserPasswordResetCountAggregateOutputType> : number>;
    aggregate<T extends UserPasswordResetAggregateArgs>(args: Prisma.Subset<T, UserPasswordResetAggregateArgs>): Prisma.PrismaPromise<GetUserPasswordResetAggregateType<T>>;
    groupBy<T extends UserPasswordResetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserPasswordResetGroupByArgs['orderBy'];
    } : {
        orderBy?: UserPasswordResetGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserPasswordResetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserPasswordResetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserPasswordResetFieldRefs;
}
export interface Prisma__UserPasswordResetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserPasswordResetFieldRefs {
    readonly id: Prisma.FieldRef<"UserPasswordReset", 'String'>;
    readonly userId: Prisma.FieldRef<"UserPasswordReset", 'Int'>;
    readonly codeHash: Prisma.FieldRef<"UserPasswordReset", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"UserPasswordReset", 'DateTime'>;
    readonly usedAt: Prisma.FieldRef<"UserPasswordReset", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"UserPasswordReset", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"UserPasswordReset", 'DateTime'>;
}
export type UserPasswordResetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    include?: Prisma.UserPasswordResetInclude<ExtArgs> | null;
    where: Prisma.UserPasswordResetWhereUniqueInput;
};
export type UserPasswordResetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    include?: Prisma.UserPasswordResetInclude<ExtArgs> | null;
    where: Prisma.UserPasswordResetWhereUniqueInput;
};
export type UserPasswordResetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    include?: Prisma.UserPasswordResetInclude<ExtArgs> | null;
    where?: Prisma.UserPasswordResetWhereInput;
    orderBy?: Prisma.UserPasswordResetOrderByWithRelationInput | Prisma.UserPasswordResetOrderByWithRelationInput[];
    cursor?: Prisma.UserPasswordResetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserPasswordResetScalarFieldEnum | Prisma.UserPasswordResetScalarFieldEnum[];
};
export type UserPasswordResetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    include?: Prisma.UserPasswordResetInclude<ExtArgs> | null;
    where?: Prisma.UserPasswordResetWhereInput;
    orderBy?: Prisma.UserPasswordResetOrderByWithRelationInput | Prisma.UserPasswordResetOrderByWithRelationInput[];
    cursor?: Prisma.UserPasswordResetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserPasswordResetScalarFieldEnum | Prisma.UserPasswordResetScalarFieldEnum[];
};
export type UserPasswordResetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    include?: Prisma.UserPasswordResetInclude<ExtArgs> | null;
    where?: Prisma.UserPasswordResetWhereInput;
    orderBy?: Prisma.UserPasswordResetOrderByWithRelationInput | Prisma.UserPasswordResetOrderByWithRelationInput[];
    cursor?: Prisma.UserPasswordResetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserPasswordResetScalarFieldEnum | Prisma.UserPasswordResetScalarFieldEnum[];
};
export type UserPasswordResetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    include?: Prisma.UserPasswordResetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserPasswordResetCreateInput, Prisma.UserPasswordResetUncheckedCreateInput>;
};
export type UserPasswordResetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserPasswordResetCreateManyInput | Prisma.UserPasswordResetCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserPasswordResetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    data: Prisma.UserPasswordResetCreateManyInput | Prisma.UserPasswordResetCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserPasswordResetIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserPasswordResetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    include?: Prisma.UserPasswordResetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserPasswordResetUpdateInput, Prisma.UserPasswordResetUncheckedUpdateInput>;
    where: Prisma.UserPasswordResetWhereUniqueInput;
};
export type UserPasswordResetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserPasswordResetUpdateManyMutationInput, Prisma.UserPasswordResetUncheckedUpdateManyInput>;
    where?: Prisma.UserPasswordResetWhereInput;
    limit?: number;
};
export type UserPasswordResetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserPasswordResetUpdateManyMutationInput, Prisma.UserPasswordResetUncheckedUpdateManyInput>;
    where?: Prisma.UserPasswordResetWhereInput;
    limit?: number;
    include?: Prisma.UserPasswordResetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserPasswordResetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    include?: Prisma.UserPasswordResetInclude<ExtArgs> | null;
    where: Prisma.UserPasswordResetWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserPasswordResetCreateInput, Prisma.UserPasswordResetUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserPasswordResetUpdateInput, Prisma.UserPasswordResetUncheckedUpdateInput>;
};
export type UserPasswordResetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    include?: Prisma.UserPasswordResetInclude<ExtArgs> | null;
    where: Prisma.UserPasswordResetWhereUniqueInput;
};
export type UserPasswordResetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserPasswordResetWhereInput;
    limit?: number;
};
export type UserPasswordResetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.UserPasswordResetOmit<ExtArgs> | null;
    include?: Prisma.UserPasswordResetInclude<ExtArgs> | null;
};
export {};
