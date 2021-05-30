import PokemonCardBaisc from "./PokemonCardBasic";
import axios from "axios"
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import operations from '../operations/index';
import { setPokemonCards } from "../actions";
import loadingGIF from '../images/loading.gif'
import Navbar from '../components/Navbar'
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
  const [pages, setPages] = useState([])
  const [elementsOnPage, setElementsOnPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(()=>{
    setCurrentPage(1)
  }, [elementsOnPage])

  useEffect(()=>{
    const numberOfPages = Math.ceil(props.pokemons.length/elementsOnPage)
    const newPages = []
    for(let i=1; i<=numberOfPages; i++) {
      newPages.push(i)
    }
    setPages(newPages)
  }, [props.pokemons, elementsOnPage])

  return (
    <div
    className="main-background"
      style={{
        // width: "100vw",
        // minHeight: "100vh",
        // backgroundColor: "lightgray",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        // flexGrow: 1,
        // paddingTop: "70px",
        // height: "fit-content"
        // marginTop: "100px"
      }}
    >


      <Navbar/>
      {props.pokemons.length === 0 ? <img src={loadingGIF} style={{width: "50px", height: "50px"}}/> : null}
      {props.pokemons.length === 0 ? null :
      <div style={{
        display: "flex",
        marginTop: "80px",
        // backgroundColor: "red",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // width: "30%"
      }}>
        <p style={{
          margin: "0",
          marginRight: "10px"
        }}>
          Number of cards on page</p>
        {/* <select onChange={(e)=>{console.log(e.target.value); setElementsOnPage(e.target.value)}}>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="60">60</option>
        </select> */}
        <Select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          value={elementsOnPage}
          onChange={(e, v)=>{console.log(v.props.value);setElementsOnPage(v.props.value)}}
        >
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={60}>60</MenuItem>
        </Select>
      </div> }

      <div style={{
        width: "80%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        // flexFlow: "row wrap",
        justifyContent: "space-around",
        // backgroundColor: "yellow"
      }}>
        {props.pokemons.slice((currentPage-1)*elementsOnPage, elementsOnPage*currentPage).map((pokemon) => (
          <PokemonCardBaisc pokemon={pokemon}/>
        ))}
      </div>






      {/* <div style={{display: "flex"}}>
        {pages.map(pageNum => 
          pageNum == currentPage ? <button onClick={()=>{console.log(pageNum);setCurrentPage(pageNum)}} style={{backgroundColor: "gray"}}>{pageNum}</button> :
          <button onClick={()=>{console.log(pageNum);setCurrentPage(pageNum)}}>{pageNum}</button>
        )}
      </div> */}


      
      <div style={{
        margin: "15px 0",
        // position: "sticky", bottom: "0", width: "100%", backgroundColor: "lightgray", borderTop: "solid gray 2px",
        display: "flex", justifyContent:  "center",
        // backgroundColor: "#707070"
        }}>
        <Pagination count={pages.length} shape="rounded" size="large" onChange={(e, v)=>{console.log(v);setCurrentPage(v)}}/>
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
