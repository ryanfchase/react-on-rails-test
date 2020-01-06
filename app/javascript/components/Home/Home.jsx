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
    // TODO some sort of quick load on cart, perhaps sessionStorage
  }

  componentDidMount() {
    let course_episodes = localStorage.getItem(EPISODES_KEY); // TODO - switch to sessionStorage

    if (course_episodes) {
      this.setState({course_episodes: JSON.parse(course_episodes)})
    } else {
      axios.get('/episodes')
        .then(data => {

          course_episodes = data.data.map( e =>
            ({...e, active: false})
          );

          this.setState({course_episodes: course_episodes});
          localStorage.setItem(EPISODES_KEY, JSON.stringify(course_episodes)) // TODO - switch to sessionStorage
        }).catch( err => {
          console.log("error while display Home", err);
        })
    }
  }

  addToCart = (cartItem) => {
    let cartIdx = -1
    this.state.cart.forEach((e, idx) => {
      cartIdx = cartItem.id === e.id ? idx : cartIdx;
    })

    if (cartIdx === -1) {
      this.setState( prevState => {
        return ({ cart: [].concat(prevState.cart, {...cartItem, count: 1})})
       })
    } else {
      this.setState( prevState => {
        const prevItem = prevState.cart[cartIdx];
        const newItem = ({...prevItem, count: prevItem.count + 1});
        return ({ cart: [].concat(
                            prevState.cart.slice(0, cartIdx),
                            newItem,
                            prevState.cart.slice(cartIdx + 1)
        )})
      })
    }
  }

  removeFromCart = (cartItem) => {

    let cartIdx = -1;
    this.state.cart.forEach((e, idx) => {
      cartIdx = cartItem.id === e.id ? idx : cartIdx;
    })

    if (cartIdx !== -1) {
      let count = cartItem.count;
      if (count === 1) {
        this.setState( prevState => ({
          cart: [].concat(
                    prevState.cart.slice(0, cartIdx),
                    prevState.cart.slice(cartIdx + 1)
        )}))
      } else {
        this.setState( prevState => {
          const prevItem = prevState.cart[cartIdx];
          const newItem = ({...prevItem, count: prevItem.count - 1});
          return ({ cart: [].concat(
                              prevState.cart.slice(0, cartIdx),
                              newItem,
                              prevState.cart.slice(cartIdx + 1)
          )})
        })
      }
    } else {
      console.log("tried to remove ", JSON.stringify(cartItem), " but cart was ", JSON.stringify(this.state.cart))
      console.log("tried to remove index of", cartIdx)
    }
  }

  removeAllOfItemFromCart = (cartItem) => {
    let cartIdx = -1;
    this.state.cart.forEach((e, idx) => {
      cartIdx = cartItem.id === e.id ? idx : cartIdx;
    })

    if (cartIdx !== -1) {
      this.setState( prevState => ({
        cart: [].concat(
                  prevState.cart.slice(0, cartIdx),
                  prevState.cart.slice(cartIdx + 1)
      )}))
    }
    else {
      console.log("tried to remove ALL", JSON.stringify(cartItem), " but cart was ", JSON.stringify(this.state.cart))
      console.log("tried to remove index of", cartIdx)
    }
  }

  removeAllFromCart = () => {
    this.setState({ cart: []});
  }

  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <h3>Status: {this.props.loggedInStatus} </h3>
        <h3> Total Amount: { this.state.cart.reduce((total, cartItem) => total + cartItem.price, 0) }</h3>
        <TableBasic
          addToCart={this.addToCart}
          removeAllFromCart={this.removeAllFromCart}
          removeFromCart={this.removeFromCart}
          removeAllOfItemFromCart={this.removeAllOfItemFromCart}
          course_episodes={this.state.course_episodes}
          cart={this.state.cart}
        />
      </div>
    );
  }
}

export default Home;