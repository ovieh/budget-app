import {
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    TextFieldProps,
    makeStyles,
    Theme,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import { LoggedInNav } from '../components/LoggedInNav';
import { ReusuableTable } from '../components/ReusableTable';
import {
    CategoriesDocument,
    CategoriesQuery,
    useCategoriesQuery,
    useCreateCategoryMutation,
} from '../generated/graphql';
import { Drawer } from '../components/Drawer';
import { PrimaryList } from '../components/PrimaryList';

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

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: theme.spacing(2),
    },
    label: {
        paddingTop: theme.spacing(2),
    },
}));

interface Props {}

export const Categories: FC<Props> = () => {
    const classes = useStyles();

    const { data, loading, error } = useCategoriesQuery();

    const [createCategory] = useCreateCategoryMutation();

    if (error) {
        return <div>error</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={classes.root}>
            <LoggedInNav />
            <Drawer>
                <PrimaryList />
            </Drawer>
            <main className={classes.content}>
                <Grid container justify='space-evenly' spacing={2} style={{ marginTop: '20px' }}>
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
                                            <Typography
                                                variant='h6'
                                                align='left'
                                                className={classes.label}
                                            >
                                                Create New Category
                                            </Typography>
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
            </main>
        </div>
    );
};
