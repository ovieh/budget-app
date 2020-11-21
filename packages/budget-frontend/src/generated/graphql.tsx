import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: any;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};

export type TransactionDescription = {
    __typename?: 'TransactionDescription';
    id: Scalars['String'];
    description: Scalars['String'];
    category: Category;
    categoryId: Scalars['Float'];
    userId: Scalars['Float'];
};

export type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    username: Scalars['String'];
};

export type Category = {
    __typename?: 'Category';
    id?: Maybe<Scalars['ID']>;
    name: Scalars['String'];
    budget?: Maybe<Scalars['Float']>;
    transactions?: Maybe<Array<Transaction>>;
    transactionDescriptions: Array<TransactionDescription>;
};

export type Month = {
    __typename?: 'Month';
    id: Scalars['ID'];
    month: Scalars['Int'];
    year: Scalars['Float'];
    categories?: Maybe<Array<Category>>;
    transactions?: Maybe<Array<Transaction>>;
    userId: Scalars['Float'];
};

export type Transaction = {
    __typename?: 'Transaction';
    id: Scalars['ID'];
    date: Scalars['String'];
    type: Scalars['String'];
    sortCode: Scalars['String'];
    accountNumber: Scalars['String'];
    description: Scalars['String'];
    debitAmount: Scalars['Float'];
    creditAmount: Scalars['Float'];
    balance: Scalars['Float'];
    category: Category;
    userId: Scalars['Float'];
};

export type LoginResponseDto = {
    __typename?: 'LoginResponseDto';
    accessToken: Scalars['String'];
};

export type YearMonth = {
    __typename?: 'YearMonth';
    year: Scalars['Int'];
    month: Scalars['Int'];
};

export type ChartData = {
    __typename?: 'ChartData';
    payload?: Maybe<Scalars['JSON']>;
};

export type Transaction_Description = {
    id: Scalars['String'];
    description: Scalars['String'];
    category: CatIn;
    categoryId: Scalars['Float'];
    userId: Scalars['Float'];
};

export type UserInput = {
    id: Scalars['ID'];
    username: Scalars['String'];
};

export type CatIn = {
    id?: Maybe<Scalars['ID']>;
    name: Scalars['String'];
    budget?: Maybe<Scalars['Float']>;
    transactions?: Maybe<Array<TransactionInput>>;
    transactionDescriptions: Array<Transaction_Description>;
};

export type TransactionInput = {
    id: Scalars['ID'];
    date: Scalars['String'];
    type: Scalars['String'];
    sortCode: Scalars['String'];
    accountNumber: Scalars['String'];
    description: Scalars['String'];
    debitAmount: Scalars['Float'];
    creditAmount: Scalars['Float'];
    balance: Scalars['Float'];
    category: CatIn;
    userId: Scalars['Float'];
};

export type Query = {
    __typename?: 'Query';
    me?: Maybe<User>;
    getTransactions: Array<Transaction>;
    getTransactionById: Transaction;
    getTransactionsByMonthAndYear: Array<Transaction>;
    getCreditsByMonthAndYear: Array<Transaction>;
    getDebitsByMonthAndYear: Array<Transaction>;
    getYearMonth: Array<YearMonth>;
    sumDebitsByYearMonth: Scalars['Float'];
    transactionsByMonthAndCategory: Array<Transaction>;
    sumCreditsByMonth: Scalars['Float'];
    getTransactionsByCategory: Category;
    getCategories: Array<Category>;
    getCategoryByDescription: Category;
    sumCategoryDebits: Scalars['Float'];
    sumCategoryDebitsByYearMonth: Scalars['Float'];
    chartData: ChartData;
    MonthlySpendingChart: ChartData;
    getMonths: Array<Month>;
    getMonthByIds: Array<Month>;
    sortedMonths: Array<Month>;
    MonthByDate: Array<Month>;
};

export type QueryGetTransactionByIdArgs = {
    id: Scalars['String'];
};

