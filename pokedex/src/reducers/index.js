import { combineReducers } from "redux";
import pokemonsReducer from "./pokemons";
import favoritesReducer from "./favorites";
import typesReducer from "./types";

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  favorites: favoritesReducer,
  types: typesReducer,
});

export default rootReducer;
