import Storm_128 from '../images/Storm_128.png'

const NotFound = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        // backgroundColor: "green",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
        <img src={Storm_128}/>
        <h3 style={{ margin: "50px 0", color: "#33363A" }}>404 Page not found</h3>
    </div>
  );
};
export default NotFound;
