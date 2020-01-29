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

const EPISODES_KEY = "episodes";
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

class Home extends Component {
  const classes = useStyles();

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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
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