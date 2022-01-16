import axios from "axios";
//TYPES
const GET_SUPERHERO = "GET_SUPERHERO";

//ACTIONS
export const getSuperhero = (superhero) => {
  return { type: GET_SUPERHERO, superhero };
};

//THUNKS
export const fetchSuperhero = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/superheroes/${id}`);
    dispatch(getSuperhero(data));
  };
};

//REDUCER
export default function singleSuperHero(state = {}, action) {
  switch (action.type) {
    case GET_SUPERHERO:
      return action.superhero;
    default:
      return state;
  }
}
