import React from "react";

export const ResultPage = function({data}){
    return(
    <div>
        <ul style = {{display:'block'}}>
            <li style = {{display:'inline-block'}}>

                {
                    data.map((infoIndex)=>(
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
    </div>
    );
}