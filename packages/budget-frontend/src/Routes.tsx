import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { SignIn } from './pages/SignIn';
import { Categories } from './pages/Categories/Categories';
import { Transactions } from './pages/Transactions/Transactions';

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path='/' component={Transactions} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/transactions' component={Transactions} />
            <Route exact path='/categories' component={Categories} />
        </Switch>
    );
};
