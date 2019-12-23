import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** Upload custom scalar type */
  Upload: any,
};

export type AuthCredentialsDto = {
   __typename?: 'AuthCredentialsDto',
  username: User,
};

export type Category = {
   __typename?: 'Category',
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  budget?: Maybe<Scalars['Float']>,
  transaction?: Maybe<Array<Transaction>>,
  user?: Maybe<User>,
};

export type CategoryInput = {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  budget?: Maybe<Scalars['Float']>,
  transaction?: Maybe<TransactionInput>,
  user?: Maybe<UserInput>,
};

export type CatIn = {
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  budget?: Maybe<Scalars['Float']>,
  transaction?: Maybe<Array<TransactionInput>>,
  user?: Maybe<UserInput>,
};

export type LoginResponseDto = {
   __typename?: 'LoginResponseDto',
  accessToken: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  signUp: Scalars['Boolean'],
  signIn: LoginResponseDto,
  revokeRefreshToken: Scalars['Boolean'],
  signOut: Scalars['Boolean'],
  uploadFile: Scalars['Boolean'],
  createTransaction: Scalars['String'],
  deleteTransaction: Scalars['String'],
  updateTransactionCategory: Transaction,
  updateCategory: Category,
  createCategory: Category,
  removeCategory: Scalars['String'],
};


export type MutationSignUpArgs = {
  password: Scalars['String'],
  username: Scalars['String']
};


export type MutationSignInArgs = {
  password: Scalars['String'],
  username: Scalars['String']
};


export type MutationRevokeRefreshTokenArgs = {
  userId: Scalars['Float']
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']
};


export type MutationCreateTransactionArgs = {
  transactionDate: Scalars['String'],
  transactionType: Scalars['String'],
  sortCode: Scalars['String'],
  accountNumber: Scalars['String'],
  transactionDescription: Scalars['String'],
  debitAmount: Scalars['Float'],
  creditAmount: Scalars['Float'],
  balance: Scalars['Float']
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['String']
};


export type MutationUpdateTransactionCategoryArgs = {
  name: CategoryInput,
  id: Scalars['String']
};


export type MutationUpdateCategoryArgs = {
  budget: Scalars['Float'],
  name: Scalars['String'],
  id: Scalars['Float']
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'],
  budget: Scalars['Float']
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Float']
};

export type Query = {
   __typename?: 'Query',
  hi: Scalars['String'],
  getTransactions: Array<Transaction>,
  getTransactionById: Transaction,
  getTransactionByMonthAndYear: Array<Transaction>,
  getTransactionsByCategory: Category,
  getCategories: Array<Category>,
  getCategoryByDescription: Category,
};


export type QueryGetTransactionByIdArgs = {
  id: Scalars['String']
};


export type QueryGetTransactionByMonthAndYearArgs = {
  month: Scalars['Float'],
  year: Scalars['Float']
};


export type QueryGetTransactionsByCategoryArgs = {
  id: Scalars['Float']
};


export type QueryGetCategoryByDescriptionArgs = {
  description: Scalars['String']
};

export type Transaction = {
   __typename?: 'Transaction',
  id: Scalars['ID'],
  transactionDate: Scalars['String'],
  transactionType: Scalars['String'],
  sortCode: Scalars['String'],
  accountNumber: Scalars['String'],
  transactionDescription: Scalars['String'],
  debitAmount: Scalars['Float'],
  creditAmount: Scalars['Float'],
  balance: Scalars['Float'],
  name: Category,
  user: User,
  userId: Scalars['Int'],
};

export type TransactionInput = {
  id: Scalars['ID'],
  transactionDate: Scalars['String'],
  transactionType: Scalars['String'],
  sortCode: Scalars['String'],
  accountNumber: Scalars['String'],
  transactionDescription: Scalars['String'],
  debitAmount: Scalars['Float'],
  creditAmount: Scalars['Float'],
  balance: Scalars['Float'],
  name: CatIn,
  user: UserInput,
  userId: Scalars['Int'],
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
  password: Scalars['String'],
  transaction: Array<Transaction>,
  category: Array<Category>,
};

export type UserInput = {
  id: Scalars['ID'],
  username: Scalars['String'],
  password: Scalars['String'],
  transaction: Array<TransactionInput>,
  category: Array<CatIn>,
};

export type HiQueryVariables = {};


export type HiQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hi'>
);

export type SignInMutationVariables = {
  username: Scalars['String'],
  password: Scalars['String']
};


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn: (
    { __typename?: 'LoginResponseDto' }
    & Pick<LoginResponseDto, 'accessToken'>
  ) }
);

export type RegisterMutationVariables = {
  username: Scalars['String'],
  password: Scalars['String']
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signUp'>
);


export const HiDocument = gql`
    query Hi {
  hi
}
    `;

/**
 * __useHiQuery__
 *
 * To run a query within a React component, call `useHiQuery` and pass it any options that fit your needs.
 * When your component renders, `useHiQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHiQuery({
 *   variables: {
 *   },
 * });
 */
export function useHiQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HiQuery, HiQueryVariables>) {
        return ApolloReactHooks.useQuery<HiQuery, HiQueryVariables>(HiDocument, baseOptions);
      }
export function useHiLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HiQuery, HiQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HiQuery, HiQueryVariables>(HiDocument, baseOptions);
        }
export type HiQueryHookResult = ReturnType<typeof useHiQuery>;
export type HiLazyQueryHookResult = ReturnType<typeof useHiLazyQuery>;
export type HiQueryResult = ApolloReactCommon.QueryResult<HiQuery, HiQueryVariables>;
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