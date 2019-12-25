import React, { Component } from 'react';


class TableBasic extends Component {

  addToCart = (episode) => {
    console.log(episode)
  }

  render() {
    const items = this.props.course_episodes.map( (episode) => {
      return (
        <div className="row px-4 py-1" key={episode.id}>
          <button className="mx-2" onClick={(e) => this.addToCart(episode)}> Add To Cart </button>
          {episode.title}
        </div>
      );
    });
    return items;
  }
}

export default TableBasic;