import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing/index';
import Register from './pages/Register/index';
import Dashboard from './pages/Dashboard/index';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/register" exact component={Register} />
                <Route path="/dashboard" exact component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
}