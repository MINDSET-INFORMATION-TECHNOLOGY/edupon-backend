import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PortfolioModel = runtime.Types.Result.DefaultSelection<Prisma.$PortfolioPayload>;
export type AggregatePortfolio = {
    _count: PortfolioCountAggregateOutputType | null;
    _avg: PortfolioAvgAggregateOutputType | null;
    _sum: PortfolioSumAggregateOutputType | null;
    _min: PortfolioMinAggregateOutputType | null;
    _max: PortfolioMaxAggregateOutputType | null;
};
export type PortfolioAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type PortfolioSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type PortfolioMinAggregateOutputType = {
    id: number | null;
    fullName: string | null;
    email: string | null;
    bio: string | null;
    portfolioLink: string | null;
    userId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PortfolioMaxAggregateOutputType = {
    id: number | null;
    fullName: string | null;
    email: string | null;
    bio: string | null;
    portfolioLink: string | null;
    userId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PortfolioCountAggregateOutputType = {
    id: number;
    fullName: number;
    email: number;
    bio: number;
    skills: number;
    portfolioLink: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PortfolioAvgAggregateInputType = {
    id?: true;
    userId?: true;
};
export type PortfolioSumAggregateInputType = {
    id?: true;
    userId?: true;
};
export type PortfolioMinAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    bio?: true;
    portfolioLink?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PortfolioMaxAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    bio?: true;
    portfolioLink?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PortfolioCountAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    bio?: true;
    skills?: true;
    portfolioLink?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PortfolioAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PortfolioWhereInput;
    orderBy?: Prisma.PortfolioOrderByWithRelationInput | Prisma.PortfolioOrderByWithRelationInput[];
    cursor?: Prisma.PortfolioWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PortfolioCountAggregateInputType;
    _avg?: PortfolioAvgAggregateInputType;
    _sum?: PortfolioSumAggregateInputType;
    _min?: PortfolioMinAggregateInputType;
    _max?: PortfolioMaxAggregateInputType;
};
export type GetPortfolioAggregateType<T extends PortfolioAggregateArgs> = {
    [P in keyof T & keyof AggregatePortfolio]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePortfolio[P]> : Prisma.GetScalarType<T[P], AggregatePortfolio[P]>;
};
export type PortfolioGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PortfolioWhereInput;
    orderBy?: Prisma.PortfolioOrderByWithAggregationInput | Prisma.PortfolioOrderByWithAggregationInput[];
    by: Prisma.PortfolioScalarFieldEnum[] | Prisma.PortfolioScalarFieldEnum;
    having?: Prisma.PortfolioScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PortfolioCountAggregateInputType | true;
    _avg?: PortfolioAvgAggregateInputType;
    _sum?: PortfolioSumAggregateInputType;
    _min?: PortfolioMinAggregateInputType;
    _max?: PortfolioMaxAggregateInputType;
};
export type PortfolioGroupByOutputType = {
    id: number;
    fullName: string;
    email: string;
    bio: string;
    skills: string[];
    portfolioLink: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    _count: PortfolioCountAggregateOutputType | null;
    _avg: PortfolioAvgAggregateOutputType | null;
    _sum: PortfolioSumAggregateOutputType | null;
    _min: PortfolioMinAggregateOutputType | null;
    _max: PortfolioMaxAggregateOutputType | null;
};
type GetPortfolioGroupByPayload<T extends PortfolioGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PortfolioGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PortfolioGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PortfolioGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PortfolioGroupByOutputType[P]>;
}>>;
export type PortfolioWhereInput = {
    AND?: Prisma.PortfolioWhereInput | Prisma.PortfolioWhereInput[];
    OR?: Prisma.PortfolioWhereInput[];
    NOT?: Prisma.PortfolioWhereInput | Prisma.PortfolioWhereInput[];
    id?: Prisma.IntFilter<"Portfolio"> | number;
    fullName?: Prisma.StringFilter<"Portfolio"> | string;
    email?: Prisma.StringFilter<"Portfolio"> | string;
    bio?: Prisma.StringFilter<"Portfolio"> | string;
    skills?: Prisma.StringNullableListFilter<"Portfolio">;
    portfolioLink?: Prisma.StringFilter<"Portfolio"> | string;
    userId?: Prisma.IntFilter<"Portfolio"> | number;
    createdAt?: Prisma.DateTimeFilter<"Portfolio"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Portfolio"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PortfolioOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    skills?: Prisma.SortOrder;
    portfolioLink?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type PortfolioWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    email?: string;
    userId?: number;
    AND?: Prisma.PortfolioWhereInput | Prisma.PortfolioWhereInput[];
    OR?: Prisma.PortfolioWhereInput[];
    NOT?: Prisma.PortfolioWhereInput | Prisma.PortfolioWhereInput[];
    fullName?: Prisma.StringFilter<"Portfolio"> | string;
    bio?: Prisma.StringFilter<"Portfolio"> | string;
    skills?: Prisma.StringNullableListFilter<"Portfolio">;
    portfolioLink?: Prisma.StringFilter<"Portfolio"> | string;
    createdAt?: Prisma.DateTimeFilter<"Portfolio"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Portfolio"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "email" | "userId">;
export type PortfolioOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    skills?: Prisma.SortOrder;
    portfolioLink?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PortfolioCountOrderByAggregateInput;
    _avg?: Prisma.PortfolioAvgOrderByAggregateInput;
    _max?: Prisma.PortfolioMaxOrderByAggregateInput;
    _min?: Prisma.PortfolioMinOrderByAggregateInput;
    _sum?: Prisma.PortfolioSumOrderByAggregateInput;
};
export type PortfolioScalarWhereWithAggregatesInput = {
    AND?: Prisma.PortfolioScalarWhereWithAggregatesInput | Prisma.PortfolioScalarWhereWithAggregatesInput[];
    OR?: Prisma.PortfolioScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PortfolioScalarWhereWithAggregatesInput | Prisma.PortfolioScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Portfolio"> | number;
    fullName?: Prisma.StringWithAggregatesFilter<"Portfolio"> | string;
    email?: Prisma.StringWithAggregatesFilter<"Portfolio"> | string;
    bio?: Prisma.StringWithAggregatesFilter<"Portfolio"> | string;
    skills?: Prisma.StringNullableListFilter<"Portfolio">;
    portfolioLink?: Prisma.StringWithAggregatesFilter<"Portfolio"> | string;
    userId?: Prisma.IntWithAggregatesFilter<"Portfolio"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Portfolio"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Portfolio"> | Date | string;
};
export type PortfolioCreateInput = {
    fullName: string;
    email: string;
    bio: string;
    skills?: Prisma.PortfolioCreateskillsInput | string[];
    portfolioLink: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPortfolioInput;
};
export type PortfolioUncheckedCreateInput = {
    id?: number;
    fullName: string;
    email: string;
    bio: string;
    skills?: Prisma.PortfolioCreateskillsInput | string[];
    portfolioLink: string;
    userId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PortfolioUpdateInput = {
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.StringFieldUpdateOperationsInput | string;
    skills?: Prisma.PortfolioUpdateskillsInput | string[];
    portfolioLink?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPortfolioNestedInput;
};
export type PortfolioUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.StringFieldUpdateOperationsInput | string;
    skills?: Prisma.PortfolioUpdateskillsInput | string[];
    portfolioLink?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PortfolioCreateManyInput = {
    id?: number;
    fullName: string;
    email: string;
    bio: string;
    skills?: Prisma.PortfolioCreateskillsInput | string[];
    portfolioLink: string;
    userId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PortfolioUpdateManyMutationInput = {
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.StringFieldUpdateOperationsInput | string;
    skills?: Prisma.PortfolioUpdateskillsInput | string[];
    portfolioLink?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PortfolioUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.StringFieldUpdateOperationsInput | string;
    skills?: Prisma.PortfolioUpdateskillsInput | string[];
    portfolioLink?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PortfolioNullableScalarRelationFilter = {
    is?: Prisma.PortfolioWhereInput | null;
    isNot?: Prisma.PortfolioWhereInput | null;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type PortfolioCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    skills?: Prisma.SortOrder;
    portfolioLink?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PortfolioAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PortfolioMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    portfolioLink?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PortfolioMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    portfolioLink?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PortfolioSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PortfolioCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PortfolioCreateWithoutUserInput, Prisma.PortfolioUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PortfolioCreateOrConnectWithoutUserInput;
    connect?: Prisma.PortfolioWhereUniqueInput;
};
export type PortfolioUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PortfolioCreateWithoutUserInput, Prisma.PortfolioUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PortfolioCreateOrConnectWithoutUserInput;
    connect?: Prisma.PortfolioWhereUniqueInput;
};
export type PortfolioUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PortfolioCreateWithoutUserInput, Prisma.PortfolioUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PortfolioCreateOrConnectWithoutUserInput;
    upsert?: Prisma.PortfolioUpsertWithoutUserInput;
    disconnect?: Prisma.PortfolioWhereInput | boolean;
    delete?: Prisma.PortfolioWhereInput | boolean;
    connect?: Prisma.PortfolioWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PortfolioUpdateToOneWithWhereWithoutUserInput, Prisma.PortfolioUpdateWithoutUserInput>, Prisma.PortfolioUncheckedUpdateWithoutUserInput>;
};
export type PortfolioUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PortfolioCreateWithoutUserInput, Prisma.PortfolioUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PortfolioCreateOrConnectWithoutUserInput;
    upsert?: Prisma.PortfolioUpsertWithoutUserInput;
    disconnect?: Prisma.PortfolioWhereInput | boolean;
    delete?: Prisma.PortfolioWhereInput | boolean;
    connect?: Prisma.PortfolioWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PortfolioUpdateToOneWithWhereWithoutUserInput, Prisma.PortfolioUpdateWithoutUserInput>, Prisma.PortfolioUncheckedUpdateWithoutUserInput>;
};
export type PortfolioCreateskillsInput = {
    set: string[];
};
export type PortfolioUpdateskillsInput = {
    set?: string[];
    push?: string | string[];
};
export type PortfolioCreateWithoutUserInput = {
    fullName: string;
    email: string;
    bio: string;
    skills?: Prisma.PortfolioCreateskillsInput | string[];
    portfolioLink: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PortfolioUncheckedCreateWithoutUserInput = {
    id?: number;
    fullName: string;
    email: string;
    bio: string;
    skills?: Prisma.PortfolioCreateskillsInput | string[];
    portfolioLink: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PortfolioCreateOrConnectWithoutUserInput = {
    where: Prisma.PortfolioWhereUniqueInput;
    create: Prisma.XOR<Prisma.PortfolioCreateWithoutUserInput, Prisma.PortfolioUncheckedCreateWithoutUserInput>;
};
export type PortfolioUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.PortfolioUpdateWithoutUserInput, Prisma.PortfolioUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PortfolioCreateWithoutUserInput, Prisma.PortfolioUncheckedCreateWithoutUserInput>;
    where?: Prisma.PortfolioWhereInput;
};
export type PortfolioUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.PortfolioWhereInput;
    data: Prisma.XOR<Prisma.PortfolioUpdateWithoutUserInput, Prisma.PortfolioUncheckedUpdateWithoutUserInput>;
};
export type PortfolioUpdateWithoutUserInput = {
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.StringFieldUpdateOperationsInput | string;
    skills?: Prisma.PortfolioUpdateskillsInput | string[];
    portfolioLink?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PortfolioUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.StringFieldUpdateOperationsInput | string;
    skills?: Prisma.PortfolioUpdateskillsInput | string[];
    portfolioLink?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PortfolioSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    bio?: boolean;
    skills?: boolean;
    portfolioLink?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["portfolio"]>;
export type PortfolioSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    bio?: boolean;
    skills?: boolean;
    portfolioLink?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["portfolio"]>;
export type PortfolioSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    bio?: boolean;
    skills?: boolean;
    portfolioLink?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["portfolio"]>;
export type PortfolioSelectScalar = {
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    bio?: boolean;
    skills?: boolean;
    portfolioLink?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PortfolioOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fullName" | "email" | "bio" | "skills" | "portfolioLink" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["portfolio"]>;
export type PortfolioInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PortfolioIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PortfolioIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PortfolioPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Portfolio";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        fullName: string;
        email: string;
        bio: string;
        skills: string[];
        portfolioLink: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["portfolio"]>;
    composites: {};
};
export type PortfolioGetPayload<S extends boolean | null | undefined | PortfolioDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PortfolioPayload, S>;
export type PortfolioCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PortfolioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PortfolioCountAggregateInputType | true;
};
export interface PortfolioDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Portfolio'];
        meta: {
            name: 'Portfolio';
        };
    };
    findUnique<T extends PortfolioFindUniqueArgs>(args: Prisma.SelectSubset<T, PortfolioFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PortfolioClient<runtime.Types.Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PortfolioFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PortfolioFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PortfolioClient<runtime.Types.Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PortfolioFindFirstArgs>(args?: Prisma.SelectSubset<T, PortfolioFindFirstArgs<ExtArgs>>): Prisma.Prisma__PortfolioClient<runtime.Types.Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PortfolioFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PortfolioFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PortfolioClient<runtime.Types.Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PortfolioFindManyArgs>(args?: Prisma.SelectSubset<T, PortfolioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PortfolioCreateArgs>(args: Prisma.SelectSubset<T, PortfolioCreateArgs<ExtArgs>>): Prisma.Prisma__PortfolioClient<runtime.Types.Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PortfolioCreateManyArgs>(args?: Prisma.SelectSubset<T, PortfolioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PortfolioCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PortfolioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PortfolioDeleteArgs>(args: Prisma.SelectSubset<T, PortfolioDeleteArgs<ExtArgs>>): Prisma.Prisma__PortfolioClient<runtime.Types.Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PortfolioUpdateArgs>(args: Prisma.SelectSubset<T, PortfolioUpdateArgs<ExtArgs>>): Prisma.Prisma__PortfolioClient<runtime.Types.Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PortfolioDeleteManyArgs>(args?: Prisma.SelectSubset<T, PortfolioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PortfolioUpdateManyArgs>(args: Prisma.SelectSubset<T, PortfolioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PortfolioUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PortfolioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PortfolioUpsertArgs>(args: Prisma.SelectSubset<T, PortfolioUpsertArgs<ExtArgs>>): Prisma.Prisma__PortfolioClient<runtime.Types.Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PortfolioCountArgs>(args?: Prisma.Subset<T, PortfolioCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PortfolioCountAggregateOutputType> : number>;
    aggregate<T extends PortfolioAggregateArgs>(args: Prisma.Subset<T, PortfolioAggregateArgs>): Prisma.PrismaPromise<GetPortfolioAggregateType<T>>;
    groupBy<T extends PortfolioGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PortfolioGroupByArgs['orderBy'];
    } : {
        orderBy?: PortfolioGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PortfolioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PortfolioFieldRefs;
}
export interface Prisma__PortfolioClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PortfolioFieldRefs {
    readonly id: Prisma.FieldRef<"Portfolio", 'Int'>;
    readonly fullName: Prisma.FieldRef<"Portfolio", 'String'>;
    readonly email: Prisma.FieldRef<"Portfolio", 'String'>;
    readonly bio: Prisma.FieldRef<"Portfolio", 'String'>;
    readonly skills: Prisma.FieldRef<"Portfolio", 'String[]'>;
    readonly portfolioLink: Prisma.FieldRef<"Portfolio", 'String'>;
    readonly userId: Prisma.FieldRef<"Portfolio", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Portfolio", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Portfolio", 'DateTime'>;
}
export type PortfolioFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelect<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    include?: Prisma.PortfolioInclude<ExtArgs> | null;
    where: Prisma.PortfolioWhereUniqueInput;
};
export type PortfolioFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelect<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    include?: Prisma.PortfolioInclude<ExtArgs> | null;
    where: Prisma.PortfolioWhereUniqueInput;
};
export type PortfolioFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelect<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    include?: Prisma.PortfolioInclude<ExtArgs> | null;
    where?: Prisma.PortfolioWhereInput;
    orderBy?: Prisma.PortfolioOrderByWithRelationInput | Prisma.PortfolioOrderByWithRelationInput[];
    cursor?: Prisma.PortfolioWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PortfolioScalarFieldEnum | Prisma.PortfolioScalarFieldEnum[];
};
export type PortfolioFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelect<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    include?: Prisma.PortfolioInclude<ExtArgs> | null;
    where?: Prisma.PortfolioWhereInput;
    orderBy?: Prisma.PortfolioOrderByWithRelationInput | Prisma.PortfolioOrderByWithRelationInput[];
    cursor?: Prisma.PortfolioWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PortfolioScalarFieldEnum | Prisma.PortfolioScalarFieldEnum[];
};
export type PortfolioFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelect<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    include?: Prisma.PortfolioInclude<ExtArgs> | null;
    where?: Prisma.PortfolioWhereInput;
    orderBy?: Prisma.PortfolioOrderByWithRelationInput | Prisma.PortfolioOrderByWithRelationInput[];
    cursor?: Prisma.PortfolioWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PortfolioScalarFieldEnum | Prisma.PortfolioScalarFieldEnum[];
};
export type PortfolioCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelect<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    include?: Prisma.PortfolioInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PortfolioCreateInput, Prisma.PortfolioUncheckedCreateInput>;
};
export type PortfolioCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PortfolioCreateManyInput | Prisma.PortfolioCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PortfolioCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    data: Prisma.PortfolioCreateManyInput | Prisma.PortfolioCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PortfolioIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PortfolioUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelect<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    include?: Prisma.PortfolioInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PortfolioUpdateInput, Prisma.PortfolioUncheckedUpdateInput>;
    where: Prisma.PortfolioWhereUniqueInput;
};
export type PortfolioUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PortfolioUpdateManyMutationInput, Prisma.PortfolioUncheckedUpdateManyInput>;
    where?: Prisma.PortfolioWhereInput;
    limit?: number;
};
export type PortfolioUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PortfolioUpdateManyMutationInput, Prisma.PortfolioUncheckedUpdateManyInput>;
    where?: Prisma.PortfolioWhereInput;
    limit?: number;
    include?: Prisma.PortfolioIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PortfolioUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelect<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    include?: Prisma.PortfolioInclude<ExtArgs> | null;
    where: Prisma.PortfolioWhereUniqueInput;
    create: Prisma.XOR<Prisma.PortfolioCreateInput, Prisma.PortfolioUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PortfolioUpdateInput, Prisma.PortfolioUncheckedUpdateInput>;
};
export type PortfolioDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelect<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    include?: Prisma.PortfolioInclude<ExtArgs> | null;
    where: Prisma.PortfolioWhereUniqueInput;
};
export type PortfolioDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PortfolioWhereInput;
    limit?: number;
};
export type PortfolioDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PortfolioSelect<ExtArgs> | null;
    omit?: Prisma.PortfolioOmit<ExtArgs> | null;
    include?: Prisma.PortfolioInclude<ExtArgs> | null;
};
export {};
