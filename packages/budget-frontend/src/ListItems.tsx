import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ClassIcon from '@material-ui/icons/Class';

export const primaryListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary='Transactions' />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ClassIcon />
            </ListItemIcon>
            <ListItemText primary='Categories' />
        </ListItem>
    </div>
);
