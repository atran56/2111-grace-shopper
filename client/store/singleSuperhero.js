import axios from "axios";

// Action Types
const SET_SUPERHERO = "SET_SUPERHERO";

// Action Creators
const _fetchSuperhero = superhero => ({
  type: SET_SUPERHERO,
  superhero,
});

// Thunks
export const fetchSuperhero = id => {
  return async dispatch => {
    const { data: superhero } = await axios.get(`/api/superheroes/${id}`);
    dispatch(_fetchSuperhero(superhero));
  };
};

// Subreducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_SUPERHERO:
      return action.superhero;
    default:
      return state;
  }
};
