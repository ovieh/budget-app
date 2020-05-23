import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { getAccessToken, setAccessToken } from './accessToken';
import { App } from './App';
import jwtDecode from 'jwt-decode';
import './index.css';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { teal, orange } from '@material-ui/core/colors';
import gql from 'graphql-tag';

const cache = new InMemoryCache({
    // addTypename: false,
});

cache.writeQuery({
    query: gql`
        query GetActiveDate {
            activeDate
        }
    `,
    data: {
        activeDate: '9/2019',
    },
});

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

const client = new ApolloClient({
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
        }),
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
