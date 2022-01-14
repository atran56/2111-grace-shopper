import axios from "axios";

// Action Type
const GOT_SUPERHEROES = "GOT_SUPERHEROES";

// Action Creator
const gotSuperheroes = superheroes => ({
  type: GOT_SUPERHEROES,
  superheroes,
});

// Thunks
export const fetchSuperheroes = dispatch => {
  return async dispatch => {
    const { data: superheroes } = await axios.get("/api/superheroes");
    dispatch(gotSuperheroes(superheroes));
  };
};

// Sub-Reducer
const initialState = [];

const superheroesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_SUPERHEROES:
      return action.superheroes;
    default:
      return state;
  }
};

export default superheroesReducer;
