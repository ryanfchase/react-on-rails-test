import React, { Component } from 'react';


let cartKey = 0;

class TableBasic extends Component {

  aggregateCart = () => {
    return this.props.cart.reduce((aggregates, episode) => {
      if (episode.title in aggregates) {
        aggregates[episode.title] = aggregates[episode.title] + 1;
      }
      else {
        aggregates[episode.title] = 1;
      }
      return aggregates;
    }, {});
  }

  render() {

    const items = this.props.course_episodes.map( (episode) => {
      return (
        <div className="row px-4 py-1" key={episode.id}>
          <button className="mx-2" onClick={(e) => this.props.addToCart(episode)}> Add To Cart </button>
          {episode.title}
        </div>
      );
    });

    const cartAggregates = this.aggregateCart();

    const keys = Object.keys(cartAggregates);

    const cartItems = keys.length > 0 ? keys.map(key => {
      return (
        <div className="row px-4 py1" key={cartKey++}>
          {key} - ({cartAggregates[key]})
        </div>
      );
    }) : (
      <div className="row px-4 py1"> (No Items Selected)</div>
    );

    return (
      <div className="row">
        <div className="col">
          <h5>Items</h5>
          {items}
        </div>
        <div className="col">
          <h5>Cart</h5>
          {cartItems}
        </div>
      </div>
    );
  }
}

export default TableBasic;