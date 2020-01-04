import React, { useState, useEffect } from 'react';
import { Routes } from './Routes';
import { setAccessToken } from './accessToken';

interface Props {}

export const App: React.FC<Props> = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://budgetbackend01.herokuapp.com/refresh_token', {
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

    return <Routes />;
};
