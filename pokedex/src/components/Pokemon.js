import Navbar from "./Navbar";

const Pokemon = (props) => {
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
        <h3 style={{ margin: "50px 0", color: "#33363A" }}>POKEMON {props.match.params.id}</h3>
    </div>
    )
}
export default Pokemon;