import React, { Fragment } from 'react';
import { useSignInMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { setAccessToken } from '../accessToken';
import { LoggedOutNav } from '../components/LoggedOutNav';
import { Paper, Button, TextField, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Props {}

const useStyles = makeStyles(theme => ({
    root: {
        padding: '10px',
    },
    input: {
        paddingBottom: '5px',
    },
}));

export const SignIn: React.FC<RouteComponentProps> = ({ history }) => {
    const classes = useStyles();
    const [signIn] = useSignInMutation();
    return (
        <Fragment>
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
                            const response = await signIn({
                                variables: {
                                    username,
                                    password,
                                },
                            });
                            history.push('/');
                            response &&
                                response.data &&
                                setAccessToken(response.data.signIn.accessToken);
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
                                        Sign In
                                    </Button>
                                </Form>
                            </Container>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </Fragment>
    );
};
