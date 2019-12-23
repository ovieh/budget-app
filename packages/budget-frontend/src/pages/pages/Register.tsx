import React, { useState } from 'react';
import { useRegisterMutation } from '../../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';


export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  return (
    <form onSubmit={async e => {
        e.preventDefault()
        const response = await register({
            variables: {
                username,
                password
            }
        });
        history.push('/');
        console.log(response);
    }}>
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
      <button type='submit'>Register</button>
    </form>
  );
};
