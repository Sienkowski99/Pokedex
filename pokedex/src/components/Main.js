import PokemonCardBaisc from "./PokemonCardBasic";
import axios from "axios"
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import operations from '../operations/index';

const Main = (props) => {
  // const [pokemonsFav, setPokemonsFav] = useState([])
  // const [pokemons, setPokemons] = useState([])
  // useEffect(()=>{
  //     axios.get("https://api.pokemontcg.io/v2/cards").then(resp => {
  //         console.log(resp.data.data)
  //         console.log("ZAPYTANIE ODPOWIEDZ");
  //         return resp.data.data
  //     }).then(poke_data => setPokemons(poke_data))
  //     .catch(err => alert(err))
  // }, [])


  return (
    <div
      style={{
        // width: "100vw",
        minHeight: "100vh",
        backgroundColor: "lightgray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        // marginTop: "130px"
      }}
    >
      <h3 style={{ margin: "50px 0", color: "#33363A" }}>Main</h3>
      <div style={{
        width: "80%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        // flexFlow: "row wrap",
        justifyContent: "space-around",
        // backgroundColor: "yellow"
      }}>
        {props.pokemons.slice(0, 40).map((pokemon) => (
          <PokemonCardBaisc pokemon={pokemon}/>
        ))}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
      pokemons: state.pokemons,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPokemonCards: () => dispatch(operations.fetchPokemonCards())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
// export default Main;
