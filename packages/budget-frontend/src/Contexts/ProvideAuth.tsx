import React, { createContext, useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useMeQuery, User } from '../generated/graphql';

interface Props {}

const authContext = createContext<User | null>(null);

const ProvideAuth: React.FC<Props> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = () => {
    const { data } = useMeQuery();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        data?.me && setUser(data?.me);
    }, [data?.me]);
    return user;
};

const PrivateRoute = ({ children, ...rest }: any) => {
    const auth = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export { PrivateRoute };

export default ProvideAuth;
