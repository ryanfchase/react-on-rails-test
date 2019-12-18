import React, { Component } from 'react';
import axios from 'axios';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    // console.log("FORM SUBMITTED")
    const {
      email,
      password,
      password_confirmation
    } = this.state

    axios.post("/registrations", {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    },
    { withCredentials: true }) // THIS IS CRUCIAL. THIS TELLS THE API THAT 
                                // ITS OK TO SET COOKIE IN CLIENT
                                // otherwise it won't be set (SILENTLY)
                                // Server side it will act as logged in.
                                // Client side it will not be logged in.
    .then(res => {
      console.log("registration res", res);
      if(res.data.status === 'created') {
        this.props.handleSuccessfulAuth(res.data);
        this.setState({
          email: "",
          password: "",
          password_confirmation: "",
          registrationErrors: "" 
        })
      }
      else {
         //  DO ERROR MESSAGE
      }
    })
    .catch(err => {
      console.log("registration error", err)
    })
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div>Registration Goes Here</div>
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
          <input 
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;