export type QueryGetTransactionsByMonthAndYearArgs = {
    month: Scalars['Float'];
    year: Scalars['Float'];
};

export type QueryGetCreditsByMonthAndYearArgs = {
    month: Scalars['Float'];
    year: Scalars['Float'];
};

export type QueryGetDebitsByMonthAndYearArgs = {
    month: Scalars['Float'];
    year: Scalars['Float'];
};

export type QuerySumDebitsByYearMonthArgs = {
    month: Scalars['Float'];
    year: Scalars['Float'];
};

export type QueryTransactionsByMonthAndCategoryArgs = {
    month: Scalars['Int'];
    year: Scalars['Int'];
    categoryId: Scalars['Int'];
};

export type QuerySumCreditsByMonthArgs = {
    year?: Maybe<Scalars['Int']>;
    month?: Maybe<Scalars['Int']>;
};

export type QueryGetTransactionsByCategoryArgs = {
    id: Scalars['Float'];
};

export type QueryGetCategoryByDescriptionArgs = {
    description: Scalars['String'];
};

export type QuerySumCategoryDebitsArgs = {
    id: Scalars['Float'];
};

export type QuerySumCategoryDebitsByYearMonthArgs = {
    month: Scalars['Float'];
    year: Scalars['Float'];
    id: Scalars['Float'];
};

export type QueryChartDataArgs = {
    dates: Array<DateInput>;
};

export type QueryMonthlySpendingChartArgs = {
    year: Scalars['Int'];
    month: Scalars['Int'];
};

export type QueryGetMonthByIdsArgs = {
    ids: Array<Scalars['Int']>;
};

export type QueryMonthByDateArgs = {
    year?: Maybe<Scalars['Int']>;
    month?: Maybe<Scalars['Int']>;
};

export type DateInput = {
    year: Scalars['Int'];
    month: Scalars['Int'];
};

export type Mutation = {
    __typename?: 'Mutation';
    signUp: Scalars['Boolean'];
    signIn: LoginResponseDto;
    revokeRefreshToken: Scalars['Boolean'];
    signOut: Scalars['Boolean'];
    /** Upload a file */
    uploadFile?: Maybe<Scalars['Upload']>;
    createTransaction: Transaction;
    deleteTransaction: Scalars['String'];
    updateTransactionCategory: Transaction;
    updateCategory: Category;
    createCategory: Category;
    removeCategory: Scalars['String'];
    createMonth: Month;
    updateMonthCategories: Month;
};

export type MutationSignUpArgs = {
    password: Scalars['String'];
    username: Scalars['String'];
};

export type MutationSignInArgs = {
    password: Scalars['String'];
    username: Scalars['String'];
};

export type MutationRevokeRefreshTokenArgs = {
    userId: Scalars['Float'];
};

export type MutationUploadFileArgs = {
    file: Scalars['Upload'];
};

export type MutationCreateTransactionArgs = {
    date: Scalars['String'];
    type: Scalars['String'];
    sortCode: Scalars['String'];
    accountNumber: Scalars['String'];
    description: Scalars['String'];
    debitAmount: Scalars['Float'];
    creditAmount: Scalars['Float'];
    balance: Scalars['Float'];
};

export type MutationDeleteTransactionArgs = {
    id: Scalars['String'];
};

export type MutationUpdateTransactionCategoryArgs = {
    categoryId: Scalars['Float'];
    id: Scalars['String'];
};

export type MutationUpdateCategoryArgs = {
    budget: Scalars['Float'];
    name: Scalars['String'];
    id: Scalars['Float'];
};

export type MutationCreateCategoryArgs = {
    name: Scalars['String'];
    budget: Scalars['Float'];
};

export type MutationRemoveCategoryArgs = {
    id: Scalars['Float'];
};

