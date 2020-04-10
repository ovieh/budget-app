import React from 'react';
import { ReusableList } from './ReusableList';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ClassIcon from '@material-ui/icons/Class';

interface Props {}

export const PrimaryList: React.FC<Props> = () => {
    const items = [
        { text: 'Transactions', to: '/transactions', icon: <ReceiptIcon /> },
        { text: 'Categories', to: '/categories', icon: <ClassIcon /> },
    ];
    return <ReusableList listItems={items} />;
};
