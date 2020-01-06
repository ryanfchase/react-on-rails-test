import React, { Component } from 'react';
import CartModifyButton from './CartModifyButton';

let cartKey = 0;

class TableBasic extends Component {

  episodeToTable = (episode) => {
    return (
      <div className="row px-4 py-1" key={episode.id}>
        <button className="mx-2" onClick={(e) => this.props.addToCart(episode)}> Add To Cart </button>
        {episode.title}
      </div>
    );
  }

  cartToTable = (cartItem) => {

    return (
      <div className="row px-4 py1" key={cartKey++}>
        <span>
          {cartItem.title} - <button>{cartItem.count}</button>
          <CartModifyButton 
            addToCart={this.props.addToCart}
            removeFromCart={this.props.removeFromCart}
            removeAllOfItemFromCart={this.props.removeAllOfItemFromCart}
            cartItem={cartItem}
          />
        </span>
      </div>
    );
  }

  emptyCartLabel = ( <div className="row px-4 py1"> (No Items Selected)</div>) ;

  render() {

    const items = this.props.course_episodes.map(this.episodeToTable);

    const cartItems = this.props.cart.length === 0 ?
      this.emptyCartLabel :
      this.props.cart.map(this.cartToTable);
      

    return (
      <div className="row">
        <div className="col">
          <h5>Items</h5>
          {items}
        </div>
        <div className="col">
          <h5>Cart</h5>
          <button onClick={this.props.removeAllFromCart}>Clear All</button>
          {cartItems}
        </div>
      </div>
    );
  }
}

export default TableBasic;