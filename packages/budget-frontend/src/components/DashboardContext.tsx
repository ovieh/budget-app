import React, { useState, useContext } from 'react';
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
    YearMonth,
    useListAvailableMonthQuery,
} from '../generated/graphql';
import { ActiveDateContext, updateActiveDate } from '../context';

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
    const { data, loading, error } = useListAvailableMonthQuery();
    const {
        store: { activeDate },
    } = useContext(ActiveDateContext);

    if (!data?.getYearMonth[0]?.year) return null;

    if (!activeDate.month || !activeDate.year) return null;

    const { year, month } = activeDate;

    const monthName = format(new Date(year, month - 1, 1), 'LLLL');

    if (loading || error) return null;

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
            <SelectDate year={year} month={month} dates={data.getYearMonth} />
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
    const [activeDate, setActiveDate] = useState(`${month}/${year}`);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const valueToString = event.target.value as string;
        const date = valueToString.split('/');
        setActiveDate(event.target.value as string);
        dispatch({
            type: updateActiveDate,
            payload: { month: parseInt(date[0]), year: parseInt(date[1]) },
        });
    };

    const { dispatch } = useContext(ActiveDateContext);

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
