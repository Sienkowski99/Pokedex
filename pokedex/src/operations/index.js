import axios from "axios";
const api_key = "371659a7-f1bd-4b5e-a6d3-618574d90323"
import {
  setPokemonCards,
  addToFavorites,
  removeFromFavorites,
  setTypes,
} from "../actions/index";

const fetchPokemonCards = () => async (dispatch) => {
  axios
    .get("https://api.pokemontcg.io/v2/cards", {
      headers: { "X-Api-Key":  api_key},
    })
    .then((resp) => {
      console.log(resp.data.data);
      return resp.data.data;
    })
    .then((poke_data) => {
      dispatch(setPokemonCards(poke_data));
    })
    .catch((err) => {
      alert("Cannot fetch data from API!");
      console.log(err);
    });
  // AND THEIR TYPES AS WELL
  axios
    .get("https://api.pokemontcg.io/v2/types", {
      headers: { "X-Api-Key": api_key },
    })
    .then((resp) => {
      console.log(resp.data.data);
      return resp.data.data;
    })
    .then((type_data) => {
      dispatch(setTypes(type_data));
    })
    .catch((err) => {
      alert("Cannot fetch data from API!");
      console.log(err);
    });
};

const addPokemonToFavorites = (pokemon_id) => async (dispatch) => {
  dispatch(addToFavorites(pokemon_id));
};

const removePokemonFromFavorites = (pokemon_id) => async (dispatch) => {
  dispatch(removeFromFavorites(pokemon_id));
};

const operations = {
  fetchPokemonCards,
  addPokemonToFavorites,
  removePokemonFromFavorites,
};

export default operations;
