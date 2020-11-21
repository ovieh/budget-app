import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import { makeStyles, Theme } from '@material-ui/core';

interface Props {
    current: number | undefined;
    average: number | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
    arrow: {
        fontSize: '2.5rem',
    },
}));

export const RenderArrow = ({ current, average }: Props) => {
    const classes = useStyles();

    if (current! > average!) {
        return <KeyboardArrowUpOutlinedIcon className={classes.arrow} />;
    } else if (current! < average!) {
        return <KeyboardArrowDownIcon className={classes.arrow} />;
    } else {
        return null;
    }
};
