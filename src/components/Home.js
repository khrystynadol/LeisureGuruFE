import {PlaceComponent} from "./PlaceComponent"
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { useEffect, useState } from "react";
export const Home = function() {
    const [info, setInfo] = useState([]);// create useState for info thet we GET from db
    useEffect(()=>{
        const getInformation = async() => {
            const conn = await fetch('http://127.0.0.1:5000/homepage'); //create connection with db
            const getdata = await conn.json();
            /*
            const getdata = [
            {
                name: 'Lviv Theatre of Opera and Ballet',
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSelMfKuWG2BlazDT0GfAttxrHE5IodqO97ng&usqp=CAU''https://www.bing.com/images/blob?bcid=qDTzl4hDTtUEIg',
                description: 'Lviv’s resplendent opera house is one of the city’s symbols and stands alone on Freedom Square.',
                rating: 5,
                locationCountry: 'Ukraine',
                locationCity: 'Lviv'
            },
            {
                name: 'Market Square',
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmeiA15y-nOowg6Uk4GqICPASvcXqUCeJofL4SpTONoe3uHawKIt769NoiSfLZgU_MGpA&usqp=CAU',
                description: 'It seems like all streets in the Old Town converge on this historic and hectic central square surrounding Lviv’s Town Hall.',
                rating: 5,
                locationCountry: 'Ukraine',
                locationCity: 'Lviv'
            }
            
            ];
            */
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
      </div>);
}