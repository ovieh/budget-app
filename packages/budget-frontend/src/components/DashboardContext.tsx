import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import format from 'date-fns/format';
import {
    Typography,
    Select,
    makeStyles,
    createStyles,
    Theme,
    MenuItem,
    FormControl,
    InputLabel,
} from '@material-ui/core';
import {
    useSumDebitsByYearMonthQuery,
    useGetYearMonthQuery,
    YearMonth,
} from '../generated/graphql';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        date: {
            paddingRight: theme.spacing(1),
        },
    })
);

export const DashboardContext: React.FC<Props> = () => {
    const classes = useStyles();
    const { data: YearMonth, loading } = useGetYearMonthQuery();
    const GET_ACTIVE_DATE = gql`
        {
            activeDate @client
        }
    `;

    const { data: active } = useQuery(GET_ACTIVE_DATE);

    if (loading) {
        return <div>loading</div>;
    }

    const year = parseInt(active.activeDate.split('/')[1]);

    const month = parseInt(active.activeDate.split('/')[0]);

    const monthName = format(new Date(year, month - 1, 1), 'LLLL');

    return (
        <div>
            <div className={classes.root}>
                <Typography className={classes.date} variant='h2' color='primary'>
                    {monthName}
                </Typography>
                <Typography className={classes.date} variant='h2' color='secondary'>
                    {year}
                </Typography>
            </div>

            <Expenses year={year} month={month} />
            <Typography variant='h5'>Income: l33t</Typography>
            <SelectDate year={year} month={month} dates={YearMonth?.getYearMonth} />
        </div>
    );
};

const Expenses: React.FC<{ year: number; month: number }> = ({ year, month }) => {
    const { data, loading } = useSumDebitsByYearMonthQuery({
        variables: {
            year,
            month,
        },
    });
    if (loading) {
        return <h1>loading</h1>;
    }

    return <Typography variant='h5'>Expenses: {data?.sumDebitsByYearMonth}</Typography>;
};

const useFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        select: {
            fontSize: 25,
        },
    })
);

const SelectDate: React.FC<{ year: number; month: number; dates?: YearMonth[] }> = ({
    month,
    year,
    dates,
}) => {
    const classes = useFormStyles();
    const client = useApolloClient();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setActiveDate(event.target.value as string);
    };

    const [activeDate, setActiveDate] = useState(`${month}/${year}`);

    useEffect(() => {
        client.writeQuery({
            query: gql`
                query GetActiveDate {
                    activeDate
                }
            `,
            data: { activeDate: activeDate },
        });
    }, [activeDate, client]);

    return (
        <FormControl>
            <InputLabel shrink id='month-year'>
                Month / Year
            </InputLabel>
            <Select value={activeDate} onChange={handleChange} className={classes.select}>
                {dates?.map(({ year, month }, i) => (
                    <MenuItem className={classes.select} key={i} value={`${month}/${year}`}>
                        {`${month}/${year}`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
