import React from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/order"
import { createOrder } from "../store/orders"
import { completeOrder } from "../store/order"

class CheckoutForm extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: 0,
      checkOut: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("CHECKOUT COMPONENT MOUNTING. this.props: ", this.props)
    this.props.fetchOrder(this.props.userId)
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('THIS.PROPS.ORDER FROM HANDLESUBMIT: ', this.props.order)
    this.props.completeOrder({
      id: this.props.order.data.id,
      userId: this.props.order.data.userId,
      checkOut: true,
      totalDays: this.props.order.data.totalDays
    });
    this.props.createOrder({
      orderId: this.props.order.data.id,
      totalDays: this.props.order.data.totalDays,
      userId: this.props.userId,
      checkOut: false
    })
  }

  render() {
      console.log("**this.props.order", this.props.order)
    return (
        <div className="container">
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
          <button className="btn btn-primary btn-lg btn-block">Complete Purchase</button>
          {/* <button className="btn btn-primary btn-lg btn-block" type="submit">Complete Purchase</button> */}
        </form>
      </div></div>
    );
  }
}

const mapState = state => {
  console.log("***STATE.AUTH:", state.auth)
  return {
    userId: state.auth.id,
    order: state.order
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchOrder: (id) => dispatch(fetchOrder(id)),
    completeOrder: (order) => dispatch(completeOrder(order)),
    createOrder: (order) => dispatch(createOrder(order)),
  };
};

export default connect(mapState, mapDispatch)(CheckoutForm);
