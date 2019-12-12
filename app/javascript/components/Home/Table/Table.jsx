import React, { Component } from 'react';
import Item from './Item'
import ActiveItem from './ActiveItem'

class Table extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const items = this.props.course_episodes.map( (episode) => {
      let handleItemActivate = this.props.handleItemActivate.bind(this, episode)
      return (
        episode.active ?
          <ActiveItem
            key={episode.id}
            title={episode.title}
            description={episode.description}
            handleItemActivate={handleItemActivate}
          />
          :
          <Item
            key={episode.id}
            title={episode.title}
            description={episode.description}
            handleItemActivate={handleItemActivate}
          />
        );
    });
    return (
      <div className="pt-5 pb-5">
        <div className="container">
          <div className="text-center">
            <h2 className="pt-4 pb-4">React For Rails Developers - Videos</h2>
            {items}
          </div>
        </div>
      </div>
    );
  }
}

export default Table;