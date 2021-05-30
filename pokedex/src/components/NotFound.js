import Storm_128 from '../images/Storm_128.png'
import Navbar from './Navbar';

const NotFound = () => {
  return (
    <div
    className="main-background"
      // style={{
      //   width: "100vw",
      //   height: "100vh",
      //   // backgroundColor: "green",
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   flexGrow: 1,
      // }}
    >
      <Navbar/>
        <img src={Storm_128}/>
        <h3 style={{ margin: "50px 0", color: "#33363A" }}>404 Page not found</h3>
    </div>
  );
};
export default NotFound;
