import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Pikachu_64 from '../images/Pikachu_64.png'
import { connect } from 'react-redux';
import operations from '../operations/index';

const PokemonCardBaisc = (props) => {
  return (
    <Card style={{ 
        width: "200px", 
        height: "400px", 
        margin: "5px",
        textAlign: "center",
    }}>
      <Link to={{pathname: `/pokemon/${props.pokemon.id}`}} style={{textDecoration: "none", color: "black"}}>
      <CardContent style={{
        display: "flex", 
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingBottom: "10px"
      }}>
        <h3 style={{margin: "0", marginBottom: "15px"}}>{props.pokemon.name}</h3>
        <img src={props.pokemon.images.small} style={{width: "90%"}}/>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                adjective
                </Typography>
                <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
                </Typography> */}
      </CardContent>
      </Link>

      <CardActions style={{display: "flex", justifyContent: "space-between"}}>
        {/* <Link to={{pathname: `/pokemon/${props.pokemon.id}`}}><Button size="small" style={{backgroundColor: "blue"}}>Learn More</Button></Link> */}
        {/* {!props.favorites.includes(props.pokemon.id) ?
        <p style={{margin: "0"}}>Add to favorites</p> :
        <p style={{margin: "0"}}>Remove from favorites</p> 
        } */}
        <p style={{margin: "0"}}>Favortie</p> 
        {props.favorites.includes(props.pokemon.id) ? 
        <img src={Pikachu_64} style={{width: "40px"}} onClick={()=>props.removePokemonFromFavorites(props.pokemon.id)}/> :
        <img src={Pikachu_64} style={{width: "40px", filter: "grayscale(100%)"}} onClick={()=>props.addPokemonToFavorites(props.pokemon.id)}/>
        }
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
    addPokemonToFavorites: (pokemon_id) => dispatch(operations.addPokemonToFavorites(pokemon_id)),
    removePokemonFromFavorites: (pokemon_id) => dispatch(operations.removePokemonFromFavorites(pokemon_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCardBaisc);
