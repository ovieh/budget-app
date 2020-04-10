import React from 'react';
import { ReusableNav } from './ReusableNav';
import { useSignOutMutation } from '../generated/graphql';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

interface Props {
    className?: string;
}

export const LoggedInNav: React.FC<Props> = () => {
    const [signout, { data }] = useSignOutMutation();
    const LoggedInLinks = [
        // { to: '/', name: 'Home' },
        // { to: '/transactions', name: 'Transactions' },
        // { to: '/categories', name: 'Categories' },
    ];

    if (data) {
        return <Redirect to='/signin' />;
    }

    return (
        <ReusableNav>
            <Button onClick={() => signout()}>Sign Out</Button>
        </ReusableNav>
    );
};
