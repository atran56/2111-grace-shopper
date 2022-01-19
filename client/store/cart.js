import axios from "axios";

// Action Type
const GOT_CART_ITEMS = "GOT_CART_ITEMS";
const REMOVE_CART_ITEM = "REMOVE_CART_ITEMS";

// Action Creator
const gotCartItems = (cart, superheroes) => ({
  type: GOT_CART_ITEMS,
  cart,
  superheroes
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
        const superheroes = {};
        for(let i = 0; i < cart.itemizedOrders.length; i++){
          const {data: superhero} = await axios.get(`/api/superheroes/${cart.itemizedOrders[i].superheroId}`);
          superheroes[superhero.id] = superhero;
        }
        dispatch(gotCartItems(cart, superheroes));
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
  cart: {},
  superheroes: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
      case GOT_CART_ITEMS:
        return {loading: false, cart: action.cart, superheroes: action.superheroes}
      case REMOVE_CART_ITEM:
        return {
          ...state, 
          cart: {
            ...state.cart, 
            itemizedOrders: state.cart.itemizedOrders.filter((item) => (item.superheroId !== action.superheroId))
          },
          loading: false,
          superheroes: {...state.superheroes}
        };
      default:
        return state;
    }
  };
  