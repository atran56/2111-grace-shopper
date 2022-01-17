import axios from "axios";

// Action Type
const GOT_CART_ITEMS = "GOT_CART_ITEMS";

// Action Creator
const gotCartItems = cart => ({
    type: GOT_CART_ITEMS,
    cart,
  });

// Thunks
export const fetchCart = dispatch => {
    return async dispatch => {
      const { data: cart } = await axios.get("/api/cart");
      dispatch(gotCartItems(cart));
    };
  };

// Sub-Reducer
const initialState = [];

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case GOT_CART_ITEMS:
        return action.cart;
      default:
        return state;
    }
  };
  
  export default cartReducer;