export type MutationCreateMonthArgs = {
    month: Scalars['Int'];
    year: Scalars['Int'];
    transactions: Scalars['ID'];
    categories: Array<CatIn>;
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = { __typename?: 'Query' } & {
    getCategories: Array<{ __typename?: 'Category' } & Pick<Category, 'name' | 'budget' | 'id'>>;
};

export type ChartDataQueryVariables = Exact<{
    date: Array<DateInput>;
}>;

export type ChartDataQuery = { __typename?: 'Query' } & {
    chartData: { __typename?: 'ChartData' } & Pick<ChartData, 'payload'>;
};

export type DebitsByMonthAndYearQueryVariables = Exact<{
    month: Scalars['Float'];
    year: Scalars['Float'];
}>;

export type DebitsByMonthAndYearQuery = { __typename?: 'Query' } & {
    getDebitsByMonthAndYear: Array<
        { __typename?: 'Transaction' } & Pick<
            Transaction,
            'id' | 'description' | 'debitAmount' | 'date'
        > & { category: { __typename?: 'Category' } & Pick<Category, 'name' | 'budget'> }
    >;
};

export type ListAvailableMonthQueryVariables = Exact<{ [key: string]: never }>;

export type ListAvailableMonthQuery = { __typename?: 'Query' } & {
    getYearMonth: Array<{ __typename?: 'YearMonth' } & Pick<YearMonth, 'year' | 'month'>>;
};

export type MonthlySpendingChartQueryVariables = Exact<{
    year: Scalars['Int'];
    month: Scalars['Int'];
}>;

export type MonthlySpendingChartQuery = { __typename?: 'Query' } & {
    MonthlySpendingChart: { __typename?: 'ChartData' } & Pick<ChartData, 'payload'>;
};

export type SumCreditsByMonthQueryVariables = Exact<{
    year: Scalars['Int'];
    month: Scalars['Int'];
}>;

export type SumCreditsByMonthQuery = { __typename?: 'Query' } & Pick<Query, 'sumCreditsByMonth'>;

export type SumDebitsByYearMonthQueryVariables = Exact<{
    year: Scalars['Float'];
    month: Scalars['Float'];
}>;

export type SumDebitsByYearMonthQuery = { __typename?: 'Query' } & Pick<
    Query,
    'sumDebitsByYearMonth'
>;

export type TransactionsByMonthAndCategoryQueryVariables = Exact<{
    month: Scalars['Int'];
    year: Scalars['Int'];
    categoryId: Scalars['Int'];
}>;

export type TransactionsByMonthAndCategoryQuery = { __typename?: 'Query' } & {
    transactionsByMonthAndCategory: Array<
        { __typename?: 'Transaction' } & Pick<
            Transaction,
            'id' | 'description' | 'debitAmount' | 'date'
        >
    >;
};

export type TransactionsByMonthAndYearQueryVariables = Exact<{
    year?: Maybe<Scalars['Int']>;
    month?: Maybe<Scalars['Int']>;
}>;

export type TransactionsByMonthAndYearQuery = { __typename?: 'Query' } & {
    MonthByDate: Array<
        { __typename?: 'Month' } & Pick<Month, 'month' | 'year'> & {
                transactions?: Maybe<
                    Array<
                        { __typename?: 'Transaction' } & Pick<
                            Transaction,
                            'id' | 'description' | 'debitAmount' | 'date'
                        > & {
                                category: { __typename?: 'Category' } & Pick<
                                    Category,
                                    'id' | 'name'
                                >;
                            }
                    >
                >;
            }
    >;
};

export type CreateCategoryMutationVariables = Exact<{
    name: Scalars['String'];
    budget: Scalars['Float'];
}>;

export type CreateCategoryMutation = { __typename?: 'Mutation' } & {
    createCategory: { __typename?: 'Category' } & Pick<Category, 'id'>;
};

export type CreateTransactionMutationVariables = Exact<{
    date: Scalars['String'];
    type: Scalars['String'];
    sortCode: Scalars['String'];
    accountNumber: Scalars['String'];
    description: Scalars['String'];
    debitAmount: Scalars['Float'];
    creditAmount: Scalars['Float'];
    balance: Scalars['Float'];
}>;

export type CreateTransactionMutation = { __typename?: 'Mutation' } & {
    createTransaction: { __typename?: 'Transaction' } & Pick<Transaction, 'id' | 'date'>;
};

export type GetTransactionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTransactionsQuery = { __typename?: 'Query' } & {
    getTransactions: Array<
        { __typename?: 'Transaction' } & Pick<
            Transaction,
            'id' | 'date' | 'creditAmount' | 'debitAmount' | 'balance' | 'description'
        > & { category: { __typename?: 'Category' } & Pick<Category, 'id' | 'name' | 'budget'> }
    >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
    me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>;
};

export type SignInMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
}>;

