import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, makeStyles, Theme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
interface Props {
    links?: link[];
    children?: React.ReactNode;
    open?: boolean;
    handleDrawerOpen?: () => void;
}

const drawerWidth = 240;

type link = {
    to: string;
    name: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        flexGrow: 1,
    },
    root: {
        display: 'flex',
    },
    logo: {
        textDecoration: 'inherit',
        color: 'inherit',
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

export const ReusableNav: React.FC<Props> = ({ links, children, open, handleDrawerOpen }) => {
    const classes = useStyles();

    return (
        <AppBar position='fixed' className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color='inherit'
                    aria-label='open drawer'
                    onClick={handleDrawerOpen}
                    edge='start'
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant='h6'
                    component='h1'
                    color='inherit'
                    noWrap
                    className={classes.title}
                >
                    <Link to='/' className={classes.logo}>
                        Budget-App
                    </Link>
                </Typography>
                <div className={classes.root}>
                    {children}
                    {links &&
                        links.map((link, index) => (
                            <Button color='inherit' key={index}>
                                <Link to={link.to}>{link.name}</Link>
                            </Button>
                        ))}
                </div>
            </Toolbar>
        </AppBar>
    );
};
