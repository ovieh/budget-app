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
                    <PrivateRoute path='/'>
                        <Route exact path='/' component={Transactions} />
                    </PrivateRoute>
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/signin' component={SignIn} />
                    <PrivateRoute path='/transactions'>
                        <Route component={Transactions} />
                    </PrivateRoute>
                    <PrivateRoute path='/categories'>
                        <Route exact component={Categories} />
                    </PrivateRoute>
                </Switch>
            </BrowserRouter>
        </ProvideAuth>
    );
};
