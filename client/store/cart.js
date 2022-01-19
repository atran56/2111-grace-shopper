import axios from "axios";

// Action Type
const GOT_CART_ITEMS = "GOT_CART_ITEMS";
const REMOVE_CART_ITEM = "REMOVE_CART_ITEMS";

// Action Creator
const gotCartItems = cart => ({
  type: GOT_CART_ITEMS,
  cart
});
const deleteCartItem = superheroId => ({
  type: REMOVE_CART_ITEM,
  superheroId,
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

export const deleteItem = (item) => {
  return async dispatch => {
    await axios.delete('/api/cart', {data: item});
    dispatch(deleteCartItem(item.superheroId));
  };
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
      case REMOVE_CART_ITEM:
        console.log("HERE!!!", state)
        return {
          ...state, 
          cart: {
            ...state.cart, 
            itemizedOrders: state.cart.itemizedOrders.filter((item) => (item.superheroId !== action.superheroId))
          },
          loading: false};
      default:
        return state;
    }
  };
  