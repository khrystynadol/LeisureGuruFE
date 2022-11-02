import {PlaceComponent} from "./PlaceComponent"
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
export const Home = function() {

    const [info, setInfo] = useState([]);// create useState for info thet we GET from db
    useEffect(()=>{
        const getInformation = async() => {
            const conn = await fetch('http://127.0.0.1:5000'); //create connection with db
            const getdata = await conn.json();
            setInfo(getdata);
        }
        getInformation();
    },[]);
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