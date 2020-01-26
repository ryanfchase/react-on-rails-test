import React, { Component } from 'react';
import CartModifyButton from './CartModifyButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Sunrise from 'images/sunrise.png'


let cartKey = 0;

const MyCard = styled(Card)({
  maxWidth: 345,
})

const MyCardMedia = styled(CardMedia)({
  height: 140,
})

class TableBasic extends Component {


  episodeToTable = (episode) => {

    return (
      <div className="row px-4 py-1" key={episode.id}>

        <MyCard>
          <CardActionArea>
            <MyCardMedia 
              image={Sunrise}
            >

            </MyCardMedia>
          </CardActionArea>
          <CardContent>
            <Typography variant="h5">CARD</Typography>
          </CardContent>

        </MyCard>

        <Button variant="contained" className="mx-2" onClick={(e) => this.props.addToCart(episode)}>Add To Cart </Button>
        {episode.title}
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
          {items}
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