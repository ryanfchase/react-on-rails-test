// Run this example by adding <%= javascript_pack_tag 'index' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Login from '../components/Login';
import Home from '../components/Home/Home';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    })
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} /> // need to find out what props has (route props)
              )}
            />
            <Route
              exact
              path={"/login"}
              render={props => (
                <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
