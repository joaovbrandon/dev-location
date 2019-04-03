import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Main, NotFound } from './pages';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/dev-location/" component={Main} />
      <Route path="/dev-location/*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
