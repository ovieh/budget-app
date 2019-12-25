import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Register } from './pages/pages/Register';
import { SignIn } from './pages/pages/SignIn';
import { Home } from './pages/pages/Home';
import { Hi } from './pages/pages/Hi';
// import { LoggedOutNav } from './components/LoggedOutNav';
import { LoggedInNav } from './components/LoggedInNav';
import { Dashboard } from './pages/pages/Dashbaord';

export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <LoggedInNav />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/hi' component={Hi} />
                <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
};
