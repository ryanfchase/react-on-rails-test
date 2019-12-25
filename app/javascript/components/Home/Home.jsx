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

    this.state = { course_episodes: [], };
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

  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <h3>Status: {this.props.loggedInStatus} </h3>
        <div className="row">
          <div className="col">
            <TableBasic course_episodes={this.state.course_episodes} />
          </div>
          <div className="col order-12">
            asdfasdf
          </div>
        </div>
        
      </div>
    );
  }
}

export default Home;