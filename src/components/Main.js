import { useEffect, useState } from "react";
import { Rating } from "./filters/Rating";
import { Activities } from "./filters/Activities";
import { PlacesPanel } from "./PlacesPanel";
import {PlaceComponent} from "./PlaceComponent"
import { Date } from "./filters/Date";
import {AlertComponent} from "./AlertComponent"


export const Main = function () {
    const [rating, setRating] = useState(5);
    const [date, setDate] = useState(0);
    // const [activities, setActivities] = useState();

    const [selectedActivities, setSelectedActivities] = useState(
        new Array()
    );
    // const [selectedDate, setSelectedDate] = useState(
    //     new Array()
    // );
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
            const conn = await fetch('http://127.0.0.1:5000/homepage'); //create connection with db
            const getdata = await conn.json();
            
            /*const getdata = [
                {
                    name: 'abc',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Латинський_кафедральний_собор_%28Львів%29_16.jpg/270px-Латинський_кафедральний_собор_%28Львів%29_16.jpg',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum ut molestias architecto voluptate aliquamnihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,quia.',
                    rate: 5,
                    country: 'Ukraine',
                    city: 'Lviv'
                }
            ];*/
            
            setInfo(getdata);
        }
        getInformation();
    },[]);

    useEffect( () => {
        console.log("filter changed " + rating + ", " + date + ", " + selectedActivities);
        // fetch(
        //     'http://127.0.0.1:5000/filter?' + new URLSearchParams({
        //         rate: rating,
        //         activities: selectedActivities,
        //     }),
        //     {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
                
        //     }
        // )
        var credentials = btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))
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
          // let i = 9;
           //console.log("JR: " + jsonResponse);
            return setInfo(jsonResponse);
        })
        .catch(e => console.log("failed: " + e));
        //'server/filter?param=value&param2=value2' 
    }, [rating, date, selectedActivities]

    );
    
    return (
        <div className="wrapper">
            <div className="left-panel">
                <Rating setRating={setRating} />
                <Activities selectedActivities={selectedActivities} setSelectedActivities={setSelectedActivities}/>
                <Date date={date} setDate={setDate}/>

            </div>
            {/* <div className="places-panel">
                
                <PlacesPanel selectedActivities={selectedActivities} selectedDate={date}/>
            </div> */}
            
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