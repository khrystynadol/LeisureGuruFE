
import { Link } from "react-router-dom";
export const Home = function() {
    return (<div>
        <div><Link to='/registration'>Registration</Link> </div> 
      
        <div><Link to='/login'>Login</Link> </div> 
      </div>);
}