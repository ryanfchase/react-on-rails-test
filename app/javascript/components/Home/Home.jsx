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

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = { course_episodes: [], };
  }

  componentDidMount() {
    axios.get('/episodes')
      .then(data => {
        this.setState({course_episodes: data.data.map((e, idx) => 
          ({...e, active: false})
        )});

      }).catch( err => {
        console.log("error while display Home", err);
      })
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h3>Status: {this.props.loggedInStatus} </h3>
        <TableBasic onChange={this.handleChange} course_episodes={this.state.course_episodes} />
        
      </div>
    );
  }
}

export default Home;