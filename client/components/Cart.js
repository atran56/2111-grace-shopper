import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//itemizedOrders, superhero to populate cart

const dummyItemizedOrder = [
  {
    days: 5,
    subtotal: 500,
    superheroId: 1,
    orderId: 1
}, {
    days: 5,
    subtotal: 500,
    superheroId: 5,
    orderId: 1
  }
]
const dummySuperHero = {
  1: {
    name: "spiderman",
    cost: 400,
    image: "https://www.superherodb.com/pictures2/portraits/10/100/1540.jpg"
  }, 
  5: {
    name: "superman",
    cost: 500,
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10560.jpg"
  }
}


class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: dummyItemizedOrder,
      heroes: dummySuperHero
    }
  }
  render() {
    const orderTotal = this.state.cart.reduce((acc, currVal) => acc.subtotal + currVal.subtotal)
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {(this.state.cart.length <= 1) ? <h4>{this.state.cart.length} Superhero in your cart</h4>
            : <h4>{this.state.cart.length} Superheroes in your cart</h4>}
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
                {this.state.cart.map(order => (
                  <tr>
                    <th scope="row">
                      <img src={this.state.heroes[order.superheroId].image} style={{ width: '150px', height: '150px', borderRadius: '50%'}}/>
                    </th>
                    <td>${this.state.heroes[order.superheroId].cost}</td>
                    <td>
                    <div className="counter">
                    <input width="50px" type="number" className="form-control" id="input" value={order.days} min="0" max="14"/>
                    </div>
                  </td>
                  <td>${order.subtotal}</td>
                </tr>
                ))}
                <tr>
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td>SUBTOTAL: ${orderTotal}</td>
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
  });
  
  const mapDispatch = dispatch => ({
    // superheroesData: () => dispatch(fetchSuperheroes()),
  });
  
  export default connect(mapState, mapDispatch)(Cart);