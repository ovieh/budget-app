import {
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    makeStyles,
    Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import * as yup from 'yup';
import React, { FC } from 'react';
import {
    CategoriesDocument,
    useCategoriesQuery,
    useCreateCategoryMutation,
} from '../../generated/graphql';
import { PieChart } from '../../components/Charts/PieChart/PieChart';
import CategoriesTable from './components/CategoriesTable';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Layout } from '../../components/Layout';

const CategorySchema = yup.object().shape({
    name: yup.string().min(2, 'Too Short!').max(20, 'Too long!').required('Requiried'),
    budget: yup.number().positive('Must be positive').required('Must be a number'),
});

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(1),
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
}));

interface Props {}

export const Categories: FC<Props> = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const { register, errors, handleSubmit } = useForm({ resolver: yupResolver(CategorySchema) });

    const { data, loading, error } = useCategoriesQuery();

    const [createCategory] = useCreateCategoryMutation();

    const chartData = data?.getCategories.map(category => {
        const { id, __typename, ...rest } = category;
        return rest;
    });

    if (error) {
        return <div>error</div>;
    }

    if (loading) {
        return null;
    }

    const onSubmit = async (data: { name: string; budget: string }) => {
        await createCategory({
            variables: {
                name: data.name,
                budget: parseFloat(data.budget),
            },
            refetchQueries: [
                {
                    query: CategoriesDocument,
                },
            ],
        });
    };

    return (
        <Layout>
            <Grid container justify='space-evenly' spacing={2} style={{ marginTop: '20px' }}>
                <Grid item md={3} xs={12}>
                    <Paper>
                        {data?.getCategories.length ? (
                            <CategoriesTable data={data} />
                        ) : (
                            <div>Add some categories, why doesn't you?</div>
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper className={fixedHeightPaper}>
                        <PieChart data={chartData} />
                    </Paper>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Paper>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Container>
                                <Typography variant='h6' align='left' className={classes.label}>
                                    Create New Category
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            name='name'
                                            placeholder='Category'
                                            fullWidth
                                            required
                                            variant='outlined'
                                            size='small'
                                            inputRef={register()}
                                            error={!!errors.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name='budget'
                                            placeholder='Budget'
                                            fullWidth
                                            required
                                            variant='outlined'
                                            size='small'
                                            inputRef={register()}
                                            error={!!errors.budget}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type='submit'
                                            // disabled={isSubmitting}
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
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
};
