// -Jumbotron
// -TableOfContents/List
//   -Items
//     -Preview/Thumbnail
//   -ActiveItem
//     -Video

import React, { Component } from 'react';
// import Jumbotron from './Jumbotron';
// import Table from './Table/Table';
// import Navbar from './Navbar';
import TableBasic from './Table/TableBasic';
import axios from 'axios';

const EPISODES_KEY = "episodes";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = { course_episodes: [], cart: []};
  }

  componentDidMount() {
    let course_episodes = localStorage.getItem(EPISODES_KEY);

    if (course_episodes) {
      this.setState({course_episodes: JSON.parse(course_episodes)})
    } else {
      axios.get('/episodes')
        .then(data => {

          course_episodes = data.data.map( e =>
            ({...e, active: false})
          );

          this.setState({course_episodes: course_episodes});
          localStorage.setItem(EPISODES_KEY, JSON.stringify(course_episodes))
        }).catch( err => {
          console.log("error while display Home", err);
        })
    }
  }

  addToCart = (episode) => {
    let cart = [].concat(this.state.cart, episode);
    this.setState({cart: cart})
  }

  removeFromCart = (episode) => {
    const { cart } = this.state;

    idx = cart.reduce((cartEpisode, retIdx, idx) => {
      episode.id === cartEpisode.id ? idx : -1
    }, -1)

    if (idx !== -1) {
      let cart = [].concat(cart, episode);
      this.setState({cart: cart})
    } else {
      // SOME ERROR HERE
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <h3>Status: {this.props.loggedInStatus} </h3>
        <h3> Total Amount: { this.state.cart.reduce((total, episode) => total + episode.price, 0) }</h3>
        <TableBasic addToCart={this.addToCart} course_episodes={this.state.course_episodes} cart={this.state.cart} />
      </div>
    );
  }
}

export default Home;