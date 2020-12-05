import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ClassIcon from '@material-ui/icons/Class';

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
            <BottomNavigationAction label='Transactions' icon={<ReceiptIcon />} />
            <BottomNavigationAction label='Categories' icon={<ClassIcon />} />
        </BottomNavigation>
    );
}
