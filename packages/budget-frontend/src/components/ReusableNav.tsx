import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, makeStyles, Theme } from '@material-ui/core';
interface Props {
    links: link[];
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
}));

export const ReusableNav: React.FC<Props> = ({ links, children }) => {
    const classes = useStyles();

    return (
        <AppBar position='fixed' color='inherit' className={classes.appBar}>
            <Toolbar>
                <Typography variant='h6'>Budget-App</Typography>
                <div>
                    {links.map((link, index) => (
                        <Button color='inherit' key={index}>
                            <Link to={link.to}>{link.name}</Link>
                        </Button>
                    ))}
                    {children}
                </div>
            </Toolbar>
        </AppBar>
    );
};
