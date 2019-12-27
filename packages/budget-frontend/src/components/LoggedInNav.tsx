import React from 'react';
import { ReusableNav } from './ReusableNav';

interface Props {}

const LoggedInLinks = [
    { to: '/', name: 'Home' },
    { to: '/transactions', name: 'Transactions' }
];

export const LoggedInNav: React.FC<Props> = () => (
    <ReusableNav links={LoggedInLinks}></ReusableNav>
);
