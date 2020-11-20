import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { Currency } from '../../types/currency';

interface Props {
    type?: 'income' | 'expenses';
    amount?: number;
    icon?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '95px',
    },
    icon: {
        fontSize: '6rem',
    },
    amountContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    amount: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    label: {
        textTransform: 'capitalize',
        fontWeight: 700,
    },
}));

export const Panel: React.FC<Props> = ({ type, amount = 300, icon, children }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {icon}
            {children ? (
                children
            ) : (
                <div className={classes.amountContainer}>
                    <div className={classes.amount}>
                        <Typography variant='h6' className={classes.label} color='textSecondary'>
                            {type}
                        </Typography>
                        <Typography variant='h4'>
                            {Currency.GBP}
                            {amount}
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    );
};
