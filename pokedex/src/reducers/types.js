const initialState = [];

const typesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TYPES":
      return [...action.payload];
    default:
      return state;
  }
};
export default typesReducer;
