import React, { Component } from 'react';
import RegistrationForm from './auth/RegistrationForm'
import SignInForm from './auth/SignInForm'
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
        <RegistrationForm handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <SignInForm handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }

}

export default Login;