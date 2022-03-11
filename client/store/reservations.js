import axios from "axios";

//TYPES
const CREATE_RESERVATION = "CREATE_RESERVATION";


//ACTIONS
const _createReservation = (reservation) => {
  return {
    type: CREATE_RESERVATION,
    reservation
  };
};


//THUNKS
export const createReservation = (cart) => {
  return async (dispatch) => {
    const { data } = await axios.post("/api/reservations", cart);
    dispatch(_createReservation(data));
  };
};

//REDUCER
export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_RESERVATION:
      return action.reservation
    default:
      return state;
  }
}
