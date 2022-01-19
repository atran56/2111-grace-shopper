import React from "react";
import { fetchCart } from "../store/Cart";
import { fetchSuperheroes } from "../store/superheroes";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
    this.props.fetchSuperheroes()
  }
  render() {
    if (this.props.cart.loading) {
      return (<p>Data is loading...</p>)
    }
    const subTotal = this.props.cart.cart.itemizedOrders.reduce((acc, currVal) => acc.subtotal + currVal.subtotal)
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {(this.props.cart.cart.itemizedOrders.length <= 1) ? <h4>{this.props.cart.cart.itemizedOrders.length} Superhero in your cart</h4>
            : <h4>{this.props.cart.cart.itemizedOrders.length} Superheroes in your cart</h4>}
          </div>
        </div>
          <div className="cart-table"> 
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="col-sm-4">Superhero</th>
                  <th scope="col" className="col-sm-3">Price per Day</th>
                  <th scope="col" className="col-sm-3">Number of Days Booked</th>
                  <th scope="col" className="col-sm-1">Total</th>
                  <th scope="col" className="col-sm-1">Remove</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cart.cart.itemizedOrders.map(item => (
                  <tr>
                    <th scope="row">
                      <img src={this.props.superheroes.filter(hero => {return (hero.id === item.superheroId)})[0].image} style={{ width: '150px', height: '150px', borderRadius: '50%'}}/>
                    </th>
                    <td>${this.props.superheroes.filter(hero => {return (hero.id === item.superheroId)})[0].cost}</td>
                    <td>
                    <div className="counter">
                    <input width="50px" type="number" className="form-control" id="input" value={item.days} min="0" max="14"/>
                    </div>
                  </td>
                  <td>${item.subtotal}</td>
                  <td><button type="button" class="btn btn-link">remove</button></td>
                </tr>
                ))}
                <tr>
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>SUBTOTAL: ${subTotal}</td>
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
              <Link to="/superheroes">
              <button type="button" className="btn btn-light">Continue Shopping</button>
              </Link>
            </div>
          </div>
      </div>
      
    )
  }
}

const mapState = (state) => ({
    cart: state.cart,
    loading: state.loading,
    superheroes: state.superheroes
  });
  
  const mapDispatch = (dispatch) => ({
    fetchCart: () => dispatch(fetchCart()),
    fetchSuperheroes: () => dispatch(fetchSuperheroes())
  });
  
  export default connect(mapState, mapDispatch)(Cart);