import React from 'react';
import { ReusableNav } from './ReusableNav';
import { useSignOutMutation } from '../generated/graphql';

interface Props {}

export const LoggedInNav: React.FC<Props> = () => {
    const [signout] = useSignOutMutation();
    const LoggedInLinks = [
        { to: '/', name: 'Home' },
        { to: '/transactions', name: 'Transactions' },
        { to: '/dashboard', name: 'Dashboard' },
        // { onClick: () => signout, name: 'Sign Out' },
    ];

    return <ReusableNav links={LoggedInLinks} signOut={signout}></ReusableNav>;
};
