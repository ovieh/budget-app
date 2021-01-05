import React from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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

const RegisterSchema = yup.object().shape({
    username: yup.string().min(2, 'Too Short!').max(20, 'Too long!').required('Requiried'),
    password: yup.string().min(4, 'Too Short!').max(20, 'Too long!').required('Requiried'),
});

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [register] = useRegisterMutation();
    const classes = useStyles();

    const { register: rhfRegister, errors, handleSubmit, formState } = useForm({
        resolver: yupResolver(RegisterSchema),
        mode: 'onChange',
    });

    const onSubmit = async ({ username, password }: { username: string; password: string }) => {
        await register({
            variables: {
                username,
                password,
            },
        });
        history.push('/');
    };

    return (
        <>
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
                                error={!!errors['username']}
                                helperText={errors['username']?.message}
                            />
                            <TextField
                                name='password'
                                placeholder='password'
                                type='password'
                                variant='outlined'
                                fullWidth
                                inputRef={rhfRegister()}
                                className={classes.input}
                                error={!!errors['password']}
                                helperText={errors['password']?.message}
                            />
                            <Button
                                variant='contained'
                                type='submit'
                                disabled={!formState.isValid}
                                color='primary'
                                fullWidth
                            >
                                Register
                            </Button>
                        </form>
                    </Container>
                </Paper>
            </Container>
        </>
    );
};
