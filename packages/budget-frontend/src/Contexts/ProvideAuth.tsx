import React, { createContext, useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { getAccessToken } from '../accessToken';

interface Props {}

const authContext = createContext<string | null>(null);

const ProvideAuth: React.FC<Props> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = () => {
    return getAccessToken();
};

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
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
