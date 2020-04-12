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
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    Label,
} from 'recharts';

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
            height: 500,
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
                <Grid container justify='space-evenly' spacing={2} className={classes.content}>
                    <Grid item xs={8}>
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
                    <Grid item xs={4}>
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
                                                <Grid item xs={6}>
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
                                                <Grid item xs={6}>
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
                                                <Grid item xs={6}>
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
                                                <Grid item xs={6}>
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
                                                <Grid item xs={6}>
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
                                                <Grid item xs={6}>
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
                    <Grid item xs={12}>
                        <Paper className={fixedHeightPaper}>
                            <TransactionByCategoryChart
                                date={{
                                    month: yearMonth!.getYearMonth[active].month,
                                    year: yearMonth!.getYearMonth[active].year,
                                }}
                            />
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

    if (loading) {
        return <span>loading</span>;
    }

    if (error) {
        return <pre>{error.message}</pre>;
    }

    return (
        <ResponsiveContainer>
            <BarChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 40,
                }}
                data={data!.MonthlySpendingChart.payload}
                layout='vertical'
                // compact
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis type='number'>
                    <Label
                        value='Spending per month by category'
                        offset={0}
                        position='insideBottom'
                    />
                </XAxis>
                <YAxis dataKey='name' type='category' />
                <Tooltip />
                <Legend />
                <Bar dataKey='budget' fill='#8884d8' />
                <Bar dataKey='actual' fill='#82ca9d' />
            </BarChart>
        </ResponsiveContainer>
    );
};

const data = [
    {
        name: 'groceries',
        budget: 400,
        actual: 413,
    },
    {
        name: 'transportation',
        budget: 300,
        actual: 293,
    },
    {
        name: 'lunch',
        budget: 200,
        actual: 163,
    },
    {
        name: 'utilities',
        budget: 250,
        actual: 313,
    },
];
