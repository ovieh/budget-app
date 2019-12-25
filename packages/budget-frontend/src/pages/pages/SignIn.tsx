import React, { useState } from 'react';
import { useSignInMutation } from '../../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../../accessToken';

interface Props {}

export const SignIn: React.FC<RouteComponentProps> = ({ history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signIn] = useSignInMutation();
    return (
        <form
            onSubmit={async e => {
                e.preventDefault();
                const response = await signIn({
                    variables: {
                        username,
                        password
                    }
                });
                history.push('/');
                // console.log(response);
                if (response && response.data) {
                    setAccessToken(response.data.signIn.accessToken);
                }
            }}
        >
            <div>
                <input
                    value={username}
                    placeholder='username'
                    onChange={e => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    value={password}
                    placeholder='password'
                    type='password'
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <button type='submit'>Sign In</button>
        </form>
    );
};
