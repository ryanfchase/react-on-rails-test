import React, { Component } from 'react';
import Registration from './auth/Registration'
import SignIn from './auth/SignIn'
import axios from 'axios'

class Login extends Component {

  handleSuccessfulAuth = (data) => {
    this.props.handleLogin(data);
    this.props.history.push("/"); // we have props.history from ReactRouter
  }

  handleLogoutClick = () => {
    axios.delete('/logout', { withCredentials: true})
      .then(res => {
        console.log("logged out", res)
      })
      .catch(err => {
        console.log("error logging out", err)
      })

    this.props.handleLogout();
  }

  render() {
    return(
      <div>
        <h1>Login</h1>
        <h3>Status: {this.props.loggedInStatus} </h3>
        <button onClick={() => this.handleLogoutClick()}> LOGOUT </button>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <SignIn handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }

}

export default Login;