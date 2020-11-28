import React from 'react';
import { ReusableNav } from './ReusableNav';
import { useSignOutMutation } from '../generated/graphql';
import { Button, Avatar, makeStyles, createStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

interface Props {
    className?: string;
    userName?: string;
    open?: boolean;
    handleDrawerOpen?: () => void;
}

const useStyles = makeStyles(theme =>
    createStyles({
        avatar: {
            textTransform: 'uppercase',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.getContrastText(theme.palette.secondary.main),
        },
    })
);

export const LoggedInNav: React.FC<Props> = ({ userName, open, handleDrawerOpen }) => {
    const [signout, { data }] = useSignOutMutation();
    const classes = useStyles();

    if (data) {
        return <Redirect to='/signin' />;
    }

    const firstLetterOfUsername = userName && userName.split('')[0];

    const handelSignout = () => {
        localStorage.clear();
        signout();
    };

    return (
        <ReusableNav handleDrawerOpen={handleDrawerOpen} open={open}>
            {userName && <Avatar className={classes.avatar}>{firstLetterOfUsername}</Avatar>}
            <Button onClick={handelSignout}>Sign Out</Button>
        </ReusableNav>
    );
};
