import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

const MAX_TITLE_LENGTH = 7

class CartModifyButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  MAX_TITLE_LENGTH = 7;

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleAddToCart = () => {
    // const episode = this.props.cartItem
    // this.props.addToCart
  }

  render() {

    let cartItem = this.props.cartItem;
    let title = cartItem.title;

    if (title.length > MAX_TITLE_LENGTH) {
      title.slice(0, MAX_TITLE_LENGTH).concat("...");
    }

    return (
      <span className="px-2">
        <Button color="primary" variant="contained" onClick={ this.handleOpenModal}> Open Modal </Button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Cart Modify Modal"
          ariaHideApp={false}
        >
          <button onClick={e => this.props.addToCart(cartItem)}> Add Another "{title}"</button>
          <button onClick={e => this.props.removeFromCart(cartItem)}> Remove One "{title}"</button>
          <button onClick={e => this.props.removeAllOfItemFromCart(cartItem)}> Remove All of "{title}"</button>
          <button onClick={this.handleCloseModal}> Close Modal </button>
          Amount: {this.props.cartItem.count}
        </ReactModal>
      </span>
    );
  }

}

export default CartModifyButton;