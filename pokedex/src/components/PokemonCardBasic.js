import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Pikachu_64 from '../images/Pikachu_64.png'

const PokemonCardBaisc = (props) => {
  return (
    // <Link to={{pathname: `/pokemon/${props.pokemon.id}`}} style={{textDecoration: "none", color: "black"}}>
    <Card style={{ 
        width: "200px", 
        height: "400px", 
        margin: "5px",
        textAlign: "center",
    }}>
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

      <CardActions style={{display: "flex", justifyContent: "space-between"}}>
        {/* <Link to={{pathname: `/pokemon/${props.pokemon.id}`}}><Button size="small" style={{backgroundColor: "blue"}}>Learn More</Button></Link> */}
        {/* {!props.favorites.includes(props.pokemon.id) ?
        <p style={{margin: "0"}}>Add to favorites</p> :
        <p style={{margin: "0"}}>Remove from favorites</p> 
        } */}
        <p style={{margin: "0"}}>Favortie</p> 
        {props.favorites.includes(props.pokemon.id) ? 
        <img src={Pikachu_64} style={{width: "40px"}} onClick={()=>{props.setFav([...props.favorites.filter(pokemon_id => pokemon_id !== props.pokemon.id)])}}/> :
        <img src={Pikachu_64} style={{width: "40px", filter: "grayscale(100%)"}} onClick={()=>{props.setFav([...props.favorites, props.pokemon.id])}}/>
        }
      </CardActions>
    </Card>
    // </Link>
  );
};
export default PokemonCardBaisc;
