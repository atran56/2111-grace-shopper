import React from "react";
import { connect } from "react-redux";
import { completeOrder } from "../store/order"
import { Link } from "react-router-dom";
import { fetchCart } from "../store/cart";
import { createReservation } from "../store/reservations";

class CheckoutForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart();
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createReservation({
      userId: this.props.userId,
      orderId: this.props.cart.cart.id,
      cartItems: this.props.cart.cart.itemizedOrders
    })
    this.props.completeOrder({
      userId: this.props.userId,
      checkOut: true,
    });
  }

  render() {
    if (this.props.cart.loading) {
      return <p>Data is loading...</p>;
    }
    console.log(this.props)
    return (
        <div className="container">
          <div className="row mt-4">
        <h4>Total items in cart: {this.props.cart.cart.itemizedOrders.length} </h4>
        <h4>Total order cost: ${this.props.cart.cart.itemizedOrders.reduce((acc, item) => {
      return acc + item.subtotal;
    }, 0)}</h4>
    </div>
    <div className="row mt-4">
        <div className="col-md-8 order-md-1">
        <h4 className="mb-3">Billing address</h4>
        <form onSubmit={this.handleSubmit} className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName">First name</label>
              <input type="text" className="form-control" id="firstName" placeholder="First Name" required />
              <div className="invalid-feedback"> Valid first name is required. </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName">Last name</label>
              <input type="text" className="form-control" id="lastName" placeholder="Last Name" required />
              <div className="invalid-feedback"> Valid last name is required. </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
            <input type="email" className="form-control" id="email" placeholder="you@example.com" />
            <div className="invalid-feedback"> Please enter a valid email address for shipping updates. </div>
          </div>
          <div className="mb-3">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
            <div className="invalid-feedback"> Please enter your shipping address. </div>
          </div>
          <div className="mb-3">
            <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
            <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
          </div>
          <div className="row">
            <div className="col-md-5 mb-3">
              <label htmlFor="country">Country</label>
              <select className="custom-select d-block w-100" id="country" required>
                <option value>Choose...</option>
                <option>United States</option>
              </select>
              <div className="invalid-feedback"> Please select a valid country. </div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="state">State</label>
              <select className="custom-select d-block w-100" id="state" required>
                <option value>Choose...</option>
                <option>California</option>
              </select>
              <div className="invalid-feedback"> Please provide a valid state. </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="zip">Zip</label>
              <input type="text" className="form-control" id="zip" placeholder required />
              <div className="invalid-feedback"> Zip code required. </div>
            </div>
          </div>
          <hr className="mb-4" />
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="same-address" />
            <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="save-info" />
            <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
          </div>
          <hr className="mb-4" />
          <h4 className="mb-3">Payment</h4>
          <div className="d-block my-3">
            <div className="custom-control custom-radio">
              <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" defaultChecked required />
              <label className="custom-control-label" htmlFor="credit">Credit card</label>
            </div>
            <div className="custom-control custom-radio">
              <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
              <label className="custom-control-label" htmlFor="debit">Debit card</label>
            </div>
            <div className="custom-control custom-radio">
              <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
              <label className="custom-control-label" htmlFor="paypal">PayPal</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="cc-name">Name on card</label>
              <input type="text" className="form-control" id="cc-name" placeholder required />
              <small className="text-muted">Full name as displayed on card</small>
              <div className="invalid-feedback"> Name on card is required </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="cc-number">Credit card number</label>
              <input type="text" className="form-control" id="cc-number" placeholder required />
              <div className="invalid-feedback"> Credit card number is required </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="cc-expiration">Expiration</label>
              <input type="text" className="form-control" id="cc-expiration" placeholder required />
              <div className="invalid-feedback"> Expiration date required </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="cc-cvv">CVV</label>
              <input type="text" className="form-control" id="cc-cvv" placeholder required />
              <div className="invalid-feedback"> Security code required </div>
            </div>
          </div>
          <hr className="mb-4" />
          <button className="btn btn-primary btn-lg btn-block" type="submit">Complete Purchase</button>
        </form>
      </div></div></div>
    );
  }
}

const mapState = state => {
  return {
    userId: state.auth.id,
    cart: state.cart,
    loading: state.loading,
    superheroes: state.superheroes,
  }
}

const mapDispatch = (dispatch, {history}) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    completeOrder: (order) => dispatch(completeOrder(order, history)),
    createReservation: (cart) => dispatch(createReservation(cart))
  };
};

export default connect(mapState, mapDispatch)(CheckoutForm);
