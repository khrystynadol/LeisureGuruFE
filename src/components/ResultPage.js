import React from "react";
import {PlaceComponent} from "./PlaceComponent"

export const ResultPage = function({data}){
    return(
    <div>
        <ul style = {{display:'block'}}>
            <li style = {{display:'inline-block'}}>

                {
                    data.map((infoIndex)=>(
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
    );
}