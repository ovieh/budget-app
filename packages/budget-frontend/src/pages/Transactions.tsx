import React, { Fragment, useState } from 'react';
import {
    useCreateTransactionMutation,
    TransactionByMonthYearDocument,
    useGetYearMonthQuery,
    useTransactionByMonthYearQuery,
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
} from '@material-ui/core';
import { YearMonthTab } from '../components/YearMonthTab';
import { TransactionsTable } from '../components/TransactionsTable';

interface Props {}

export interface IYearMonth {
    year: number;
    month: number;
}

const Label = styled(Typography)`
    padding-top: 20px;
`;

export const Transactions: React.FC<Props> = () => {
    const { data: yearMonth, loading } = useGetYearMonthQuery();

    const [addTransaction] = useCreateTransactionMutation();

    const [active, setActive] = useState(0);

    const [date, setDate] = useState(yearMonth?.getYearMonth[0].month);

    if (loading) {
        return <div>I'm loading</div>;
    }

    return (
        <Fragment>
            <LoggedInNav />
            <Grid
                container
                justify='space-evenly'
                spacing={2}
                style={{ marginTop: '20px' }}
            >
                <Grid item xs={7}>
                    <Paper>
                        {yearMonth && (
                            <YearMonthTab
                                data={yearMonth}
                                setDate={setDate}
                                active={active}
                                setActive={setActive}
                            />
                        )}
                        {yearMonth && (
                            <TransactionsTable
                                yearMonth={yearMonth}
                                active={active}
                            />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper style={{ minHeight: '20rem' }}>
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
                                        debitAmount: parseFloat(
                                            values.debitAmount
                                        ),
                                        creditAmount: parseFloat(
                                            values.creditAmount
                                        ),
                                        balance: parseFloat(values.balance),
                                    },
                                    refetchQueries: [
                                        {
                                            query: TransactionByMonthYearDocument,
                                            variables: {
                                                month: yearMonth!.getYearMonth[
                                                    active
                                                ].month,
                                                year: yearMonth!.getYearMonth[
                                                    active
                                                ].year,
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
                                                    item
                                                    name='date'
                                                    placeholder='Transaction Date'
                                                    as={TextField}
                                                    fullWidth
                                                    required
                                                    variant='outlined'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    item
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
                                                    <InputLabel id='type'>
                                                        Type
                                                    </InputLabel>
                                                    <Field
                                                        item
                                                        name='type'
                                                        // placeholder='Transaction Type'
                                                        as={Select}
                                                        required
                                                        variant='outlined'
                                                        labelId='type'
                                                        value='DEB'
                                                    >
                                                        <MenuItem
                                                            value={'DEB'}
                                                            selected={true}
                                                        >
                                                            DEB
                                                        </MenuItem>
                                                        <MenuItem value={'DD'}>
                                                            DD
                                                        </MenuItem>
                                                        <MenuItem value={'CPT'}>
                                                            CPT
                                                        </MenuItem>
                                                        <MenuItem value={'FPO'}>
                                                            FPO
                                                        </MenuItem>
                                                    </Field>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    item
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
                                                    item
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
                                                    item
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
                                                    item
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
                                                    item
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
        </Fragment>
    );
};
