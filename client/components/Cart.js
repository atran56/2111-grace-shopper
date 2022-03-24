import React from "react";
import { fetchCart } from "../store/cart";
import { deleteItem } from "../store/cart";
import { connect } from "react-redux";
import { editCartItem } from "../store/cart";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      currHero: null,
      blockedCheckout: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }
  componentDidMount() {
    this.props.fetchCart();
  }
  handleChange(e) {
    this.setState({
      days: e.target.value,
      currHero: Number(e.target.className),
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.editCartItem({
      orderId: this.props.cart.cart.id,
      superheroId: this.state.currHero,
      days: this.state.days,
    });
    this.setState({
      days: 0,
      currHero: null,
    });
  }
  handleCheckout() {
    this.setState({
      blockedCheckout: true
    })
  }
  render() {
    console.log(this.props.cart)
    const token = window.localStorage.getItem('token');
    if (this.props.cart.loading) {
      return <p>Data is loading...</p>
    }
    else if (this.props.cart.cart.itemizedOrders.length === 0) {
      return <h1>0 Superheroes in your cart</h1>
    }
    const subtotal = this.props.cart.cart.itemizedOrders.reduce((acc, item) => {
      return acc + item.subtotal;
    }, 0);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {this.props.cart.cart.itemizedOrders.length === 1 ? (
              <h4>1 Superhero in your cart</h4>) : (
              <h4>
                {this.props.cart.cart.itemizedOrders.length} Superheroes in your
                cart
              </h4>
            )}
            {this.state.blockedCheckout ? <div class="alert alert-warning" role="alert">Only members can book our Superheroes. <Link to="/login">Please log in</Link> or <Link to="/signup">Create an account</Link> </div> 
            : null}
          </div>
        </div>
        <div className="cart-table">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col" className="col-sm-4">
                  Superhero
                </th>
                <th scope="col" className="col-sm-2">
                  Price per Day
                </th>
                <th scope="col" className="col-sm-2">
                  Start Date
                </th>
                <th scope="col" className="col-sm-2">
                  End Date
                </th>
                <th scope="col" className="col-sm-1">
                  Total
                </th>
                <th scope="col" className="col-sm-1">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.cart.cart.itemizedOrders.map((item) => (
                <tr>
                  <th scope="row">
                    <Link to={`/superheroes/${this.props.cart.superheroes[item.superheroId].id}`}>
                    <img
                      src={this.props.cart.superheroes[item.superheroId].image}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                    /> </Link >
                  </th>
                  <td>${this.props.cart.superheroes[item.superheroId].cost}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate.toString()}</td>
                  <td>${parseFloat(item.subtotal).toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        this.props.deleteItem({
                          orderId: item.orderId,
                          superheroId: item.superheroId,
                        })
                      }
                      className="btn btn-link"
                    >
                      remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td>SUBTOTAL: ${parseFloat(subtotal).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="float-end">
            <button
              type="submit"
              onClick={this.handleSubmit}
              type="button"
              className="btn btn-light"
            >
              Update Cart
            </button>
            {token ? 
            <Link to="/checkout">
            <button type="button" className="btn btn-success">
              Checkout
            </button>
            </Link> : <button type="button" onClick={this.handleCheckout} className="btn btn-success">Checkout</button>}
          </div>
          <div className="float-start">
            <Link to="/superheroes">
              <button type="button" className="btn btn-light">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  cart: state.cart,
  loading: state.loading,
  superheroes: state.superheroes,
});

const mapDispatch = (dispatch) => ({
  fetchCart: () => dispatch(fetchCart()),
  deleteItem: (item) => dispatch(deleteItem(item)),
  editCartItem: (item) => dispatch(editCartItem(item)),
});

export default connect(mapState, mapDispatch)(Cart);
