import React from "react";
import Bootstrap from 'bootstrap';
import { connect } from "react-redux";


class Cart extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4># Superheroes in your cart</h4>
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
                <tr>
                  <th scope="row">Spiderman</th>
                  <td>$100.00</td>
                  <td>
                    <div className="counter">
                    <input width="50px" type="number" className="form-control" id="input" value="0" min="0" max="14"/>
                    </div>
                  </td>
                  <td>$100.00</td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td>SUBTOTAL: $$$</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div className="float-right">
              <button type="button" className="btn btn-light">Update Cart</button>
              <button type="button" className="btn btn-success">Checkout</button>
            </div>
            <div className="float-left">
              <button type="button" className="btn btn-light">Continue Shopping</button></div>
          </div>
      </div>
      
    )
  }
}

const mapState = state => ({
    cart: state.cart,
  });
  
  const mapDispatch = dispatch => ({
    // superheroesData: () => dispatch(fetchSuperheroes()),
  });
  
  export default connect(mapState, mapDispatch)(Cart);