import React from "react";
import { fetchCart } from "../store/Cart";
import { fetchSuperhero } from "../store/singleSuperhero";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//itemizedOrders and superheroes to populate cart
const userId = {
  userId: 2
}
class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart(userId)
  }
  render() {
    //const orderTotal = this.state.cart.reduce((acc, currVal) => acc.subtotal + currVal.subtotal)
    console.log("HERE!!!!", this.props.cart)
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {(this.props.cart.itemizedOrders.length <= 1) ? <h4>{this.props.cart.itemizedOrders.length} Superhero in your cart</h4>
            : <h4>{this.props.cart.itemizedOrders.length} Superheroes in your cart</h4>}
          </div>
        </div>
          <div className="cart-table"> 
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="col-sm-4">Superhero</th>
                  <th scope="col" className="col-sm-3">Price per Day</th>
                  <th scope="col" className="col-sm-3">Number of Days Booked</th>
                  <th scope="col" className="col-sm-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cart.itemizedOrders.map(item => (
                  <tr>
                    <th scope="row">
                      <img src={this.props.superhero[item.superheroId].image} style={{ width: '150px', height: '150px', borderRadius: '50%'}}/>
                    </th>
                    <td>${this.props.superhero[item.superheroId].cost}</td>
                    <td>
                    <div className="counter">
                    <input width="50px" type="number" className="form-control" id="input" value={item.days} min="0" max="14"/>
                    </div>
                  </td>
                  <td>${item.subtotal}</td>
                </tr>
                ))}
                <tr>
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td>SUBTOTAL: $100</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div className="float-end">
              <button type="button" className="btn btn-light">Update Cart</button>
              <button type="button" className="btn btn-success">Checkout</button>
            </div>
            <div className="float-start">
              <Link to="/all">
              <button type="button" className="btn btn-light">Continue Shopping</button>
              </Link>
            </div>
          </div>
      </div>
      
    )
  }
}

const mapState = state => ({
    cart: state.cart,
    superhero: state.superhero
  });
  
  const mapDispatch = dispatch => ({
    fetchCart: (userId) => dispatch(fetchCart(userId)),
    fetchSuperhero: () => dispatch(fetchSuperhero(superheroId))
  });
  
  export default connect(mapState, mapDispatch)(Cart);