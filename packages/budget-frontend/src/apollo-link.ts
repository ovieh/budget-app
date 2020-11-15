import { getAccessToken, setAccessToken } from './accessToken';
import { ApolloLink, Observable, HttpLink } from '@apollo/client';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import JwtDecode from 'jwt-decode';
import { onError } from 'apollo-link-error';
import { JwtToken } from './types/jwt';

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable(observer => {
            let handle: any;
            Promise.resolve(operation)
                .then(operation => {
                    const accessToken = getAccessToken();
                    if (accessToken) {
                        operation.setContext({
                            headers: {
                                authorization: `Bearer ${accessToken}`,
                            },
                        });
                    }
                })
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                })
                .catch(observer.error.bind(observer));

            return () => {
                if (handle) handle.unsubscribe();
            };
        })
);

const URL = `${process.env.REACT_APP_API_URL}/graphql`;

export const link = ApolloLink.from([
    new TokenRefreshLink({
        accessTokenField: 'accessToken',
        isTokenValidOrUndefined: () => {
            const token = getAccessToken();

            if (!token) {
                return true;
            }

            try {
                const { exp } = JwtDecode(token) as JwtToken;
                if (Date.now() >= exp * 1000) {
                    return false;
                } else {
                    return true;
                }
            } catch {
                return false;
            }
        },
        fetchAccessToken: () => {
            return fetch(`${process.env.REACT_APP_API_URL}/refresh_token`, {
                method: 'POST',
                credentials: 'include',
            });
        },
        handleFetch: accessToken => {
            setAccessToken(accessToken);
        },
        handleError: err => {
            throw new Error(err.name);
        },
    }) as any, // TODO: Figure why this is needed
    onError(({ graphQLErrors, networkError }) => {
        console.log(graphQLErrors);
        console.log(networkError);
    }),
    requestLink,
    new HttpLink({
        uri: URL,
        credentials: 'include',
    }),
]);
