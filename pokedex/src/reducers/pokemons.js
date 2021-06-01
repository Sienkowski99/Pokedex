const initialState = [];

const pokemonsReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case "SET_POKEMON_CARDS":
      return [...action.payload];
    default:
      return state;
  }
};
export default pokemonsReducer;
