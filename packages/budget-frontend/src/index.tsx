import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloProvider,
    InMemoryCache,
    ApolloClient,
    HttpLink,
    ApolloLink,
    Observable,
    NormalizedCacheObject,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { getAccessToken, setAccessToken } from './accessToken';
import { App } from './App';
import jwtDecode from 'jwt-decode';
import './index.css';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { teal, orange } from '@material-ui/core/colors';

const cache: InMemoryCache = new InMemoryCache({});

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: teal,
        secondary: orange,
    },
});

const URL = `${process.env.REACT_APP_API_URL}/graphql`;

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
                                authorization: `bearer ${accessToken}`,
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

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: ApolloLink.from([
        new TokenRefreshLink({
            accessTokenField: 'accessToken',
            isTokenValidOrUndefined: () => {
                const token = getAccessToken();

                if (!token) {
                    return true;
                }

                try {
                    const { exp } = jwtDecode(token);
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
                console.warn('Your refresh token is invalid. Try to relogin');
                console.error(err);
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
    ]),
    cache,
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <App />
        </ThemeProvider>
    </ApolloProvider>,
    document.getElementById('root')
);
