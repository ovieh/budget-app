import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSONObject: any;
  Upload: any;
};

export type Category = {
   __typename?: 'Category';
  id: Scalars['Float'];
  name: Scalars['String'];
  budget: Scalars['Float'];
  transaction: Transaction;
  user: User;
};

export type ChartData = {
   __typename?: 'ChartData';
  payload: Scalars['JSONObject'];
};

export type DateInput = {
  year: Scalars['Int'];
  month: Scalars['Int'];
};


export type LoginResponseDto = {
   __typename?: 'LoginResponseDto';
  accessToken: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  signUp: Scalars['Boolean'];
  signIn: LoginResponseDto;
  revokeRefreshToken: Scalars['Boolean'];
  signOut: Scalars['Boolean'];
  uploadFile: Scalars['Boolean'];
  createTransaction: Scalars['String'];
  deleteTransaction: Scalars['String'];
  updateTransactionCategory: Scalars['String'];
  updateCategory: Category;
  createCategory: Category;
  removeCategory: Scalars['String'];
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

export type Query = {
   __typename?: 'Query';
  me?: Maybe<User>;
  getTransactions: Array<Transaction>;
  getTransactionById: Transaction;
  getTransactionByMonthAndYear: Array<Transaction>;
  getYearMonth: Array<YearMonth>;
  getTransactionsByCategory: Category;
  getCategories: Array<Category>;
  getCategoryByDescription: Scalars['Float'];
  sumCategoryDebits: Scalars['Float'];
  sumCategoryDebitsByYearMonth: Scalars['Float'];
  chartData: ChartData;
};


export type QueryGetTransactionByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetTransactionByMonthAndYearArgs = {
  month: Scalars['Float'];
  year: Scalars['Float'];
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

export type Transaction = {
   __typename?: 'Transaction';
  id: Scalars['String'];
  date: Scalars['String'];
  type: Scalars['String'];
  sortCode: Scalars['String'];
  accountNumber: Scalars['String'];
  description: Scalars['String'];
  debitAmount: Scalars['Float'];
  creditAmount: Scalars['Float'];
  balance: Scalars['Float'];
  user: User;
  userId: Scalars['Float'];
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['Float']>;
};


export type User = {
   __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type YearMonth = {
   __typename?: 'YearMonth';
  year: Scalars['Int'];
  month: Scalars['Int'];
};

export type CategoriesQueryVariables = {};


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { getCategories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'name' | 'budget' | 'id'>
  )> }
);

export type ChartDataQueryVariables = {
  date: Array<DateInput>;
};


export type ChartDataQuery = (
  { __typename?: 'Query' }
  & { chartData: (
    { __typename?: 'ChartData' }
    & Pick<ChartData, 'payload'>
  ) }
);

export type TransactionByMonthAndYearQueryVariables = {
  month: Scalars['Float'];
  year: Scalars['Float'];
};


export type TransactionByMonthAndYearQuery = (
  { __typename?: 'Query' }
  & { getTransactionByMonthAndYear: Array<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'date' | 'id' | 'type' | 'debitAmount' | 'balance' | 'description'>
    & { category: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'name' | 'budget'>
    )> }
  )> }
);

export type CreateCategoryMutationVariables = {
  name: Scalars['String'];
  budget: Scalars['Float'];
};


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createCategory: (
    { __typename?: 'Category' }
    & Pick<Category, 'id'>
  ) }
);

export type CreateTransactionMutationVariables = {
  date: Scalars['String'];
  type: Scalars['String'];
  sortCode: Scalars['String'];
  accountNumber: Scalars['String'];
  description: Scalars['String'];
  debitAmount: Scalars['Float'];
  creditAmount: Scalars['Float'];
  balance: Scalars['Float'];
};


export type CreateTransactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createTransaction'>
);

export type GetTransactionsQueryVariables = {};


export type GetTransactionsQuery = (
  { __typename?: 'Query' }
  & { getTransactions: Array<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'date' | 'creditAmount' | 'debitAmount' | 'balance' | 'description'>
    & { category: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name' | 'budget'>
    )> }
  )> }
);

export type GetYearMonthQueryVariables = {};


export type GetYearMonthQuery = (
  { __typename?: 'Query' }
  & { getYearMonth: Array<(
    { __typename?: 'YearMonth' }
    & Pick<YearMonth, 'year' | 'month'>
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type SignInMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn: (
    { __typename?: 'LoginResponseDto' }
    & Pick<LoginResponseDto, 'accessToken'>
  ) }
);

export type SignOutMutationVariables = {};


export type SignOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signOut'>
);

export type RegisterMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signUp'>
);

export type UpdateTransactionCategoryMutationVariables = {
  categoryId: Scalars['Float'];
  id: Scalars['String'];
};


export type UpdateTransactionCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTransactionCategory'>
);


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
export function useCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
      }
export function useCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = ApolloReactCommon.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
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
export function useChartDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChartDataQuery, ChartDataQueryVariables>) {
        return ApolloReactHooks.useQuery<ChartDataQuery, ChartDataQueryVariables>(ChartDataDocument, baseOptions);
      }
export function useChartDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChartDataQuery, ChartDataQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ChartDataQuery, ChartDataQueryVariables>(ChartDataDocument, baseOptions);
        }
