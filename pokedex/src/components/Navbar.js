import Pokeball_64 from '../images/Pokeball_64.png'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from  'react-router-dom';

const Navbar = () => {
    return (
        <AppBar style={{
            backgroundColor: "#CD232C",
            height: "70px",
            position: "fixed"
        }}>
            <Toolbar style={{
                height: "100%",
                width: "78%",
                alignSelf: "center",
                display: "flex",
                justifyContent: "start",
            }}>
                <Link to="/" style={{
                    textDecoration: "none",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <img alt="pokeball" src={Pokeball_64} style={{widht: "40px", height: "40px"}}/>
                    <Typography variant="h4" noWrap style={{margin: "0 10px"}}>Pokédex</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}
export default Navbar;