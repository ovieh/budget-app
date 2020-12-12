import React, { useState, useEffect, useReducer } from 'react';
import { Routes } from './Routes';
import { setAccessToken } from './accessToken';
import { ActiveDateContext, initialState, reducer } from './Contexts/ActiveDate';
import { Backdrop, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    })
);

interface Props {}

export const App: React.FC<Props> = () => {
    const [store, dispatch] = useReducer(reducer, initialState);

    const [loading, setLoading] = useState(true);

    const classes = useStyles();

    const URL = `/api`;

    useEffect(() => {
        fetch(`${URL}/refresh_token`, {
            method: 'POST',
            credentials: 'include',
        }).then(async result => {
            const { accessToken } = await result.json();
            setAccessToken(accessToken);
            setLoading(false);
        });
    });

    if (loading) {
        return (
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color='inherit' />
            </Backdrop>
        );
    }

    return (
        <ActiveDateContext.Provider value={{ store, dispatch }}>
            <Routes />
        </ActiveDateContext.Provider>
    );
};
