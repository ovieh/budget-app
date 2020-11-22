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
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import {
    useSumDebitsByYearMonthQuery,
    YearMonth,
    useListAvailableMonthQuery,
} from '../generated/graphql';
import { ActiveDateContext, updateActiveDate } from '../Contexts/ActiveDate';
import { Panel } from './Panel/Panel';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'space-around',
        },
        date: {
            paddingRight: theme.spacing(1),
        },
        icon: {
            fontSize: '6rem',
        },
        dateContainer: {
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-around',
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
        <Panel icon={<DateRangeOutlinedIcon className={classes.icon} color='secondary' />}>
            <div className={classes.root}>
                <div className={classes.dateContainer}>
                    <Typography className={classes.date} variant='h4' color='primary'>
                        {monthName}
                    </Typography>
                    <Typography className={classes.date} variant='h4' color='secondary'>
                        {year}
                    </Typography>
                </div>

                <SelectDate
                    year={year}
                    month={month}
                    dates={data.getYearMonth}
                    disabled={!data?.getYearMonth[0]?.year}
                />
            </div>
        </Panel>
    );
};

const useFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        select: {
            fontSize: 25,
        },
    })
);

const SelectDate: React.FC<{
    year: number;
    month: number;
    dates?: YearMonth[];
    disabled?: boolean;
}> = ({ month, year, dates, disabled }) => {
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
            <Select
                value={activeDate}
                onChange={handleChange}
                className={classes.select}
                disabled={disabled}
            >
                {dates?.map(({ year, month }, i) => (
                    <MenuItem className={classes.select} key={i} value={`${month}/${year}`}>
                        {`${month}/${year}`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
