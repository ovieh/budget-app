import React, { Fragment } from 'react';
import { useSignInMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { setAccessToken } from '../accessToken';
import { LoggedOutNav } from '../components/LoggedOutNav';
import { Paper, Button, TextField } from '@material-ui/core';
import styled from '@emotion/styled/macro';

interface Props {}

const PaperStyled = styled(Paper)`
    margin-top: 10px;
    max-width: 40rem;
    height: 40rem;
`;

const FieldStyled = styled(Field)`
    /* width: 100%; */
    padding: 1rem 2rem;
    box-sizing: border-box;
`;

const FormStyled = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ButtonStyled = styled(Button)`
    width: 8rem;
    height: 2.5rem;
`;

export const SignIn: React.FC<RouteComponentProps> = ({ history }) => {
    const [signIn] = useSignInMutation();
    return (
        <Fragment>
            <LoggedOutNav />
            <PaperStyled elevation={5}>
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
                        <FormStyled onSubmit={handleSubmit}>
                            <FieldStyled
                                as={TextField}
                                name='username'
                                placeholder='username'
                                variant='outlined'
                            />
                            <FieldStyled
                                as={TextField}
                                name='password'
                                placeholder='password'
                                type='password'
                                variant='outlined'
                            />
                            <ButtonStyled
                                variant='contained'
                                type='submit'
                                disabled={isSubmitting}
                                color='primary'
                            >
                                Sign In
                            </ButtonStyled>
                        </FormStyled>
                    )}
                </Formik>
            </PaperStyled>
        </Fragment>
    );
};
