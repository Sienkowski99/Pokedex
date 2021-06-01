import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Pikachu_64 from "../images/Pikachu_64.png";
import { connect } from "react-redux";
import operations from "../operations/index";

const PokemonCardBaisc = (props) => {
  return (
    <Card
      style={{
        width: "280px",
        height: "400px",
        margin: "8px 4px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <CardContent style={{ height: "77%" }}>
        <Link
          to={{ pathname: `/pokemon/${props.pokemon.id}` }}
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* POKEMON NAME */}
          <Typography
            variant="overline"
            style={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            {props.pokemon.name}
          </Typography>
          
          {/* POKEMON CARD SMALL */}
          <img
            alt="card"
            src={props.pokemon.images.small}
            style={{
              maxWidth: "80%",
              border: "solid black 1px",
              borderRadius: "10px",
            }}
          />
        </Link>
      </CardContent>

      {/* ADD TO FAVORITES ELEMENT */}
      <CardActions
        style={{
          width: "80%",
          height: "20%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "3%",
        }}
      >
        <Typography variant="overline">Favorite</Typography>
        {props.favorites.includes(props.pokemon.id) ? (
          <img
            alt="pikachu"
            src={Pikachu_64}
            style={{ width: "40px", marginBottom: "5px" }}
            onClick={() => props.removePokemonFromFavorites(props.pokemon.id)}
          />
        ) : (
          <img
            alt="pikachu gray"
            src={Pikachu_64}
            style={{
              width: "40px",
              filter: "grayscale(100%)",
              marginBottom: "5px",
            }}
            onClick={() => props.addPokemonToFavorites(props.pokemon.id)}
          />
        )}
      </CardActions>
    </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCardBaisc);
