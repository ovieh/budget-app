import React, { Fragment } from 'react';
import { useMeQuery } from '../generated/graphql';
import { LoggedInNav } from '../components/LoggedInNav';
import { LoggedOutNav } from '../components/LoggedOutNav';
import { Drawer } from '../components/Drawer';
import { PrimaryList } from '../components/PrimaryList';
import { Divider, makeStyles, Typography } from '@material-ui/core';

interface Props {}

const useStyles = makeStyles(theme => ({
    heading: {
        marginLeft: theme.spacing(25),
        marginTop: theme.spacing(8),
    },
}));

export const Home: React.FC<Props> = () => {
    const classes = useStyles();
    const { data } = useMeQuery();

    return (
        <Fragment>
            {data ? (
                <Fragment>
                    <LoggedInNav />
                    <Typography className={classes.heading} variant='h1'>
                        Home
                    </Typography>
                    <Drawer>
                        <PrimaryList />
                        <Divider />
                    </Drawer>
                </Fragment>
            ) : (
                <LoggedOutNav />
            )}
        </Fragment>
    );
};