export type SignInMutation = { __typename?: 'Mutation' } & {
    signIn: { __typename?: 'LoginResponseDto' } & Pick<LoginResponseDto, 'accessToken'>;
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'signOut'>;

export type RegisterMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'signUp'>;

export type UpdateTransactionCategoryMutationVariables = Exact<{
    categoryId: Scalars['Float'];
    id: Scalars['String'];
}>;

export type UpdateTransactionCategoryMutation = { __typename?: 'Mutation' } & {
    updateTransactionCategory: { __typename?: 'Transaction' } & Pick<Transaction, 'id'>;
};

export const CategoriesDocument = gql`
    query Categories {
        getCategories {
            name
            budget
            id
        }
    }
`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(
    baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>
) {
    return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(
        CategoriesDocument,
        baseOptions
    );
}
export function useCategoriesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>
) {
    return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(
        CategoriesDocument,
        baseOptions
    );
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const ChartDataDocument = gql`
    query chartData($date: [DateInput!]!) {
        chartData(dates: $date) {
            payload
        }
    }
`;

/**
 * __useChartDataQuery__
 *
 * To run a query within a React component, call `useChartDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useChartDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChartDataQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useChartDataQuery(
    baseOptions: Apollo.QueryHookOptions<ChartDataQuery, ChartDataQueryVariables>
) {
    return Apollo.useQuery<ChartDataQuery, ChartDataQueryVariables>(ChartDataDocument, baseOptions);
}
export function useChartDataLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<ChartDataQuery, ChartDataQueryVariables>
) {
    return Apollo.useLazyQuery<ChartDataQuery, ChartDataQueryVariables>(
        ChartDataDocument,
        baseOptions
    );
}
export type ChartDataQueryHookResult = ReturnType<typeof useChartDataQuery>;
export type ChartDataLazyQueryHookResult = ReturnType<typeof useChartDataLazyQuery>;
export type ChartDataQueryResult = Apollo.QueryResult<ChartDataQuery, ChartDataQueryVariables>;
export const DebitsByMonthAndYearDocument = gql`
    query DebitsByMonthAndYear($month: Float!, $year: Float!) {
        getDebitsByMonthAndYear(month: $month, year: $year) {
            id
            description
            debitAmount
            date
            category {
                name
                budget
            }
        }
    }
`;

/**
 * __useDebitsByMonthAndYearQuery__
 *
 * To run a query within a React component, call `useDebitsByMonthAndYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useDebitsByMonthAndYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDebitsByMonthAndYearQuery({
 *   variables: {
 *      month: // value for 'month'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useDebitsByMonthAndYearQuery(
    baseOptions: Apollo.QueryHookOptions<
        DebitsByMonthAndYearQuery,
        DebitsByMonthAndYearQueryVariables
    >
) {
    return Apollo.useQuery<DebitsByMonthAndYearQuery, DebitsByMonthAndYearQueryVariables>(
        DebitsByMonthAndYearDocument,
        baseOptions
    );
}
export function useDebitsByMonthAndYearLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        DebitsByMonthAndYearQuery,
        DebitsByMonthAndYearQueryVariables
    >
) {
    return Apollo.useLazyQuery<DebitsByMonthAndYearQuery, DebitsByMonthAndYearQueryVariables>(
        DebitsByMonthAndYearDocument,
        baseOptions
    );
}
export type DebitsByMonthAndYearQueryHookResult = ReturnType<typeof useDebitsByMonthAndYearQuery>;
export type DebitsByMonthAndYearLazyQueryHookResult = ReturnType<
    typeof useDebitsByMonthAndYearLazyQuery
>;
export type DebitsByMonthAndYearQueryResult = Apollo.QueryResult<
    DebitsByMonthAndYearQuery,
    DebitsByMonthAndYearQueryVariables
>;
export const ListAvailableMonthDocument = gql`
    query ListAvailableMonth {
        getYearMonth {
            year
            month
        }
    }
`;

/**
 * __useListAvailableMonthQuery__
 *
 * To run a query within a React component, call `useListAvailableMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAvailableMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAvailableMonthQuery({
 *   variables: {
 *   },
 * });
 */
export function useListAvailableMonthQuery(
    baseOptions?: Apollo.QueryHookOptions<ListAvailableMonthQuery, ListAvailableMonthQueryVariables>
) {
    return Apollo.useQuery<ListAvailableMonthQuery, ListAvailableMonthQueryVariables>(
        ListAvailableMonthDocument,
        baseOptions
    );
}
export function useListAvailableMonthLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        ListAvailableMonthQuery,
        ListAvailableMonthQueryVariables
    >
) {
    return Apollo.useLazyQuery<ListAvailableMonthQuery, ListAvailableMonthQueryVariables>(
        ListAvailableMonthDocument,
        baseOptions
    );
}
export type ListAvailableMonthQueryHookResult = ReturnType<typeof useListAvailableMonthQuery>;
export type ListAvailableMonthLazyQueryHookResult = ReturnType<
    typeof useListAvailableMonthLazyQuery
