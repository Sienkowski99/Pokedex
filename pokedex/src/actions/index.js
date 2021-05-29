export const SET_POKEMON_CARDS = "SET_POKEMON_CARDS"
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES"
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES"

export const setPokemonCards = (cards) => ({
    type: SET_POKEMON_CARDS,
    payload: cards
});

export const addToFavorites = (pokemon_id) => ({
    type: ADD_TO_FAVORITES,
    payload: pokemon_id
});

export const removeFromFavorites = (pokemon_id) => ({
    type: REMOVE_FROM_FAVORITES,
    payload: pokemon_id
});
