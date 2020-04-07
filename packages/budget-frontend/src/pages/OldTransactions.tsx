import React, { useState } from 'react';
import {
    useCreateTransactionMutation,
    useGetYearMonthQuery,
    TransactionByMonthAndYearDocument,
} from '../generated/graphql';
import styled from '@emotion/styled/macro';
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
    Toolbar,
    Theme,
    createStyles,
    List,
    ListItemText,
    ListItem,
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { YearMonthTab } from '../components/YearMonthTab';
import { TransactionsTable } from '../components/TransactionsTable';
import { FileUpload } from '../components/FileUpload';

interface Props {}

export interface IYearMonth {
    year: number;
    month: number;
}

const Label = styled(Typography)`
    padding-top: 20px;
`;

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        // appBar: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        //     marginLeft: drawerWidth,
        // },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            marginTop: theme.spacing(2),
        },
    })
);

export const OldTransactions: React.FC<Props> = () => {
    const classes = useStyles();
    const { data: yearMonth, loading } = useGetYearMonthQuery();
    const [active, setActive] = useState(0);

    const [addTransaction] = useCreateTransactionMutation();

    if (loading) {
        return <div>I'm loading</div>;
    }

    return (
        <div className={classes.root}>
            {/* <div className={classes.appBar}> */}
            <LoggedInNav />
            {/* </div> */}

            <Drawer
                variant='permanent'
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        {['Home', 'Transactions', 'Categories'].map((text, i) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text}></ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Grid container justify='space-evenly' spacing={2} style={{ marginTop: '20px' }}>
                    <Grid item xs={7}>
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
                                            <Label variant='h6' align='left'>
                                                Enter Transaction
                                            </Label>
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
