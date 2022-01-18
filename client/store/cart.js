import axios from "axios";

// Action Type
const GOT_CART_ITEMS = "GOT_CART_ITEMS";

// Action Creator
const gotCartItems = cart => ({
    type: GOT_CART_ITEMS,
    cart,
  });

// Thunks
export const fetchCart = (userId) => {
  return async dispatch => {
    try {
        const { data: cart } = await axios.get('/api/cart', userId);
        dispatch(gotCartItems(cart));
    }
    catch (error) {
      console.log('error when fetching cart items:', error)
    } 
  }
};

// Sub-Reducer
const initialState = {};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case GOT_CART_ITEMS:
        return action.cart;
      default:
        return state;
    }
  };
  
  export default cartReducer;