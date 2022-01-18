import axios from "axios";

// Action Type
const GOT_SUPERHEROES = "GOT_SUPERHEROES";
const UPATE_SUPERHERO = "UPATE_SUPERHERO";
const DELETE_SUPERHERO = "DELETE_SUPERHERO";
const ADD_SUPERHERO = "ADD_SUPERHERO";

// Action Creator
const _gotSuperheroes = superheroes => ({
  type: GOT_SUPERHEROES,
  superheroes,
});

const _updateSuperhero = superhero => ({
  type: UPATE_SUPERHERO,
  superhero,
});

const _deleteSuperhero = superhero => ({
  type: DELETE_SUPERHERO,
  superhero,
});

const _addSuperhero = superhero => ({
  type: ADD_SUPERHERO,
  superhero,
});

// Thunks
export const fetchSuperheroes = dispatch => {
  return async dispatch => {
    const { data: superheroes } = await axios.get("/api/superheroes");
    dispatch(_gotSuperheroes(superheroes));
  };
};

export const addSuperhero = (superhero, history) => {
  return async dispatch => {
    const { data: newSuperhero } = await axios.post(
      "/api/superheroes",
      superhero
    );

    dispatch(_addSuperhero(newSuperhero));
    history.push("/");
  };
};

export const updateSuperhero = (superhero, history) => {
  return async dispatch => {
    const { data: updated } = await axios.put(
      `/api/superheroes/${superhero.id}`,
      superhero
    );
    dispatch(_updateSuperhero(updated));
    history.push("/");
  };
};

export const deleteSuperhero = (id, history) => {
  return async dispatch => {
    const { data: superhero } = await axios.delete(`/api/superheroes/${id}`);
    dispatch(_deleteSuperhero(superhero));
    history.push("/superheroes");
  };
};

// Sub-Reducer
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_SUPERHEROES:
      return action.superheroes;

    case UPATE_SUPERHERO:
      return state.map(superhero =>
        superhero.id === action.superhero.id ? action.superhero : superhero
      );
    case DELETE_SUPERHERO:
      return state.filter(superhero => superhero.id !== action.superhero.id);
    case ADD_SUPERHERO:
      return [...state, action.superhero];
    default:
      return state;
  }
};
