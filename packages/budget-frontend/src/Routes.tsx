import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';

import { Transactions } from './pages/Transactions';
import { useMeQuery } from './generated/graphql';
import { Categories } from './pages/Categories';
import { Dashboard } from './pages/Dashboard';
import { OldTransactions } from './pages/OldTransactions';

export const Routes: React.FC = () => {
    useMeQuery(); // maybe there's a beter way of doing this?

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/transactions' component={Transactions} />
                <Route exact path='/oldtransactions' component={OldTransactions} />
                <Route exact path='/categories' component={Categories} />
                <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
};
