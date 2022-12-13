import {PlaceComponent} from "./PlaceComponent"
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { useEffect, useState } from "react";
import {AlertComponent} from "./AlertComponent"


export const Home = function() {
    const [info, setInfo] = useState([]);// create useState for info thet we GET from db
    useEffect(()=>{
        const getInformation = async() => {
            const conn = await fetch('http://127.0.0.1:5000/homepage'); //create connection with db
            const getdata = await conn.json();
            
            setInfo(getdata);
        }
        getInformation();
    },[]);
        
    return (
    <div className="wrapper">
        <div>
            {/* <div><Link to='/registration'>Registration</Link> </div> 
        
            <div><Link to='/login'>Login</Link> </div>  */}
            <ul style = {{display:'block'}}>
                    <li style = {{display:'inline-block'}}>

                    {
                        info.map((infoIndex)=>(
                            <PlaceComponent 
                            name={infoIndex.name} 
                            image={infoIndex.image} 
                            description={infoIndex.description} 
                            rate={infoIndex.rate} 
                            country={infoIndex.country}
                            city={infoIndex.city}
                            authorized = {false}/>
                        ))
                    }
                        
                    </li>
                </ul>
                
        </div>
        <div>
            <AlertComponent authorized={false}/>
        </div>
    </div>
    );
}