import axios from "axios";
import { setPokemonCards, addToFavorites, removeFromFavorites, setTypes } from "../actions/index";

const fetchPokemonCards = () => async (dispatch) => {
  axios
    .get("https://api.pokemontcg.io/v2/cards", {userName: ""})
    .then((resp) => {
      console.log(resp.data.data);
      return resp.data.data;
    })
    .then((poke_data) => {
      dispatch(setPokemonCards(poke_data));
    })
    .catch((err) => {alert("Cannot fetch data from API!"); console.log(err);});
  // AND THEIR TYPES AS WELL
  axios
    .get("https://api.pokemontcg.io/v2/types", {userName: ""})
    .then((resp) => {
      console.log(resp.data.data);
      return resp.data.data;
    })
    .then((type_data) => {
      dispatch(setTypes(type_data));
    })
    .catch((err) => {alert("Cannot fetch data from API!"); console.log(err);});
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
