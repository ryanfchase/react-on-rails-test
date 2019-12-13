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

  constructor() {
    super();

    this.state = { course_episodes: [], }
  }

  componentDidMount() {
    axios.get('/episodes')
      .then(data => {
        this.setState({course_episodes: data.data.map((e, idx) => 
          ({...e, active: false})
        )});

      }).catch( err => {
        console.err(err);
        alert("uh oh... check the logs");
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
        <Navbar />
        <Jumbotron />
        <Table 
          handleItemActivate={this.handleItemActivate.bind(this)}
          course_episodes={this.state.course_episodes}
        />
      </div>
    );
  }
}

export default Home;