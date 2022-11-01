import {PlaceComponent} from "./PlaceComponent"
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
export const Home = function() {
    return (<div>
        {/* <div><Link to='/registration'>Registration</Link> </div> 
      
        <div><Link to='/login'>Login</Link> </div>  */}
        <ul style = {{display:'block'}}>
                <li style = {{display:'inline-block'}}>

                {
                    info.map((infoIndex)=>(
                        <PlaceComponent 
                        name={infoIndex.name} 
                        photo={infoIndex.photo} 
                        description={infoIndex.description} 
                        raiting={infoIndex.raiting} 
                        locationCountry={infoIndex.country}
                        locationCity={infoIndex.city}
                        authorized = {false}/>
                    ))
                }
                    
                </li>
            </ul>
      </div>);
}