import React, { useState } from 'react';
import {
    useCreateTransactionMutation,
    useGetYearMonthQuery,
    TransactionByMonthAndYearDocument,
    useMonthlySpendingChartQuery,
    YearMonth,
} from '../generated/graphql';
import clsx from 'clsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoggedInNav } from '../components/LoggedInNav';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
import { YearMonthTab } from '../components/YearMonthTab';
import { TransactionsTable } from '../components/TransactionsTable';
import { FileUpload } from '../components/FileUpload';
import { PrimaryList } from '../components/PrimaryList';
import { Drawer } from '../components/Drawer';
import { BarChart } from '../components/Charts/BarChart/BarChart';

interface Props {}

export interface IYearMonth {
    year: number;
    month: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        label: {
            paddingTop: theme.spacing(2),
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 480,
        },
        // appBar: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        //     marginLeft: drawerWidth,
        // },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            marginTop: theme.spacing(),
        },
        // mainGrid: mar
    })
);

export const Transactions: React.FC<Props> = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const { data: yearMonth, loading } = useGetYearMonthQuery();
    const [active, setActive] = useState(0);

    const [addTransaction] = useCreateTransactionMutation();

    if (loading) {
        return <div>I'm loading</div>;
    }

    return (
        <div className={classes.root}>
            <LoggedInNav />
            <Drawer>
                <PrimaryList />
            </Drawer>
            <main className={classes.content}>
                <Grid container spacing={2} className={classes.content}>
                    <Grid item md={6} xs={12}>
                        <Paper>
                            {yearMonth?.getYearMonth.length && (
                                <YearMonthTab
                                    data={yearMonth}
                                    active={active}
                                    setActive={setActive}
                                />
                            )}
                            {yearMonth?.getYearMonth.length ? (
                                <TransactionsTable yearMonth={yearMonth} active={active} />
                            ) : (
                                <div>Why don't you add some transactions?</div>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Paper className={fixedHeightPaper}>
                            <TransactionByCategoryChart
                                date={{
                                    month: yearMonth!.getYearMonth[active].month,
                                    year: yearMonth!.getYearMonth[active].year,
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Paper style={{ minHeight: '20rem' }}>
                            {/* <Grid container> */}
                            <Container>
                                <FileUpload />
                            </Container>
                            {/* </Grid> */}
                            <Formik
                                initialValues={{
                                    date: '',
                                    type: '',
                                    sortCode: '',
                                    description: '',
                                    accountNumber: '',
                                    debitAmount: '',
                                    creditAmount: '',
                                    balance: '',
                                }}
                                onSubmit={async (values, { setSubmitting }) => {
                                    await addTransaction({
                                        variables: {
                                            date: values.date,
                                            type: values.type,
                                            sortCode: values.sortCode,
                                            description: values.description,
                                            accountNumber: values.accountNumber,
                                            debitAmount: parseFloat(values.debitAmount),
                                            creditAmount: parseFloat(values.creditAmount),
                                            balance: parseFloat(values.balance),
                                        },
                                        refetchQueries: [
                                            {
                                                query: TransactionByMonthAndYearDocument,
                                                variables: {
                                                    month: yearMonth?.getYearMonth.length
                                                        ? yearMonth!.getYearMonth[active].month
                                                        : parseFloat(values.date.split('/')[1]),
                                                    year: yearMonth?.getYearMonth.length
                                                        ? yearMonth!.getYearMonth[active].year
                                                        : parseFloat(values.date.split('/')[2]),
                                                },
                                            },
                                        ],
                                    });
                                    setSubmitting(false);
                                }}
                            >
                                {({ handleSubmit, isSubmitting }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Container>
                                            <Typography
                                                variant='h6'
                                                align='left'
                                                className={classes.label}
                                            >
                                                Create New Category
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name='date'
                                                        placeholder='Transaction Date'
                                                        as={TextField}
                                                        fullWidth
                                                        required
                                                        variant='outlined'
                                                        label='Transaction Date'
                                                        size='small'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name='description'
                                                        placeholder='Transaction Description'
                                                        as={TextField}
                                                        fullWidth
                                                        required
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl required>
                                                        <InputLabel id='type'>Type</InputLabel>
                                                        <Field
                                                            name='type'
                                                            // placeholder='Transaction Type'
                                                            as={Select}
                                                            required
                                                            variant='outlined'
                                                            labelId='type'
                                                            value='DEB'
                                                            size='small'
                                                        >
                                                            <MenuItem value={'DEB'} selected={true}>
                                                                DEB
                                                            </MenuItem>
                                                            <MenuItem value={'DD'}>DD</MenuItem>
                                                            <MenuItem value={'CPT'}>CPT</MenuItem>
                                                            <MenuItem value={'FPO'}>FPO</MenuItem>
                                                        </Field>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name='sortCode'
                                                        placeholder='Sort Code'
                                                        as={TextField}
                                                        fullWidth
                                                        required
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name='accountNumber'
                                                        placeholder='accountNumber'
                                                        as={TextField}
                                                        fullWidth
                                                        required
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name='debitAmount'
                                                        placeholder='Debit Amount'
                                                        as={TextField}
                                                        fullWidth
                                                        required
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name='creditAmount'
                                                        placeholder='Credit Amount'
                                                        as={TextField}
                                                        fullWidth
                                                        required
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name='balance'
                                                        placeholder='balance'
                                                        as={TextField}
                                                        fullWidth
                                                        required
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button
                                                        type='submit'
                                                        disabled={isSubmitting}
                                                        variant='contained'
                                                        centerRipple
                                                        color='primary'
                                                        fullWidth
                                                        size='small'
                                                    >
                                                        Submit
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    </Form>
                                )}
                            </Formik>
                        </Paper>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
};

interface ChartProps {
    date: YearMonth;
}

export const TransactionByCategoryChart: React.FC<ChartProps> = ({ date }) => {
    const { data, loading, error } = useMonthlySpendingChartQuery({
        variables: {
            date,
        },
    });

    const label = 'Spending by category';

    if (loading) {
        return <span>loading</span>;
    }

    if (error) {
        return <pre>{error.message}</pre>;
    }

    return <BarChart data={data?.MonthlySpendingChart.payload} value={label} />;
};
