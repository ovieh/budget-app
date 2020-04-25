import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import MuDrawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
    })
);

interface Props {
    children: React.ReactElement;
}

export const Drawer: React.FC<Props> = ({ children }) => {
    const classes = useStyles();

    return (
        <MuDrawer
            variant='permanent'
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>{children}</div>
        </MuDrawer>
    );
};
