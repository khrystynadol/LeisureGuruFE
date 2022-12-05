import React from "react";
import {PlaceComponent} from "./PlaceComponent"

export const ResultPage = function({respName, respImage, respDescription, respRate, respCountry, respCity}){
    return(
    <div>
        <ul style = {{display:'block'}}>
            <li style = {{display:'inline-block'}}>

                {/* {
                    respData &&
                    respData.map((infoIndex)=>(
                        <PlaceComponent 
                        name={infoIndex.name} 
                        image={infoIndex.image} 
                        description={infoIndex.description} 
                        rate={infoIndex.rate} 
                        country={infoIndex.country}
                        city={infoIndex.city}
                        authorized = {true}/>
                    ))
                } */}

                {
                    respName && respCity && respCountry && respDescription && respImage && respRate &&
                        <PlaceComponent 
                        name={respName} 
                        image={respImage} 
                        description={respDescription} 
                        rate={respRate} 
                        country={respCountry}
                        city={respCity}
                        authorized = {true}/>
                }
                
            </li>
        </ul>
    </div>
    );
}