>;
export type ListAvailableMonthQueryResult = Apollo.QueryResult<
    ListAvailableMonthQuery,
    ListAvailableMonthQueryVariables
>;
export const MonthlySpendingChartDocument = gql`
    query MonthlySpendingChart($year: Int!, $month: Int!) {
        MonthlySpendingChart(year: $year, month: $month) {
            payload
        }
    }
`;

/**
 * __useMonthlySpendingChartQuery__
 *
 * To run a query within a React component, call `useMonthlySpendingChartQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonthlySpendingChartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonthlySpendingChartQuery({
 *   variables: {
 *      year: // value for 'year'
 *      month: // value for 'month'
 *   },
 * });
 */
export function useMonthlySpendingChartQuery(
    baseOptions: Apollo.QueryHookOptions<
        MonthlySpendingChartQuery,
        MonthlySpendingChartQueryVariables
    >
) {
    return Apollo.useQuery<MonthlySpendingChartQuery, MonthlySpendingChartQueryVariables>(
        MonthlySpendingChartDocument,
        baseOptions
    );
}
export function useMonthlySpendingChartLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        MonthlySpendingChartQuery,
        MonthlySpendingChartQueryVariables
    >
) {
    return Apollo.useLazyQuery<MonthlySpendingChartQuery, MonthlySpendingChartQueryVariables>(
        MonthlySpendingChartDocument,
        baseOptions
    );
}
export type MonthlySpendingChartQueryHookResult = ReturnType<typeof useMonthlySpendingChartQuery>;
export type MonthlySpendingChartLazyQueryHookResult = ReturnType<
    typeof useMonthlySpendingChartLazyQuery
>;
export type MonthlySpendingChartQueryResult = Apollo.QueryResult<
    MonthlySpendingChartQuery,
    MonthlySpendingChartQueryVariables
>;
export const SumCreditsByMonthDocument = gql`
    query SumCreditsByMonth($year: Int!, $month: Int!) {
        sumCreditsByMonth(year: $year, month: $month)
    }
`;

