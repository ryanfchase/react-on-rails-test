// Run this example by adding <%= javascript_pack_tag 'index' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Login from '../components/Login';
import Home from '../components/Home/Home';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import 'typeface-roboto';

const LOGIN_KEY = "loggedIn";
const LOGIN_VALUE = "LOGGED_IN";
const NO_LOGIN_VALUE = "NOT_LOGGED_IN";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: sessionStorage.getItem(LOGIN_KEY) || NO_LOGIN_VALUE,
      user: {},
    };
  }

  handleLogin = (data) => {
    sessionStorage.setItem(LOGIN_KEY, LOGIN_VALUE);
    this.setState({
      loggedInStatus: LOGIN_VALUE,
      user: data
    })
  }

  checkLoginStatus() {
    axios.get("/logged_in", { withCredentials: true })
      .then(res => {
        console.log("loggedInStatus", this.state.loggedInStatus)
        console.log("res status", res.data.logged_in)
        if(res.data.logged_in && this.state.loggedInStatus === NO_LOGIN_VALUE) {
          this.setState({
            loggedInStatus: sessionStorage.getItem(LOGIN_KEY) || LOGIN_VALUE,
            user: res.data.user
          });

          sessionStorage.setItem(LOGIN_KEY, LOGIN_VALUE);
        }
        else if(!res.data.logged_in && this.state.loggedInStatus === LOGIN_VALUE) {
          this.setState({
            loggedInStatus: NO_LOGIN_VALUE,
            user: res.data.user
          });

          sessionStorage.removeItem(LOGIN_KEY)
        }
      })
      .catch(err => {
        console.log("login error", err);
      })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout = () => {
    this.setState({
      loggedInStatus: NO_LOGIN_VALUE,
      user: {}
    })

    sessionStorage.removeItem(LOGIN_KEY);
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
                <Home
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                /> // need to find out what props has (route props)
              )}
            />

            <Route
              exact
              path={"/login"}
              render={props => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
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
