// Run this example by adding <%= javascript_pack_tag 'index' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Login from '../components/Login';
import Home from '../components/Home/Home';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    })
  }

  checkLoginStatus() {
    axios.get("/logged_in", { withCredentials: true })
      .then(res => {
        // console.log("loggied in?", JSON.stringify(res))
        if(res.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: res.data.user
          });
        }
        else if(!res.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
          // Log them out if our DB says their session is no longer good
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: res.data.user
          });
        }
      })
      .catch(err => {
        console.log("login error", err);
      })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
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
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
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