/**
 * __useSumCreditsByMonthQuery__
 *
 * To run a query within a React component, call `useSumCreditsByMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useSumCreditsByMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSumCreditsByMonthQuery({
 *   variables: {
 *      year: // value for 'year'
 *      month: // value for 'month'
 *   },
 * });
 */
export function useSumCreditsByMonthQuery(
    baseOptions: Apollo.QueryHookOptions<SumCreditsByMonthQuery, SumCreditsByMonthQueryVariables>
) {
    return Apollo.useQuery<SumCreditsByMonthQuery, SumCreditsByMonthQueryVariables>(
        SumCreditsByMonthDocument,
        baseOptions
    );
}
export function useSumCreditsByMonthLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        SumCreditsByMonthQuery,
        SumCreditsByMonthQueryVariables
    >
) {
    return Apollo.useLazyQuery<SumCreditsByMonthQuery, SumCreditsByMonthQueryVariables>(
        SumCreditsByMonthDocument,
        baseOptions
    );
}
export type SumCreditsByMonthQueryHookResult = ReturnType<typeof useSumCreditsByMonthQuery>;
export type SumCreditsByMonthLazyQueryHookResult = ReturnType<typeof useSumCreditsByMonthLazyQuery>;
export type SumCreditsByMonthQueryResult = Apollo.QueryResult<
    SumCreditsByMonthQuery,
    SumCreditsByMonthQueryVariables
>;
export const SumDebitsByYearMonthDocument = gql`
    query SumDebitsByYearMonth($year: Float!, $month: Float!) {
        sumDebitsByYearMonth(year: $year, month: $month)
    }
`;

/**
 * __useSumDebitsByYearMonthQuery__
 *
 * To run a query within a React component, call `useSumDebitsByYearMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useSumDebitsByYearMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSumDebitsByYearMonthQuery({
 *   variables: {
 *      year: // value for 'year'
 *      month: // value for 'month'
 *   },
 * });
 */
export function useSumDebitsByYearMonthQuery(
    baseOptions: Apollo.QueryHookOptions<
        SumDebitsByYearMonthQuery,
        SumDebitsByYearMonthQueryVariables
    >
) {
    return Apollo.useQuery<SumDebitsByYearMonthQuery, SumDebitsByYearMonthQueryVariables>(
        SumDebitsByYearMonthDocument,
        baseOptions
    );
}
export function useSumDebitsByYearMonthLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        SumDebitsByYearMonthQuery,
        SumDebitsByYearMonthQueryVariables
    >
) {
    return Apollo.useLazyQuery<SumDebitsByYearMonthQuery, SumDebitsByYearMonthQueryVariables>(
        SumDebitsByYearMonthDocument,
        baseOptions
    );
}
export type SumDebitsByYearMonthQueryHookResult = ReturnType<typeof useSumDebitsByYearMonthQuery>;
export type SumDebitsByYearMonthLazyQueryHookResult = ReturnType<
    typeof useSumDebitsByYearMonthLazyQuery
>;
export type SumDebitsByYearMonthQueryResult = Apollo.QueryResult<
    SumDebitsByYearMonthQuery,
    SumDebitsByYearMonthQueryVariables
>;
export const TransactionsByMonthAndCategoryDocument = gql`
    query TransactionsByMonthAndCategory($month: Int!, $year: Int!, $categoryId: Int!) {
        transactionsByMonthAndCategory(month: $month, year: $year, categoryId: $categoryId) {
            id
            description
            debitAmount
            date
        }
    }
`;

