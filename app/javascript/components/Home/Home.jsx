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
        <div className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand">N A V B A R</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link">Home</a>
                <span className="sr-only">(current)</span>
              </li>
              <li className="nav-item">
                <a className="nav-link">Sections</a>
                <span className="sr-only">(current)</span>
              </li>
              <li className="nav-item">
                <a className="nav-link">Blog</a>
                <span className="sr-only">(current)</span>
              </li>
            </ul>
            <div className="mr-sm-3">Profile</div>
            <svg className="mr-sm-3" width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> 
              <circle cx="50" cy="50" r="50"/>
            </svg>
          </div>
        </div>
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