import { Card } from "@material-ui/core";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import loadingGIF from '../images/loading.gif'
import axios from 'axios'
import Typography from "@material-ui/core/Typography";

const Pokemon = (props) => {

    const [pokemon, setPokemon] = useState({})
    const [typesAndColors, setTypesAndColors] = useState({
      "Colorless": {primary: "#D6D3D5", secondary: "#C6BCB5"},
      "Darkness": {primary: "#24464D", secondary: "#052339"},
      "Dragon": {primary: "#6E6C37", secondary: "#483C2D"},
      "Fairy": {primary: "pink", secondary: "violet"},
      "Fighting": {primary: "#E7B56F", secondary: "#B05E34"},
      "Fire": {primary: "#EA6935", secondary: "#DB2B10"},
      "Grass": {primary: "#98C84E", secondary: "#39A144"},
      "Lightning": {primary: "#F7DB4B", secondary: "#D3B503"},
      "Metal": {primary: "#B8BCCC", secondary: "#707787"},
      "Psychic": {primary: "#8D519C", secondary: "#593465"},
      "Water": {primary: "#0093CB", secondary: "#0373B2"}
    })
    
    useEffect(()=>{
      axios
        .get(`https://api.pokemontcg.io/v2/cards/${props.match.params.id}`, {headers: {'X-Api-Key': "371659a7-f1bd-4b5e-a6d3-618574d90323"}})
        .then((resp) => {
          console.log(resp.data.data);
          return resp.data.data;
        })
        .then((pokemon) => {
          setPokemon(pokemon);
        })
        .catch((err) => {alert("Cannot fetch data from API!"); console.log(err);});
    }, [])

    return(
        <div
        className="main-background"
      style={{

        // width: "100vw",
        // height: "100vh",
        // // backgroundColor: "green",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        // flexGrow: 1,
      }}
    >
      <Navbar/>
        {!pokemon.id ? <img src={loadingGIF} style={{width: "50px", height: "50px", margin: "auto"}}/> :
        <Card style={{
          width: "70%", backgroundColor: `${typesAndColors[pokemon.types[0].primary]}`,
          minHeight: "70vh",
          // maxHeight: "80vh",
          marginTop: "80px",
          // padding: "10px",
          border: `solid ${typesAndColors[pokemon.types[0]].primary} 20px`,
          display: "flex",
        }}>

          <div style={{
            backgroundColor: `${typesAndColors[pokemon.types[0]].secondary}`,
            borderRadius: "1px",
            padding: "20px",
            display: "flex",
            flex: 1
          }}>
            <div style={{
              // width: "100%",
              // height: "100%",
              padding: "20px",
              backgroundColor: "white",
              flex: 1,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              // height: "94%"  
            }}> 
              <div>
                <Typography variant="h4">
                  Name: {pokemon.name}
                </Typography>
                <Typography variant="overline">
                  {pokemon.types.length > 1 ? 'Types' : 'Type'}: {pokemon.types.reduce((acc, curr) => {if(acc===""){return `${curr}`} else {return `${acc}, ${curr}`}}, "")}
                  <br/>
                  {pokemon.evolvesTo ? `Evolves to: ${typeof pokemon.evolvesTo == Array ? pokemon.evolvesTo[0] : pokemon.evolvesTo}` : null}
                  {pokemon.evolvesFrom ? `Evolves from: ${typeof pokemon.evolvesFrom == Array ? pokemon.evolvesFrom[0] : pokemon.evolvesFrom}`: null}
                  
                </Typography>
              </div>
              <img src={pokemon.images.large} style={{width: "30%"}}/>
            </div>
          </div>

        </Card>
        }
        
    </div>
    )
}
export default Pokemon;