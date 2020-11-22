import React, { useState, useEffect, useReducer } from 'react';
import { Routes } from './Routes';
import { setAccessToken } from './accessToken';
import { ActiveDateContext, initialState, reducer } from './Contexts/ActiveDate';

interface Props {}

export const App: React.FC<Props> = () => {
    const [store, dispatch] = useReducer(reducer, initialState);

    const [loading, setLoading] = useState(true);

    const URL = `${process.env.REACT_APP_API_URL}`;

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
        return <div>loading...</div>;
    }

    return (
        <ActiveDateContext.Provider value={{ store, dispatch }}>
            <Routes />
        </ActiveDateContext.Provider>
    );
};
