import {React, useState} from "react";
import {PlaceComponent} from "./PlaceComponent"

export const ResultPage = function(responseData){

//console.log(JSON.stringify(responseData));
const[result, setResult] = useState([]);
var credentials = btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))
var auth = { "Authorization" : `Basic ${credentials}` }
let id = localStorage.getItem("id")

const ResultRequest = (e) =>{
    //e.preventDefault();
        fetch(`http://127.0.0.1:5000/filter`, {
            method: 'POST',
                headers: { 
                            'Authorization' : `Basic ${credentials}`,
                            'Content-Type': 'application/json'
                        },
                mode: 'cors',
        
            body: JSON.stringify(
            {
                search_box: responseData
            }
            )
        }).then(response => response.json())
            .then(respData => setResult(respData))
            .catch(e => console.log("failed: " + e));
            console.log(result);
    }

    ResultRequest();
    return(
    <div /*onShow={e=>ResultRequest(e)}*/>
        <ul style = {{display:'block'}}>
            <li style = {{display:'inline-block'}}>

                {
                    result &&
                    result.map(
                        (infoIndex)=>(
                            <PlaceComponent 
                                name={infoIndex.name} 
                                image={infoIndex.image} 
                                description={infoIndex.description} 
                                rate={infoIndex.rate} 
                                country={infoIndex.country}
                                city={infoIndex.city}
                                authorized = {true}/>
                    ))
                }

                {/* {
                    respName && respCity && respCountry && respDescription && respImage && respRate &&
                        <PlaceComponent 
                        name={respName} 
                        image={respImage} 
                        description={respDescription} 
                        rate={respRate} 
                        country={respCountry}
                        city={respCity}
                        authorized = {true}/>
                } */}
                
            </li>
        </ul>
    </div>
    );
}