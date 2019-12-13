import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return(
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
                <span className="sr-only"></span>
              </li>
              <li className="nav-item">
                <a className="nav-link">Blog</a>
                <span className="sr-only"></span>
              </li>
            </ul>
            <div className="mr-sm-3">Profile</div>
            <svg className="mr-sm-3" width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> 
              <circle cx="50" cy="50" r="50"/>
            </svg>
          </div>
        </div>
    );
  }
}

export default Navbar;