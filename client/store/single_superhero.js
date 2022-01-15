import axios from "axios";
//TYPES
const GET_SUPERHERO = "GET_SUPERHERO";
const UPDATE_SUPERHERO = "UPDATE_SUPERHERO";
//ACTIONS
export const getSuperhero = (superhero) => {
  return { type: GET_SUPERHERO, superhero };
};
export const _updateSuperhero = (superhero) => {
  return { type: UPDATE_SUPERHERO, superhero };
};
//THUNKS
export const fetchSuperhero = (id) => {
  return async (dispatch) => {
    console.log("Single in THUNK");
    const { data } = await axios.get(`/api/superheroes/${id}`);
    dispatch(getSuperhero(data));
  };
};

export const updateSuperheros = (superhero, history) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/superheroes/${superhero.id}`,
      superhero
    );
    dispatch(_updateSuperhero(updated));
    // history.push("/");
  };
};
//REDUCER
export default function singleSuperHero(state = {}, action) {
  switch (action.type) {
    case GET_SUPERHERO:
      console.log("HELLO FROM THE REDUCER!!!!");
      return action.campus;
    case UPDATE_SUPERHERO:
      return { ...state, ...action.superhero };

    default:
      return state;
  }
}
