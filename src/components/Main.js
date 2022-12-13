import { useContext, useEffect, useState } from "react";
import { Rating } from "./filters/Rating";
import { Activities } from "./filters/Activities";
import {PlaceComponent} from "./PlaceComponent"
import { Date } from "./filters/Date";

import {AlertComponent} from "./AlertComponent"
import { SearchContext } from "./context/SearchContext";

export const Main = function (props) {
    const input = props.setSearchString;
    const [rating, setRating] = useState(5);
    const [date, setDate] = useState(0);
    const [searchString, setSearchString] = useState(input);
    const [selectedActivities, setSelectedActivities] = useState(
        new Array()
    );
    const searchContext = useContext(SearchContext);

    var credentials = btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))


    const [info, setInfo] = useState([]);// create useState for info thet we GET from db
    useEffect(()=>{
        const getInformation = async() => {
            const conn = await fetch('http://127.0.0.1:5000/homepage'); //create connection with db
            const getdata = await conn.json();            
            setInfo(getdata);
        }
        getInformation();
    },[]);

    useEffect( () => {
        console.log("filter changed " + rating + ", " + date + ", " + selectedActivities);
       
        console.log(credentials)
        var auth = { "Authorization" : `Basic ${credentials}` }
        fetch('http://127.0.0.1:5000/filter', {
            method: 'POST',
            headers: { 
                        'Authorization' : `Basic ${credentials}`,
                        'Content-Type': 'application/json'
                      },
            mode: 'cors',
            body: JSON.stringify(
                {
                    rate: rating,
                    activities: selectedActivities,
                }
            )
        })
        .then(response => {
            if (response.status >= 400) {
                throw Error(400);
            } else {
                return response;
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            return setInfo(jsonResponse);
        })
        .catch(e => console.log("failed: " + e));
    }, [rating, date, selectedActivities]

    );

    useEffect(() => {
        console.log("input!" + searchContext.searchString)
        fetch(`http://127.0.0.1:5000/filter`, {
            method: 'POST',
                headers: { 
                            'Authorization' : `Basic ${credentials}`,
                            'Content-Type': 'application/json'
                        },
                mode: 'cors',
        
            body: JSON.stringify(
            {
                search_box: searchContext.searchString
            }
            )
        })
            .then(response => response.json())
            .then(respData => {
                setInfo(respData)
            })
            .catch(e => console.log("failed: " + e));
    }, [searchContext.searchString]);

    return (
        <div className="wrapper">
            <div className="left-panel">
                <Rating setRating={setRating} />
                <Activities selectedActivities={selectedActivities} setSelectedActivities={setSelectedActivities}/>
                <Date date={date} setDate={setDate}/>

            </div>
            <div className="main-panel">
            <ul style = {{display:'block'}}>
                <li style = {{display:'inline-block'}}>

                {
                    info.map((infoIndex)=>(
                        <PlaceComponent 
                        id={infoIndex.id}
                        name={infoIndex.name} 
                        image={infoIndex.image} 
                        description={infoIndex.description} 
                        rate={infoIndex.rate} 
                        country={infoIndex.country}
                        city={infoIndex.city}
                        authorized = {true}/>
                    ))

                }
                    
                </li>
            </ul>
            </div>
            <div>
                <AlertComponent authorized={true}/>
            </div>
            
            
        </div>
    );
}