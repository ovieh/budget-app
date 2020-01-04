import React from 'react';
import { ReusableNav } from './ReusableNav';

interface Props {}

const LoggedOutLinks = [
    { to: '/signin', name: 'Sign In' },
    { to: '/register', name: 'Register' },
];

export const LoggedOutNav: React.FC<Props> = () => (
    <ReusableNav links={LoggedOutLinks}></ReusableNav>
);
