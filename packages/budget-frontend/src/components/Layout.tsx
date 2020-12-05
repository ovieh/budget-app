import { createStyles, Divider, Hidden, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { LoggedInNav } from './LoggedInNav';
import { Drawer } from './Drawer';
import { PrimaryList } from './PrimaryList';
import BottomNavigation from './BottomNavigation';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
        },
        bottomNavigation: {
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            position: 'fixed',
            bottom: 0,
        },
        root: {
            display: 'flex',
            paddingBottom: '56px',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(1),
            marginTop: theme.spacing(3),
            [theme.breakpoints.down('sm')]: {
                width: 'calc(100% - 20px)',
            },
        },
    })
);

export const Layout: React.FC<Props> = ({ children }) => {
    const { data } = useMeQuery();
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const username = data?.me?.username;

    return (
        <div className={classes.container}>
            <div className={classes.root}>
                <LoggedInNav userName={username} handleDrawerOpen={handleDrawerOpen} open={open} />

                <Hidden smDown>
                    <Drawer handleDrawerClose={handleDrawerClose} open={open}>
                        <PrimaryList />
                        <Divider />
                    </Drawer>
                </Hidden>

                <main className={classes.content}>{children}</main>
            </div>
            <Hidden smUp>
                <BottomNavigation className={classes.bottomNavigation} />
            </Hidden>
        </div>
    );
};
