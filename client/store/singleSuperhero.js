import axios from "axios";

// Action Types
const SET_SUPERHERO = "SET_SUPERHERO";

// Action Creators
export const _setSuperhero = superhero => ({
  type: SET_SUPERHERO,
  superhero,
});

// Thunks
export const fetchSuperhero = id => {
  return async dispatch => {
    const { data: superhero } = await axios.get(`/api/superheroes/${id}`);
    dispatch(_setSuperhero(superhero));
  };
};

const initialState = {
  loading: true,
  superhero: {}
}
// Subreducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUPERHERO:
      return {loading: false, superhero: action.superhero}
    default:
      return state;
  }
};
