import axios from "axios";
//TYPES
const GET_ORDER = "GET_ORDER";
const COMPLETE_ORDER = "COMPLETE_ORDER"

//ACTIONS
const _gotOrder = (order) => {
  return {
    type: GET_ORDER,
    order
  };
};

const _completedOrder = (order) => {
    return {
      type: COMPLETE_ORDER,
      order
    };
  };

//THUNKS
export const fetchOrder = (id) => {
  return async (dispatch) => {
      try {
    const data = await axios.get(`/api/orders/${id}`);
    dispatch(_gotOrder(data));
      } catch (err) {
        console.log("FETCHORDER THUNK ERROR: ", err);
      }
  };
};

export const completeOrder = (order, history) => {
    return async (dispatch) => {
      const { data } = await axios.patch("/api/orders", order);
      history.push("/confirmation")
      dispatch(_completedOrder(data));
    };
  };

//REDUCER
export default function order(state = {}, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case COMPLETE_ORDER:
        return action.order
    default:
      return state;
  }
}
