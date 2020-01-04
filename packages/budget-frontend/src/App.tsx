import React, { useState, useEffect } from 'react';
import { Routes } from './Routes';
import { setAccessToken } from './accessToken';

interface Props {}

export const App: React.FC<Props> = () => {
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

    return <Routes />;
};
