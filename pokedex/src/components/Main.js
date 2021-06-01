import PokemonCardBaisc from "./PokemonCardBasic";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import operations from "../operations/index";
import loadingGIF from "../images/loading.gif";
import NavbarSearch from "../components/NavbarSearch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PageSelector from "./PageSelector";
import Typography from "@material-ui/core/Typography";

const Main = (props) => {
  const [pages, setPages] = useState([]);
  const [elementsOnPage, setElementsOnPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemons, setPokemons] = useState(props.pokemons);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchedPokemonType, setSearchedPokemonType] = useState("Any");

  useEffect(() => {
    //APPLY FILTERS TO POKEMON DATA
    let filteredPokemons = props.pokemons.filter((pokemon) => {
      if (
        pokemon.name.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        // pokemon.supertype.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        pokemon.subtypes.reduce((acc, curr) => {
          return acc || curr.toLowerCase().includes(searchPhrase.toLowerCase());
        }, false) ||
        pokemon.types.reduce((acc, curr) => {
          return acc || curr.toLowerCase().includes(searchPhrase.toLowerCase());
        }, false) ||
        ("favorite".includes(searchPhrase.toLowerCase()) &&
          props.favorites.includes(pokemon.id))
      ) {
        return true;
      } else {
        return false;
      }
    });
    if (searchedPokemonType !== "Any") {
      filteredPokemons = filteredPokemons.filter((pokemon) => {
        return pokemon.types.includes(searchedPokemonType);
      });
    }
    setPokemons(filteredPokemons);
    setCurrentPage(1);
  }, [searchPhrase, searchedPokemonType]);

  useEffect(() => {
    //UPDATE POKEMONS IN THIS COMPONENT IN CASE NOT TO MODIFY STORE WHEN FILTERED
    setPokemons(props.pokemons);
  }, [props.pokemons]);

  useEffect(() => {
    //SWITCH TO 1st PAGE EVERY TIME USER CHANGES NUMBER OF ELEMENTS TO DISPLAY
    setCurrentPage(1);
  }, [elementsOnPage]);

  useEffect(() => {
    //CALCULATE NUMBER OF PAGES 
    const numberOfPages = Math.ceil(pokemons.length / elementsOnPage);
    const newPages = [];
    for (let i = 1; i <= numberOfPages; i++) {
      newPages.push(i);
    }
    setPages(newPages);
  }, [pokemons, elementsOnPage]);

  return (
    <div className="main-background" style={{ justifyContent: "start" }}>
      <NavbarSearch setSearchPhrase={setSearchPhrase} />
      {props.pokemons.length === 0 ? (
        <img
          src={loadingGIF}
          style={{ width: "50px", height: "50px", margin: "auto" }}
        />
      ) : (
        <div
          className="filter-bar"
          style={{
            display: "flex",
            marginTop: "80px",
            width: "78%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          {/* ADD TYPE SELECTION (FILTER) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="overline"
              noWrap
              style={{ margin: "0", marginRight: "10px" }}
            >
              Filter by pokemon type
            </Typography>
            <Select
              value={searchedPokemonType}
              onChange={(e, v) => {
                console.log(v.props.value);
                setSearchedPokemonType(v.props.value);
              }}
              style={{ padding: "0" }}
            >
              <MenuItem value={"Any"}>
                <Typography variant="overline">Any</Typography>
              </MenuItem>
              {props.types.map((type) => {
                return (
                  <MenuItem key={type} value={type}>
                    <Typography variant="overline">{type}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </div>

          {/* ADD AMOUNT OF ELEMENTS SELECTION */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="overline"
              noWrap
              style={{ margin: "0", marginRight: "10px" }}
            >
              Number of cards on page
            </Typography>
            <Select
              value={elementsOnPage}
              onChange={(e, v) => {
                console.log(v.props.value);
                setElementsOnPage(v.props.value);
              }}
            >
              <MenuItem value={20}>
                <Typography variant="overline">20</Typography>
              </MenuItem>
              <MenuItem value={40}>
                <Typography variant="overline">40</Typography>
              </MenuItem>
              <MenuItem value={60}>
                <Typography variant="overline">60</Typography>
              </MenuItem>
            </Select>
          </div>
        </div>
      )}

      {/* DISPLAY POKEMON CARDS */}
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {pokemons
          .slice(
            (currentPage - 1) * elementsOnPage,
            elementsOnPage * currentPage
          )
          .map((pokemon) => (
            <PokemonCardBaisc key={pokemon.id} pokemon={pokemon} />
          ))}
      </div>

      {/* ADD PAGINATION */}
      {props.pokemons.length === 0 ? null : (
        <div
          style={{
            margin: "15px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PageSelector
            page={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
          />
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons,
    types: state.types,
    favorites: state.favorites,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPokemonCards: () => dispatch(operations.fetchPokemonCards()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
