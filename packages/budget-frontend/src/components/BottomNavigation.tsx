import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ClassIcon from '@material-ui/icons/Class';
import { Link } from 'react-router-dom';

interface Props {
    className: string;
}

export default function SimpleBottomNavigation({ className }: Props) {
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={className}
        >
            <Link to='/transactions'>
                <BottomNavigationAction showLabel label='Transactions' icon={<ReceiptIcon />} />
            </Link>
            <Link to='/categories'>
                <BottomNavigationAction showLabel label='Categories' icon={<ClassIcon />} />
            </Link>
        </BottomNavigation>
    );
}
