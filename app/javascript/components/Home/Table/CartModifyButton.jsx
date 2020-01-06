import React, { Component } from 'react';
import ReactModal from 'react-modal';

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
      <div>
        <button onClick={this.handleOpenModal}> Open Modal </button>
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
      </div>
    );
  }

}

export default CartModifyButton;