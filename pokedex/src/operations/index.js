import axios from "axios";
import { setPokemonCards, addToFavorites, removeFromFavorites } from "../actions/index";

const fetchPokemonCards = () => async (dispatch) => {
  axios
    .get("https://api.pokemontcg.io/v2/cards", {userName: ""})
    .then((resp) => {
      return resp.data.data;
    })
    .then((poke_data) => {
      dispatch(setPokemonCards(poke_data));
    })
    .catch((err) => alert(err));
};

const addPokemonToFavorites = (pokemon_id) => async (dispatch) => {
  dispatch(addToFavorites(pokemon_id));
}

const removePokemonFromFavorites = (pokemon_id) => async (dispatch) => {
  dispatch(removeFromFavorites(pokemon_id));
}

const operations = {
  fetchPokemonCards,
  addPokemonToFavorites,
  removePokemonFromFavorites,
};

export default operations;
