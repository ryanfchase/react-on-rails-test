import React, { Component } from 'react';
import Registration from './auth/Registration'

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    // TODO update parent component
    this.props.history.push("/"); // we have props.history from ReactRouter
  }

  render() {
    return(
      <div>
        <h1>Login</h1>
        <h3>Status: {this.props.loggedInStatus} </h3>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }

}

export default Login;