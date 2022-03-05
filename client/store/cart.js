import axios from "axios";

// Action Type
const GOT_CART_ITEMS = "GOT_CART_ITEMS";
const REMOVE_CART_ITEM = "REMOVE_CART_ITEMS";
const ADD_CART_ITEM = "ADD_CART_ITEM";
const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";

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
const addCartItem = item => ({
  type: ADD_CART_ITEM,
  item
})
const updateCartItem = (item) => {
  return {
      type: UPDATE_CART_ITEM,
      item
  };
};



//UPDATE!!!!!! NEED TO UPDATE TO NEW BOOKEDDATES FIELD!!!!!!!!!!!!




const defaultCart = '{"totalDays":0, "checkOut":false, "itemizedOrders":[]}';

// Thunks
export const fetchCart = () => {
  return async dispatch => {
    const token = window.localStorage.getItem('token');
    try {
      let cart;
      if(!token) {
        let localCart = window.localStorage.getItem("cart") || defaultCart;
        cart = JSON.parse(localCart);
      } else {
        const { data } = await axios.get('/api/cart',{
          headers: {
            authorization: token
          }
        });
        cart = data;
      }
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
    const token = window.localStorage.getItem('token');
    if(!token){
      let cart = JSON.parse(window.localStorage.getItem("cart") || defaultCart);
      let filteredItemizedOrders = cart.itemizedOrders.filter(product => {
        if(product.superheroId !== item.superheroId) {
          return true;
        }
        else {
          cart.totalDays -= product.days;
          return false;
        }
      });
      cart.itemizedOrders = filteredItemizedOrders;
      window.localStorage.setItem("cart",  JSON.stringify(cart));
    }
    else {
      await axios.delete('/api/cart', {
        headers: {
          authorization: token
        },
        data: item
      });
    }
    dispatch(deleteCartItem(item.superheroId));
  };
};
export const addToCart = (item) => {
  console.log("Adding to cart!!");

  return async dispatch => {
    const token = window.localStorage.getItem('token');
    if (!token) {
        const {data: superhero} = await axios.get(`/api/superheroes/${item.superheroId}`);
        const days = parseInt(item.days)
        item.subtotal = superhero.cost * days
        item.days = days

        let localCart = window.localStorage.getItem("cart") || defaultCart;
        localCart = JSON.parse(localCart);
        localCart.itemizedOrders.push(item);
        localCart.totalDays += days;

        localCart = JSON.stringify(localCart);
        window.localStorage.setItem("cart",  localCart);

        dispatch(addCartItem(item));
    }
    else {
      const { data: newCartItem } = await axios.post("/api/cart", {data: item}, {
        headers: {
          authorization: token
        }
      });
      dispatch(addCartItem(newCartItem));
    }
  }
};
export const editCartItem = (item) => {
  return async dispatch => {
    const token = window.localStorage.getItem('token');

    let updatedItem;
    if(!token){
      const {data: superhero} = await axios.get(`/api/superheroes/${item.superheroId}`);
      const days = parseInt(item.days)
      let cart = JSON.parse(window.localStorage.getItem("cart") || defaultCart);
      for(let i = 0; i < cart.itemizedOrders.length; i ++){
        let itemizedOrder = cart.itemizedOrders[i];
        if(itemizedOrder.superheroId === item.superheroId){
          cart.totalDays += (item.days - itemizedOrder.days);
          itemizedOrder.days = item.days;
          itemizedOrder.subtotal = superhero.cost * days;
          updatedItem = itemizedOrder;
          cart.itemizedOrders[i] = itemizedOrder
          break;
        }
      }
      window.localStorage.setItem("cart",  JSON.stringify(cart));
    }
    else {
      const { data } = await axios.patch("/api/cart", {data: item}, {
        headers: {
          authorization: token
        }
      });
      updatedItem = data;
    }
    
    dispatch(updateCartItem(updatedItem));
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
      case ADD_CART_ITEM:
        return {
          ...state,
          cart: {
            ...state.cart,
          },
          loading: false,
          superheroes: {...state.superheroes}
        };
      case UPDATE_CART_ITEM:
        return {
          ...state,
          cart: {
            ...state.cart,
          itemizedOrders: state.cart.itemizedOrders.map(item =>
            item.superheroId === action.item.superheroId ? action.item : item
          )
          }, 
          loading: false};
      default:
        return state;
    }
  };
  