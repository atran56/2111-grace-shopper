import axios from "axios";
//TYPES
const CREATE_ORDER = "CREATE_ORDER";


//ACTIONS
const _createdOrder = (order) => {
  return {
    type: CREATE_ORDER,
    order
  };
};


//THUNKS
export const createOrder = (order) => {
  return async (dispatch) => {
    const { data } = await axios.post("/api/orders", order);
    dispatch(_createdOrder(data));
  };
};

//REDUCER
export default function orders(state = [], action) {
  switch (action.type) {
    case CREATE_ORDER:
      return [...state, action.order];
    default:
      return state;
  }
}
