import React, { Component } from 'react';
import axios from 'axios';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      loginErrors: ""
    }
  }

  handleSubmit = (event) => {
    // console.log("FORM SUBMITTED")
    const {
      email,
      password,
    } = this.state

    axios.post("/sessions", {
      user: {
        email: email,
        password: password,
      }
    },
    { withCredentials: true }) // THIS IS CRUCIAL. THIS TELLS THE API THAT 
                                // ITS OK TO SET COOKIE IN CLIENT
                                // otherwise it won't be set (SILENTLY)
                                // Server side it will act as logged in.
                                // Client side it will not be logged in.
    .then(res => {
      console.log("response from login: ", res);
      if(res.data.logged_in) {
        this.props.handleSuccessfulAuth(res.data)
      }

    })
    .catch(err => {
      console.log("login error", err);
    })
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div>Login Goes Here</div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default SignInForm;