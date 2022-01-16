import React from "react";
import { connect } from "react-redux";
import bootstrap from 'bootstrap';


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
                <th scope="col">Superhero</th>
                <th scope="col">Price per Day</th>
                <th scope="col">Number of Days Booked</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
          <div className="col-md-12">
            <div className="float-right">
              <button type="button" class="btn btn-light">Update Cart</button>
            </div>
            <div className="float-left">
              <button type="button" class="btn btn-light">Continue Shopping</button>
            </div>
          </div>
          <div className="col-md-12">
            <div className="float-right">
              <button type="button" class="btn btn-success">Checkout</button>
            </div>
          </div>
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