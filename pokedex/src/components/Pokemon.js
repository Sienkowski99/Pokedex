import { Card } from "@material-ui/core";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import loadingGIF from "../images/loading.gif";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Pikachu_64 from "../images/Pikachu_64.png";
import { connect } from "react-redux";
import operations from "../operations/index";

const Pokemon = (props) => {
  const [pokemon, setPokemon] = useState({});
  const [typesAndColors, setTypesAndColors] = useState({
    Colorless: { primary: "#D6D3D5", secondary: "#C6BCB5" },
    Darkness: { primary: "#24464D", secondary: "#052339" },
    Dragon: { primary: "#6E6C37", secondary: "#483C2D" },
    Fairy: { primary: "pink", secondary: "violet" },
    Fighting: { primary: "#E7B56F", secondary: "#B05E34" },
    Fire: { primary: "#EA6935", secondary: "#DB2B10" },
    Grass: { primary: "#98C84E", secondary: "#39A144" },
    Lightning: { primary: "#F7DB4B", secondary: "#D3B503" },
    Metal: { primary: "#B8BCCC", secondary: "#707787" },
    Psychic: { primary: "#8D519C", secondary: "#593465" },
    Water: { primary: "#0093CB", secondary: "#0373B2" },
  });

  useEffect(() => {
    axios
      .get(`https://api.pokemontcg.io/v2/cards/${props.match.params.id}`, {
        headers: { "X-Api-Key": "371659a7-f1bd-4b5e-a6d3-618574d90323" },
      })
      .then((resp) => {
        console.log(resp.data.data);
        return resp.data.data;
      })
      .then((pokemon) => {
        setPokemon(pokemon);
      })
      .catch((err) => {
        alert("Cannot fetch data from API!");
        console.log(err);
      });
  }, []);

  return (
    <div
      className="main-background"
      style={{ maxHeight: "none", overflowY: "hidden" }}
    >
      <Navbar />
      {!pokemon.id ? (
        <img
          src={loadingGIF}
          style={{ width: "50px", height: "50px", margin: "auto" }}
        />
      ) : (
        <Card
          className="pokemonCard-spacing"
          style={{
            border: `solid ${typesAndColors[pokemon.types[0]].primary} 20px`,
            backgroundColor: `${typesAndColors[pokemon.types[0]].secondary}`,
            padding: "20px",
            marginTop: "80px",
          }}
        >
          <div
            className="pokemonDetailedCard"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              display: "flex",
              padding: "30px",
              gap: "50px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "270px",
                paddingLeft: "5px",
              }}
            >
              <Typography variant="h3">{pokemon.name}</Typography>

              <Typography variant="overline">
                {pokemon.types.length > 1 ? "Types" : "Type"}:{" "}
                {pokemon.types.reduce((acc, curr) => {
                  if (acc === "") {
                    return `${curr}`;
                  } else {
                    return `${acc}, ${curr}`;
                  }
                }, "")}
              </Typography>

              <Typography variant="overline">
                {pokemon.subtypes.length > 1 ? "Subtypes" : "Subtype"}:{" "}
                {pokemon.subtypes.reduce((acc, curr) => {
                  if (acc === "") {
                    return `${curr}`;
                  } else {
                    return `${acc}, ${curr}`;
                  }
                }, "")}
              </Typography>

              <Typography variant="overline">
                {pokemon.evolvesFrom
                  ? `Evolves from: ${
                      typeof pokemon.evolvesFrom == Array
                        ? pokemon.evolvesFrom[0]
                        : pokemon.evolvesFrom
                    }`
                  : null}
              </Typography>

              <Typography variant="overline">
                {pokemon.evolvesTo
                  ? `Evolves to: ${
                      typeof pokemon.evolvesTo == Array
                        ? pokemon.evolvesTo[0]
                        : pokemon.evolvesTo
                    }`
                  : null}
              </Typography>

              <br />
              <Typography variant="overline">
                {pokemon.rarity ? `Rarity: ${pokemon.rarity}` : null}
              </Typography>

              <Typography variant="overline">
                {pokemon.weaknesses
                  ? `Weaknesses: ${pokemon.weaknesses.reduce((acc, curr) => {
                      if (acc === "") {
                        return `${curr.type}`;
                      } else {
                        return `${acc}, ${curr.type}`;
                      }
                    }, "")}`
                  : null}
              </Typography>

              <Typography variant="overline">
                {pokemon.hp ? `Heatlh Points: ${pokemon.hp}` : null}
              </Typography>

              <Typography variant="overline">
                {pokemon.attacks
                  ? `Atacks: ${pokemon.attacks.reduce((acc, curr) => {
                      if (acc === "") {
                        return `${curr.name}`;
                      } else {
                        return `${acc}, ${curr.name}`;
                      }
                    }, "")}`
                  : null}
              </Typography>

              <div
                style={{
                  display: "flex",
                  marginTop: "60px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "50%",
                  justifySelf: "flex-end",
                }}
              >
                <Typography variant="overline">Favorite</Typography>
                {props.favorites.includes(pokemon.id) ? (
                  <img
                    src={Pikachu_64}
                    style={{ width: "40px", marginBottom: "5px" }}
                    onClick={() => props.removePokemonFromFavorites(pokemon.id)}
                  />
                ) : (
                  <img
                    src={Pikachu_64}
                    style={{
                      width: "40px",
                      filter: "grayscale(100%)",
                      marginBottom: "5px",
                    }}
                    onClick={() => props.addPokemonToFavorites(pokemon.id)}
                  />
                )}
              </div>
            </div>

            <img
              src={pokemon.images.large}
              style={{
                maxHeight: "500px",
              }}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    favorites: state.favorites,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPokemonToFavorites: (pokemon_id) =>
      dispatch(operations.addPokemonToFavorites(pokemon_id)),
    removePokemonFromFavorites: (pokemon_id) =>
      dispatch(operations.removePokemonFromFavorites(pokemon_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);
