// -Jumbotron
// -TableOfContents/List
//   -Items
//     -Preview/Thumbnail
//   -ActiveItem
//     -Video

import React, { Component } from 'react';
import Jumbotron from './Jumbotron';
import Table from './Table/Table';
import Navbar from './Navbar';
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

  // Toggle when clicked
  handleItemActivate(item, event) {
    event.preventDefault();
    this.setState({course_episodes: this.state.course_episodes.map((e, idx) => 
      ({...e, active: item.id-1 === idx ? !item.active : false})
    )});
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h3>Status: {this.props.loggedInStatus} </h3>
        {/* <Navbar />
        <Jumbotron />
        <Table 
          handleItemActivate={this.handleItemActivate.bind(this)}
          course_episodes={this.state.course_episodes}
        /> */}
      </div>
    );
  }
}

export default Home;