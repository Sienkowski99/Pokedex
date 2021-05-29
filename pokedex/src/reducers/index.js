import {combineReducers} from "redux"
import pokemonsReducer from './pokemons'
import favoritesReducer from './favorites'

const rootReducer = combineReducers({
    pokemons: pokemonsReducer,
    favorites: favoritesReducer
});

export default rootReducer;