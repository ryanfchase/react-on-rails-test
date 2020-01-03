import React, { Component } from 'react';
import ReactModal from 'react-modal';

const MAX_TITLE_LENGTH = 7

class CartModifyButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      title: this.props.aggregate.title,
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

    let title = this.state.title;

    if (title.length > MAX_TITLE_LENGTH) {
      title.slice(0, MAX_TITLE_LENGTH).concat("...");
    }

    console.log(JSON.stringify(this.props.aggregate))

    return (
      <div>
        <button onClick={this.handleOpenModal}> Open Modal </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Cart Modify Modal"
          ariaHideApp={false}
        >
          <button onClick={this.props.addToCart}> Add Another "{title}"</button>
          <button onClick={this.props.removeFromCart}> Remove One "{title}"</button>
          <button onClick={this.handleCloseModal}> Close Modal </button>
          Amount: {JSON.stringify(this.props.aggregate.count)}
        </ReactModal>
      </div>
    );
  }

}

export default CartModifyButton;