import React, { Component } from 'react';
import CartModifyButton from './CartModifyButton';

let cartKey = 0;

class TableBasic extends Component {

  constructor(props) {
    super(props);

    const aggregates = this.aggregateCart();

    this.state = {
      aggregates: aggregates, 
      emptyCart: Object.keys(aggregates).length === 0,
    }
  }

  componentDidUpdate(prevProps) {
    if( prevProps.cart.length !== this.props.cart.length ) {
      const aggregates = this.aggregateCart();
      this.setState({
        aggregates: aggregates,
        emptyCart: Object.keys(aggregates).length === 0,
      });
    }
  }

  aggregateCart = () => {
    return this.props.cart.reduce((aggregates, episode) => {
      if (episode.title in aggregates) {
        aggregates[episode.title].count = aggregates[episode.title].count + 1;
      }
      else {
        aggregates[episode.title] = {count: 1, id: episode.id};
      }
      return aggregates;
    }, {});
  }

  tableItemFunc = (episode) => {
    return (
      <div className="row px-4 py-1" key={episode.id}>
        <button className="mx-2" onClick={(e) => this.props.addToCart(episode)}> Add To Cart </button>
        {episode.title}
      </div>
    );
  }

  cartItemFunc = (key) => {
    const aggregate = this.state.aggregates[key];
    console.log(key, JSON.stringify(aggregate))

    return (
      <div className="row px-4 py1" key={cartKey++}>
        <span>
          {key} - <button>{aggregate.count}</button>
          <CartModifyButton 
            addToCart={this.props.addToCart}
            removeFromCart={this.props.removeFromCart}
            aggregate={({...aggregate, title: key})}
          />
        </span>
      </div>
    );
  }

  emptyCartLabel = ( <div className="row px-4 py1"> (No Items Selected)</div>) ;

  render() {

    const { aggregates, emptyCart } = this.state;
    const items = this.props.course_episodes.map(this.tableItemFunc);

    const cartItems = emptyCart ?
      this.emptyCartLabel :
      Object.keys(aggregates).map(this.cartItemFunc);
      

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