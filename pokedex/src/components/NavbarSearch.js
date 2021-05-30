import Pokeball_64 from '../images/Pokeball_64.png'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import { Link } from  'react-router-dom';

const NavbarSearch = (props) => {
    return (
        <AppBar style={{
            backgroundColor: "#C32028",
            // backgroundColor: "#964a4e",
            height: "70px",
            position: "fixed"
        }}>
            <Toolbar style={{
                // backgroundColor: "#C32028",
                height: "100%",
                width: "79%",
                alignSelf: "center",
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Link to="/" style={{
                    textDecoration: "none",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <img src={Pokeball_64} style={{widht: "40px", height: "40px"}}/>
                    <Typography variant="h4" noWrap style={{margin: "0 10px"}}>Pokédex</Typography>
                </Link>
                
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <InputBase placeholder="Search…" style={{color: "white", borderBottom: "solid #DB7B80 2px", margin: "0 10px"}}
                    onChange={(e)=>{console.log(e.target.value);props.setSearchPhrase(e.target.value)}}/>
                    <SearchIcon/>
                     {/* style={{margin: "0 10px"}}/> */}
                </div>
            </Toolbar>
        </AppBar>
    )
}
export default NavbarSearch;