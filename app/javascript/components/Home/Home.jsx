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
      course_episodes: [
        { id: 1, title: 'Florida Man Takes All', description: 'lorem', active: false },
        { id: 2, title: 'Rabid Dog Saves Grandmother', description: 'ipsum', active: false },
        { id: 3, title: 'Kentucky Railroad Missing, Wabbit At Large', description: 'Here Lies', active: false },
        { id: 4, title: 'React Tutorial', description: 'Rick\'s Son', active: false },
      ],
    }
  }

  componentDidMount() {
    axios.get('/episodes')
      .then(data => {
        let res = []
        data.data.data.map((e, idx) => {
          // res.push()
        });

      }).catch( err => {
        // debugger
      })
  }

  // ({...e, active: item.id-1 === idx ? true : false})
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