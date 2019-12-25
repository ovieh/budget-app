import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Register } from './pages/pages/Register';
import { SignIn } from './pages/pages/SignIn';
import { Home } from './pages/pages/Home';
import { Hi } from './pages/pages/Hi';

export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <header>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/signin'>Sign in</Link>
                    </li>
                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                    <li>
                        <Link to='/hi'>Hi</Link>
                    </li>
                </ul>
            </header>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/hi' component={Hi} />
            </Switch>
        </BrowserRouter>
    );
};
