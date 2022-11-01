import { useEffect, useState } from "react";
import { Rating } from "./filters/Rating";
import { Activities } from "./filters/Activities";
import { PlacesPanel } from "./PlacesPanel";
import {PlaceComponent} from "./PlaceComponent"

export const Main = function () {
    const [sating, setRating] = useState(0);
    const [date, setDate] = useState(false);
    // const [activities, setActivities] = useState();

    const [selectedActivities, setSelectedActivities] = useState(
        new Array()
    );
    /*
    1) Main -> FilterPanel & PlacesPanel
    2) FilterPanel -> ActivityFilter, DateFilter & RatingFilter
    3) Main:
       <div>
        <FilterPanel>
        <PlacesPanel>
       </div>
    4) Main: state for "rating". "setState" 
    
    */

    /*{
        info.map((infoIndex)=>(
            <PlaceComponent 
            name={infoIndex.name} 
            photo={infoIndex.photo} 
            description={infoIndex.description} 
            raiting={infoIndex.raiting} 
            locationCountry={infoIndex.country}
            locationCity={infoIndex.city}
            authorized = {true}/>
        ))
    }*/

    const [info, setInfo] = useState([]);// create useState for info thet we GET from db
    useEffect(()=>{
        const getInformation = async() => {
            const conn = await fetch('http://127.0.0.1:5000'); //create connection with db
            const getdata = await conn.json();
            setInfo(getdata);
        }
        getInformation();
    },[]);
    
    return (
        <div className="wrapper">
            <div className="left-panel">
                <Rating setRating={setRating} />
                <Activities selectedActivities={selectedActivities} setSelectedActivities={setSelectedActivities}/>
                <h3>Date of visit</h3>

            </div>
            <div className="places-panel">
                
                <PlacesPanel selectedActivities={selectedActivities}/>
            </div>
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
                        authorized = {true}/>
                    ))
                }
                    
                </li>
            </ul>
            
            
            
        </div>
    );
}