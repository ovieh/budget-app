import React from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Paper, Button, TextField, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LoggedOutNav } from '../components/LoggedOutNav';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '10px',
        marginTop: theme.spacing(6),
    },
    input: {
        paddingBottom: '5px',
    },
}));

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [register] = useRegisterMutation();
    const classes = useStyles();

    return (
        <>
            <LoggedOutNav />
            <Container maxWidth='sm' className={classes.root}>
                <Paper elevation={5}>
                    <Formik
                        initialValues={{
                            password: '',
                            username: '',
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            const { username, password } = values;
                            await register({
                                variables: {
                                    username,
                                    password,
                                },
                            });
                            setSubmitting(false);
                            history.push('/');
                        }}
                    >
                        {({ handleSubmit, isSubmitting }) => (
                            <Container className={classes.root}>
                                <Form onSubmit={handleSubmit}>
                                    <Field
                                        as={TextField}
                                        name='username'
                                        placeholder='username'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.input}
                                    />
                                    <Field
                                        as={TextField}
                                        name='password'
                                        placeholder='password'
                                        type='password'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.input}
                                    />
                                    <Button
                                        variant='contained'
                                        type='submit'
                                        disabled={isSubmitting}
                                        color='primary'
                                        fullWidth
                                    >
                                        Register
                                    </Button>
                                </Form>
                            </Container>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </>
    );
};
