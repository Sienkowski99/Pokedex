import Storm_128 from '../images/Storm_128.png'
import Navbar from './Navbar';

const NotFound = () => {
  return (
    <div className="main-background">
      <Navbar/>
        <img src={Storm_128}/>
        <h3 style={{ margin: "50px 0", color: "#33363A" }}>404 Page not found</h3>
    </div>
  );
};
export default NotFound;