/**
 * __useTransactionsByMonthAndCategoryQuery__
 *
 * To run a query within a React component, call `useTransactionsByMonthAndCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsByMonthAndCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsByMonthAndCategoryQuery({
 *   variables: {
 *      month: // value for 'month'
 *      year: // value for 'year'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useTransactionsByMonthAndCategoryQuery(
    baseOptions: Apollo.QueryHookOptions<
        TransactionsByMonthAndCategoryQuery,
        TransactionsByMonthAndCategoryQueryVariables
    >
) {
    return Apollo.useQuery<
        TransactionsByMonthAndCategoryQuery,
        TransactionsByMonthAndCategoryQueryVariables
    >(TransactionsByMonthAndCategoryDocument, baseOptions);
}
export function useTransactionsByMonthAndCategoryLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        TransactionsByMonthAndCategoryQuery,
        TransactionsByMonthAndCategoryQueryVariables
    >
) {
    return Apollo.useLazyQuery<
        TransactionsByMonthAndCategoryQuery,
        TransactionsByMonthAndCategoryQueryVariables
    >(TransactionsByMonthAndCategoryDocument, baseOptions);
}
export type TransactionsByMonthAndCategoryQueryHookResult = ReturnType<
    typeof useTransactionsByMonthAndCategoryQuery
>;
export type TransactionsByMonthAndCategoryLazyQueryHookResult = ReturnType<
    typeof useTransactionsByMonthAndCategoryLazyQuery
>;
export type TransactionsByMonthAndCategoryQueryResult = Apollo.QueryResult<
    TransactionsByMonthAndCategoryQuery,
    TransactionsByMonthAndCategoryQueryVariables
>;
export const TransactionsByMonthAndYearDocument = gql`
    query TransactionsByMonthAndYear($year: Int, $month: Int) {
        MonthByDate(year: $year, month: $month) {
            month
            year
            transactions {
                id
                description
                debitAmount
                date
                category {
                    id
                    name
                }
            }
        }
    }
`;

/**
 * __useTransactionsByMonthAndYearQuery__
 *
 * To run a query within a React component, call `useTransactionsByMonthAndYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsByMonthAndYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsByMonthAndYearQuery({
 *   variables: {
 *      year: // value for 'year'
 *      month: // value for 'month'
 *   },
 * });
 */
export function useTransactionsByMonthAndYearQuery(
    baseOptions?: Apollo.QueryHookOptions<
        TransactionsByMonthAndYearQuery,
        TransactionsByMonthAndYearQueryVariables
    >
) {
    return Apollo.useQuery<
        TransactionsByMonthAndYearQuery,
        TransactionsByMonthAndYearQueryVariables
    >(TransactionsByMonthAndYearDocument, baseOptions);
}
export function useTransactionsByMonthAndYearLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        TransactionsByMonthAndYearQuery,
        TransactionsByMonthAndYearQueryVariables
    >
) {
    return Apollo.useLazyQuery<
        TransactionsByMonthAndYearQuery,
        TransactionsByMonthAndYearQueryVariables
    >(TransactionsByMonthAndYearDocument, baseOptions);
}
export type TransactionsByMonthAndYearQueryHookResult = ReturnType<
    typeof useTransactionsByMonthAndYearQuery
>;
export type TransactionsByMonthAndYearLazyQueryHookResult = ReturnType<
    typeof useTransactionsByMonthAndYearLazyQuery
>;
export type TransactionsByMonthAndYearQueryResult = Apollo.QueryResult<
    TransactionsByMonthAndYearQuery,
    TransactionsByMonthAndYearQueryVariables
>;
export const CreateCategoryDocument = gql`
    mutation createCategory($name: String!, $budget: Float!) {
        createCategory(name: $name, budget: $budget) {
            id
        }
    }
`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      budget: // value for 'budget'
 *   },
 * });
 */
export function useCreateCategoryMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreateCategoryMutation,
        CreateCategoryMutationVariables
    >
) {
    return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(
        CreateCategoryDocument,
        baseOptions
    );
}
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
>;
export const CreateTransactionDocument = gql`
    mutation CreateTransaction(
        $date: String!
        $type: String!
        $sortCode: String!
        $accountNumber: String!
        $description: String!
        $debitAmount: Float!
        $creditAmount: Float!
        $balance: Float!
    ) {
        createTransaction(
            date: $date
            type: $type
            sortCode: $sortCode
            accountNumber: $accountNumber
            description: $description
            debitAmount: $debitAmount
            creditAmount: $creditAmount
            balance: $balance
        ) {
            id
            date
        }
    }
`;
export type CreateTransactionMutationFn = Apollo.MutationFunction<
    CreateTransactionMutation,
    CreateTransactionMutationVariables
