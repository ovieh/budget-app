import React from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [register] = useRegisterMutation();

    return (
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
                <Form onSubmit={handleSubmit}>
                    <Field name='username' placeholder='username' />
                    <Field type='password' name='password' placeholder='password' />
                    <button type='submit' disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};
