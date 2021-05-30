import PokemonCardBaisc from "./PokemonCardBasic";
import axios from "axios"
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import operations from '../operations/index';
import { setPokemonCards } from "../actions";
import loadingGIF from '../images/loading.gif'
import NavbarSearch from '../components/NavbarSearch'
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PageSelector from "./PageSelector";
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';

const Main = (props) => {

  const [pages, setPages] = useState([])
  const [elementsOnPage, setElementsOnPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemons, setPokemons] = useState(props.pokemons)
  const [searchPhrase, setSearchPhrase] = useState("")
  const [searchedPokemonType, setSearchedPokemonType] = useState("Any")

  useEffect(()=>{
    let filteredPokemons = props.pokemons.filter(pokemon => {
      if (
        pokemon.name.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        // pokemon.supertype.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        pokemon.subtypes.reduce((acc, curr) => {return acc || curr.toLowerCase().includes(searchPhrase.toLowerCase())}, false) ||
        pokemon.types.reduce((acc, curr) => {return acc || curr.toLowerCase().includes(searchPhrase.toLowerCase())}, false)
      ) {
        return true
      } else {
        return false
      }
    })
    if (searchedPokemonType !== "Any") {
      filteredPokemons = filteredPokemons.filter(pokemon => {
        return pokemon.types.includes(searchedPokemonType)
      })
    }
    setPokemons(filteredPokemons)
    setCurrentPage(1)
  }, [searchPhrase, searchedPokemonType])

  useEffect(()=>{
    setPokemons(props.pokemons)
  }, [props.pokemons])

  useEffect(()=>{
    setCurrentPage(1)
  }, [elementsOnPage])

  useEffect(()=>{
    const numberOfPages = Math.ceil(pokemons.length/elementsOnPage)
    const newPages = []
    for(let i=1; i<=numberOfPages; i++) {
      newPages.push(i)
    }
    setPages(newPages)
  }, [pokemons, elementsOnPage])

  return (
    <div className="main-background" style={{justifyContent: "start"}}>


      <NavbarSearch setSearchPhrase={setSearchPhrase}/>
      {props.pokemons.length === 0 ? <img src={loadingGIF} style={{width: "50px", height: "50px", margin: "auto"}}/> :
      <div className="filter-bar" style={{
        display: "flex",
        marginTop: "80px",
        // backgroundColor: "red",
        width: "78%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // textAlign: "center"
        // width: "30%"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center"
        }}>
          <Typography variant='overline' noWrap style={{margin: "0", marginRight: "10px"}}>Filter by pokemon type</Typography>
          <Select
            value={searchedPokemonType}
            onChange={(e, v)=>{console.log(v.props.value);setSearchedPokemonType(v.props.value)}}
            style={{padding: "0"}}
          >
            <MenuItem value={"Any"}><Typography variant='overline'>Any</Typography></MenuItem>
            {props.types.map(type=> {
              return <MenuItem key={type} value={type}><Typography variant='overline'>{type}</Typography></MenuItem>
            })}
          </Select>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center"
        }}>
          <Typography variant='overline' noWrap style={{margin: "0", marginRight: "10px"}}>Number of cards on page</Typography>
          {/* <p style={{
            margin: "0",
            marginRight: "10px"
          }}>
            Number of cards on page</p> */}
          {/* <select onChange={(e)=>{console.log(e.target.value); setElementsOnPage(e.target.value)}}
           style={{background: "none", border: "none"}}>
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
            <MenuItem value={20}><Typography variant='overline'>20</Typography></MenuItem>
            <MenuItem value={40}><Typography variant='overline'>40</Typography></MenuItem>
            <MenuItem value={60}><Typography variant='overline'>60</Typography></MenuItem>
          </Select>
        </div>
      </div> }

      <div style={{
        width: "80%",
        // height: "80%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        // flexFlow: "row wrap",
        justifyContent: "space-around",
        // overflowY: "clip"
        // backgroundColor: "yellow"
      }}>
        {pokemons.slice((currentPage-1)*elementsOnPage, elementsOnPage*currentPage).map((pokemon) => (
          <PokemonCardBaisc key={pokemon.id} pokemon={pokemon}/>
        ))}
      </div>






      {/* <div style={{display: "flex"}}>
        {pages.map(pageNum => 
          pageNum == currentPage ? <button onClick={()=>{console.log(pageNum);setCurrentPage(pageNum)}} style={{backgroundColor: "gray"}}>{pageNum}</button> :
          <button onClick={()=>{console.log(pageNum);setCurrentPage(pageNum)}}>{pageNum}</button>
        )}
      </div> */}


      {props.pokemons.length === 0 ? null :
      <div style={{
        margin: "15px 0",
        // position: "sticky", bottom: "0", width: "100%", backgroundColor: "lightgray", borderTop: "solid gray 2px",
        display: "flex", justifyContent:  "center",
        // backgroundColor: "#707070"
        }}>
          <PageSelector page={currentPage} setCurrentPage={setCurrentPage} pages={pages}/>
        {/* <Pagination count={pages.length} shape="rounded" size="large" onChange={(e, v)=>{console.log(v);setCurrentPage(v)}}/> */}
      </div>
      }


    </div>
  );
};

function mapStateToProps(state) {
  return {
      pokemons: state.pokemons,
      types: state.types
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPokemonCards: () => dispatch(operations.fetchPokemonCards())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
// export default Main;
