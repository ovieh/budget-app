import React, { Fragment, useState } from 'react';
import { useSignInMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setAccessToken } from '../accessToken';
import { LoggedOutNav } from '../components/LoggedOutNav';
import { Paper, Button, TextField, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Props {}

const useStyles = makeStyles(theme => ({
    root: {
        padding: '10px',
        marginTop: theme.spacing(6),
    },
    input: {
        paddingBottom: '5px',
    },
}));

const SignInSchema = yup.object().shape({
    username: yup.string().min(2, 'Too Short!').max(20, 'Too long!').required('Requiried'),
    password: yup.string().min(4, 'Too Short!').max(20, 'Too long!').required('Requiried'),
});

export const SignIn: React.FC<RouteComponentProps> = ({ history }) => {
    const classes = useStyles();
    const [signIn] = useSignInMutation();
    const [error, setError] = useState('');

    const { register: rhfRegister, errors, handleSubmit, formState } = useForm({
        resolver: yupResolver(SignInSchema),
        mode: 'onChange',
    });

    const onSubmit = async ({ username, password }: { username: string; password: string }) => {
        try {
            const response = await signIn({
                variables: {
                    username,
                    password,
                },
            });
            history.push('/');
            response && response.data && setAccessToken(response.data.signIn.accessToken);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Fragment>
            <LoggedOutNav />
            <Container maxWidth='sm' className={classes.root}>
                <Paper elevation={5}>
                    <Container className={classes.root}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                name='username'
                                placeholder='username'
                                variant='outlined'
                                fullWidth
                                className={classes.input}
                                inputRef={rhfRegister()}
                                error={!!errors['username'] || !!error}
                                helperText={errors['username']?.message || error}
                            />
                            <TextField
                                name='password'
                                placeholder='password'
                                type='password'
                                variant='outlined'
                                fullWidth
                                inputRef={rhfRegister()}
                                className={classes.input}
                                error={!!errors['password'] || !!error}
                                helperText={errors['password']?.message || error}
                            />
                            <Button
                                variant='contained'
                                type='submit'
                                disabled={!formState.isValid}
                                color='primary'
                                fullWidth
                            >
                                Sign In
                            </Button>
                        </form>
                    </Container>
                </Paper>
            </Container>
        </Fragment>
    );
};
