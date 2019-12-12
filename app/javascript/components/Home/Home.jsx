// -Jumbotron
// -TableOfContents/List
//   -Items
//     -Preview/Thumbnail
//   -ActiveItem
//     -Video

import React, { Component } from 'react';
import Jumbotron from './Jumbotron';
import Table from './Table/Table';
import axios from 'axios';

class Home extends Component {

  constructor() {
    super();

    // THIS IS A REPLACEMENT FOR A DB CALL
    this.state = {
      course_episodes: [],
    }
  }

  componentDidMount() {
    axios.get('/episodes')
      .then(data => {
        this.setState({course_episodes: data.data.map((e, idx) => 
          ({...e, active: false})
        )});

      }).catch( err => {
        // debugger
        // console.log("err " + err)
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