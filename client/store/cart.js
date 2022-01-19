import axios from "axios";

// Action Type
const GOT_CART_ITEMS = "GOT_CART_ITEMS";

// Action Creator
const gotCartItems = cart => ({
    type: GOT_CART_ITEMS,
    cart
  });

// Thunks
//NEED TO EDIT FETCHCART LATER ONCE JWT IS FIGURED OUT
export const fetchCart = () => {
  return async dispatch => {
    try {
        const { data: cart } = await axios.get('/api/cart');
        dispatch(gotCartItems(cart));
    }
    catch (error) {
      console.log('error when fetching cart items:', error)
    } 
  }
};

// Sub-Reducer
const initialState = {
  loading: true,
  cart: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
      case GOT_CART_ITEMS:
        return {loading: false, cart: action.cart}
      default:
        return state;
    }
  };
  