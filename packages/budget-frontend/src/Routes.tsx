import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';
import { Hi } from './pages/Hi';
// import { LoggedOutNav } from './components/LoggedOutNav';
import { LoggedInNav } from './components/LoggedInNav';
import { Transactions } from './pages/Transactions';
import { Dashboard } from './pages/Dashboard';

export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <LoggedInNav />
            {/* <LoggedOutNav /> */}
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/hi' component={Hi} />
                <Route exact path='/transactions' component={Transactions} />
                <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
};
