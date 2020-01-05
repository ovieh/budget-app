import React from 'react';
import { ReusableNav } from './ReusableNav';
import { useSignOutMutation } from '../generated/graphql';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

interface Props {}

export const LoggedInNav: React.FC<Props> = () => {
    const [signout, { data }] = useSignOutMutation();
    const LoggedInLinks = [
        { to: '/', name: 'Home' },
        { to: '/transactions', name: 'Transactions' },
        { to: '/dashboard', name: 'Dashboard' },
    ];

    if (data) {
        return <Redirect to='/signin' />;
    }

    return (
        <ReusableNav links={LoggedInLinks}>
            <Button onClick={() => signout()}>Sign Out</Button>
        </ReusableNav>
    );
};
