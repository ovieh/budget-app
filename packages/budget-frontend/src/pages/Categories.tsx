import styled from '@emotion/styled/macro';
import {
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    TextFieldProps,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { FC, Fragment } from 'react';
import { LoggedInNav } from '../components/LoggedInNav';
import { ReusuableTable } from '../components/ReusableTable';
import {
    CategoriesDocument,
    CategoriesQuery,
    useCategoriesQuery,
    useCreateCategoryMutation,
} from '../generated/graphql';

interface CategoriesTableProps {
    data: CategoriesQuery;
}

const CategoriesTable: FC<CategoriesTableProps> = ({ data }) => {
    const columns = [
        { Header: 'Category', accessor: 'name' },
        { Header: 'Budget', accessor: 'budget' },
    ];
    return <ReusuableTable data={data.getCategories} columns={columns} />;
};

const Label = styled(Typography)`
    padding-top: 20px;
`;

interface Props {}

export const Categories: FC<Props> = () => {
    const { data, loading, error } = useCategoriesQuery();

    const [createCategory] = useCreateCategoryMutation();

    if (error) {
        return <div>error</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
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
                <Grid item xs={3}>
                    <Paper>
                        {data?.getCategories.length ? (
                            <CategoriesTable data={data} />
                        ) : (
                            <div>Add some categories, why doesn't you?</div>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Formik
                            initialValues={{
                                name: '',
                                budget: '',
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                await createCategory({
                                    variables: {
                                        name: values.name,
                                        budget: parseFloat(values.budget),
                                    },
                                    refetchQueries: [
                                        {
                                            query: CategoriesDocument,
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
                                            Create New Category
                                        </Label>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Field
                                                    item
                                                    name='name'
                                                    placeholder='Category'
                                                    as={TextField}
                                                    fullWidth
                                                    required
                                                    variant='outlined'
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    item
                                                    name='budget'
                                                    placeholder='Budget'
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
