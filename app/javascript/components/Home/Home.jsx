// -Jumbotron
// -TableOfContents/List
//   -Items
//     -Preview/Thumbnail
//   -ActiveItem
//     -Video

// import Jumbotron from './Jumbotron';
// import Table from './Table/Table';
// import Navbar from './Navbar';
import React, { Component } from 'react';
import TableBasic from './Table/TableBasic';
import MyHeader from './Header';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

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
      <div>
        <MyHeader />
        <div className="container">
          <div>
            <Typography variant="h3"> Adventuer Awaits </Typography>
            <Typography variant="h5"> Know Before You Go </Typography>
          </div>

{/* working here */}
          <div >
            <div >
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
{/* working here */}


          <Typography variant="h5"> Status: {this.props.loggedInStatus} </Typography>
          <Typography variant="h5">
            Total Amount: {this.state.cart.reduce((total, cartItem) => total + cartItem.price * cartItem.count, 0)}
          </Typography>

          <TableBasic
            addToCart={this.addToCart}
            removeAllFromCart={this.removeAllFromCart}
            removeFromCart={this.removeFromCart}
            removeAllOfItemFromCart={this.removeAllOfItemFromCart}
            course_episodes={this.state.course_episodes}
            cart={this.state.cart}
          />
        </div>
      </div>
    );
  }
}

export default Home;