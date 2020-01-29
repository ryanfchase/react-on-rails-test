import React, { Component } from 'react';
import Item from './Item.jsx';
import CartModifyButton from './CartModifyButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



let cartKey = 0;


class TableBasic extends Component {

  episodeToTable = (episode) => {
    return (
      <div className="px-1 py-2" key={episode.id}>
        <Item
          episode={episode}
          addToCart={this.props.addToCart}
        />
      </div>
    );
  }

  cartToTable = (cartItem) => {

    return (
      <div className="row px-4 py-2 text-nowrap" key={cartKey++}>
        <span>
          <CartModifyButton 
            addToCart={this.props.addToCart}
            removeFromCart={this.props.removeFromCart}
            removeAllOfItemFromCart={this.props.removeAllOfItemFromCart}
            cartItem={cartItem}
          />
          {cartItem.title} - <Button>{cartItem.count}</Button>
        </span>
      </div>
    );
  }

  emptyCartLabel = ( <div className="row px-4 py1"> (No Items Selected)</div>) ;

  render() {

    const items = this.props.course_episodes.map(this.episodeToTable);
    const emptyCart = this.props.cart.length === 0;

    const cartItems = emptyCart ?
      this.emptyCartLabel :
      this.props.cart.map(this.cartToTable);
      

    return (
      <div className="row">
        <div className="col">
          <Typography variant="h3">Items</Typography>
          <div style={{overflow: "auto"}} className="d-flex flex-row p-2">
            {items}
          </div>
        </div>
        <div className="col">
          <Typography variant="h5">Cart</Typography>
          <Button color="secondary" variant="contained" disabled={emptyCart} onClick={this.props.removeAllFromCart}> Clear All </Button>
          {cartItems}
        </div>
      </div>
    );
  }
}

export default TableBasic;