export type ChartDataQueryHookResult = ReturnType<typeof useChartDataQuery>;
export type ChartDataLazyQueryHookResult = ReturnType<typeof useChartDataLazyQuery>;
export type ChartDataQueryResult = ApolloReactCommon.QueryResult<ChartDataQuery, ChartDataQueryVariables>;
export const TransactionByMonthAndYearDocument = gql`
    query TransactionByMonthAndYear($month: Float!, $year: Float!) {
  getTransactionByMonthAndYear(month: $month, year: $year) {
    date
    id
    type
    debitAmount
    balance
    description
    category {
      name
      budget
    }
  }
}
    `;

/**
 * __useTransactionByMonthAndYearQuery__
 *
 * To run a query within a React component, call `useTransactionByMonthAndYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionByMonthAndYearQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionByMonthAndYearQuery({
 *   variables: {
 *      month: // value for 'month'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useTransactionByMonthAndYearQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TransactionByMonthAndYearQuery, TransactionByMonthAndYearQueryVariables>) {
        return ApolloReactHooks.useQuery<TransactionByMonthAndYearQuery, TransactionByMonthAndYearQueryVariables>(TransactionByMonthAndYearDocument, baseOptions);
      }
export function useTransactionByMonthAndYearLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TransactionByMonthAndYearQuery, TransactionByMonthAndYearQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TransactionByMonthAndYearQuery, TransactionByMonthAndYearQueryVariables>(TransactionByMonthAndYearDocument, baseOptions);
        }
export type TransactionByMonthAndYearQueryHookResult = ReturnType<typeof useTransactionByMonthAndYearQuery>;
export type TransactionByMonthAndYearLazyQueryHookResult = ReturnType<typeof useTransactionByMonthAndYearLazyQuery>;
export type TransactionByMonthAndYearQueryResult = ApolloReactCommon.QueryResult<TransactionByMonthAndYearQuery, TransactionByMonthAndYearQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($name: String!, $budget: Float!) {
  createCategory(name: $name, budget: $budget) {
    id
  }
}
    `;
export type CreateCategoryMutationFn = ApolloReactCommon.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

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
export function useCreateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, baseOptions);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = ApolloReactCommon.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateTransactionDocument = gql`
    mutation CreateTransaction($date: String!, $type: String!, $sortCode: String!, $accountNumber: String!, $description: String!, $debitAmount: Float!, $creditAmount: Float!, $balance: Float!) {
  createTransaction(date: $date, type: $type, sortCode: $sortCode, accountNumber: $accountNumber, description: $description, debitAmount: $debitAmount, creditAmount: $creditAmount, balance: $balance)
}
    `;
export type CreateTransactionMutationFn = ApolloReactCommon.MutationFunction<CreateTransactionMutation, CreateTransactionMutationVariables>;

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
export function useCreateTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTransactionMutation, CreateTransactionMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(CreateTransactionDocument, baseOptions);
      }
export type CreateTransactionMutationHookResult = ReturnType<typeof useCreateTransactionMutation>;
export type CreateTransactionMutationResult = ApolloReactCommon.MutationResult<CreateTransactionMutation>;
export type CreateTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTransactionMutation, CreateTransactionMutationVariables>;
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
export function useGetTransactionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, baseOptions);
      }
export function useGetTransactionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, baseOptions);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsQueryResult = ApolloReactCommon.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetYearMonthDocument = gql`
    query getYearMonth {
  getYearMonth {
    year
    month
  }
}
    `;

/**
 * __useGetYearMonthQuery__
 *
 * To run a query within a React component, call `useGetYearMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetYearMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetYearMonthQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetYearMonthQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetYearMonthQuery, GetYearMonthQueryVariables>) {
        return ApolloReactHooks.useQuery<GetYearMonthQuery, GetYearMonthQueryVariables>(GetYearMonthDocument, baseOptions);
      }
export function useGetYearMonthLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetYearMonthQuery, GetYearMonthQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetYearMonthQuery, GetYearMonthQueryVariables>(GetYearMonthDocument, baseOptions);
        }
export type GetYearMonthQueryHookResult = ReturnType<typeof useGetYearMonthQuery>;
export type GetYearMonthLazyQueryHookResult = ReturnType<typeof useGetYearMonthLazyQuery>;
export type GetYearMonthQueryResult = ApolloReactCommon.QueryResult<GetYearMonthQuery, GetYearMonthQueryVariables>;
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
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const SignInDocument = gql`
    mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    accessToken
  }
}
    `;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;

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
export function useSignInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
    mutation signOut {
  signOut
}
    `;
export type SignOutMutationFn = ApolloReactCommon.MutationFunction<SignOutMutation, SignOutMutationVariables>;

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
export function useSignOutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        return ApolloReactHooks.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, baseOptions);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = ApolloReactCommon.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  signUp(username: $username, password: $password)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateTransactionCategoryDocument = gql`
    mutation updateTransactionCategory($categoryId: Float!, $id: String!) {
  updateTransactionCategory(categoryId: $categoryId, id: $id)
}
    `;
export type UpdateTransactionCategoryMutationFn = ApolloReactCommon.MutationFunction<UpdateTransactionCategoryMutation, UpdateTransactionCategoryMutationVariables>;

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
export function useUpdateTransactionCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTransactionCategoryMutation, UpdateTransactionCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTransactionCategoryMutation, UpdateTransactionCategoryMutationVariables>(UpdateTransactionCategoryDocument, baseOptions);
      }
export type UpdateTransactionCategoryMutationHookResult = ReturnType<typeof useUpdateTransactionCategoryMutation>;
export type UpdateTransactionCategoryMutationResult = ApolloReactCommon.MutationResult<UpdateTransactionCategoryMutation>;
export type UpdateTransactionCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTransactionCategoryMutation, UpdateTransactionCategoryMutationVariables>;