import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, makeStyles, Theme } from '@material-ui/core';
interface Props {
    links?: link[];
    children?: React.ReactNode;
}

type link = {
    to: string;
    name: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
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
}));

export const ReusableNav: React.FC<Props> = ({ links, children }) => {
    const classes = useStyles();

    return (
        <AppBar position='fixed' className={classes.appBar}>
            <Toolbar>
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
