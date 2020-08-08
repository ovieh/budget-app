import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { orange, teal } from '@material-ui/core/colors';
import React from 'react';
import ReactDOM from 'react-dom';
import { link } from './apollo-link';
import { App } from './App';
import { cache } from './cache';
import './index.css';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: teal,
        secondary: orange,
    },
    typography: {
        allVariants: {
            fontFamily: 'Open Sans, Roboto, Helvetica, Sans-Serif',
        },
    },
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link,
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