>;

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      date: // value for 'date'
 *      type: // value for 'type'
 *      sortCode: // value for 'sortCode'
 *      accountNumber: // value for 'accountNumber'
 *      description: // value for 'description'
 *      debitAmount: // value for 'debitAmount'
 *      creditAmount: // value for 'creditAmount'
 *      balance: // value for 'balance'
 *   },
 * });
 */
export function useCreateTransactionMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreateTransactionMutation,
        CreateTransactionMutationVariables
    >
) {
    return Apollo.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(
        CreateTransactionDocument,
        baseOptions
    );
}
export type CreateTransactionMutationHookResult = ReturnType<typeof useCreateTransactionMutation>;
export type CreateTransactionMutationResult = Apollo.MutationResult<CreateTransactionMutation>;
export type CreateTransactionMutationOptions = Apollo.BaseMutationOptions<
    CreateTransactionMutation,
    CreateTransactionMutationVariables
>;
export const GetTransactionsDocument = gql`
    query getTransactions {
        getTransactions {
            id
            date
            creditAmount
            debitAmount
            balance
            description
            category {
                id
                name
                budget
            }
        }
    }
`;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTransactionsQuery(
    baseOptions?: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>
) {
    return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(
        GetTransactionsDocument,
        baseOptions
    );
}
export function useGetTransactionsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>
) {
    return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(
        GetTransactionsDocument,
        baseOptions
    );
}
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<
    GetTransactionsQuery,
    GetTransactionsQueryVariables
>;
export const MeDocument = gql`
    query me {
        me {
            id
            username
        }
    }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
    return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
    return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SignInDocument = gql`
    mutation SignIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
            accessToken
        }
    }
`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
    baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>
) {
    return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
    SignInMutation,
    SignInMutationVariables
>;
export const SignOutDocument = gql`
    mutation signOut {
        signOut
    }
`;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(
    baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>
) {
    return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(
        SignOutDocument,
        baseOptions
    );
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
    SignOutMutation,
    SignOutMutationVariables
>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
        signUp(username: $username, password: $password)
    }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
    RegisterMutation,
    RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
    baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>
) {
    return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        baseOptions
    );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
    RegisterMutation,
    RegisterMutationVariables
>;
export const UpdateTransactionCategoryDocument = gql`
    mutation updateTransactionCategory($categoryId: Float!, $id: String!) {
        updateTransactionCategory(categoryId: $categoryId, id: $id) {
            id
        }
    }
`;
export type UpdateTransactionCategoryMutationFn = Apollo.MutationFunction<
    UpdateTransactionCategoryMutation,
    UpdateTransactionCategoryMutationVariables
>;

/**
 * __useUpdateTransactionCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionCategoryMutation, { data, loading, error }] = useUpdateTransactionCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateTransactionCategoryMutation(
    baseOptions?: Apollo.MutationHookOptions<
        UpdateTransactionCategoryMutation,
        UpdateTransactionCategoryMutationVariables
    >
) {
    return Apollo.useMutation<
        UpdateTransactionCategoryMutation,
        UpdateTransactionCategoryMutationVariables
    >(UpdateTransactionCategoryDocument, baseOptions);
}
export type UpdateTransactionCategoryMutationHookResult = ReturnType<
    typeof useUpdateTransactionCategoryMutation
>;
export type UpdateTransactionCategoryMutationResult = Apollo.MutationResult<UpdateTransactionCategoryMutation>;
export type UpdateTransactionCategoryMutationOptions = Apollo.BaseMutationOptions<
    UpdateTransactionCategoryMutation,
    UpdateTransactionCategoryMutationVariables
>;
