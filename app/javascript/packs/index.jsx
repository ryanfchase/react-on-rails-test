// Run this example by adding <%= javascript_pack_tag 'index' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Login from '../components/Login';
import Home from '../components/Home/Home';
import 'bootstrap/dist/css/bootstrap.css';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    // <Home />,
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/login"} component={Login} />
        </Switch>
      </BrowserRouter>
    </div>,
    document.body.appendChild(document.createElement('div')),
  )
})
