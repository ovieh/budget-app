import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { SignIn } from './pages/SignIn';
import { Categories } from './pages/Categories/Categories';
import { Transactions } from './pages/Transactions/Transactions';
import ProvideAuth, { PrivateRoute } from './Contexts/ProvideAuth';

export const Routes: React.FC = () => {
    return (
        <ProvideAuth>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path='/'>
                        <Route component={Transactions} />
                    </PrivateRoute>
                    <Route path='/register' component={Register} />
                    <Route path='/signin' component={SignIn} />
                    <PrivateRoute exact path='/transactions'>
                        <Route component={Transactions} />
                    </PrivateRoute>
                    <PrivateRoute exact path='/categories'>
                        <Route component={Categories} />
                    </PrivateRoute>
                </Switch>
            </BrowserRouter>
        </ProvideAuth>
    );
};
