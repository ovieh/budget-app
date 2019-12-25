import React from 'react';
import { ReusableNav } from './ReusableNav';
interface Props {}

const LoggedInLinks = [
    { to: '/', name: 'Home' },
    { to: '/dashboard', name: 'Dashboard' }
];

export const LoggedInNav: React.FC<Props> = () => (
    <ReusableNav links={LoggedInLinks}></ReusableNav>
);
