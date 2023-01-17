import { useContext, useEffect, useState } from "react";
import { PlaceComponent } from "./PlaceComponent"
import { AlertComponent } from "./AlertComponent"
import { SearchContext } from "./context/SearchContext";
import { FilterContext } from "./context/FilterContext";

export const Main = function () {
    const searchContext = useContext(SearchContext);
    const filterContext = useContext(FilterContext);
    const [info, setInfo] = useState([]);// create useState for info thet we GET from db
    var credentials = btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))

    useEffect(() => {
        const getInformation = async () => {
            const conn = await fetch('http://127.0.0.1:5000/homepage'); //create connection with db
            const getdata = await conn.json();
            setInfo(getdata);
        }
        getInformation();
    }, []);

    useEffect(() => {
        console.log("filter changed from main " + filterContext.rating + ", " + filterContext.date + ", " +filterContext. selectedActivities);

        console.log(credentials)
        var auth = { "Authorization": `Basic ${credentials}` }
        fetch('http://127.0.0.1:5000/filter', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(
                {
                    rate: filterContext.rating,
                    activities: filterContext.selectedActivities,
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
    }, [filterContext.rating, filterContext.date, filterContext.selectedActivities]

    );

    useEffect(() => {
        console.log("input!" + searchContext.searchString)
        fetch(`http://127.0.0.1:5000/filter`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
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
                <div className="main-panel">
                            {
                                info.map((infoIndex) => (
                                    <PlaceComponent
                                        id={infoIndex.id}
                                        name={infoIndex.name}
                                        image={infoIndex.image}
                                        description={infoIndex.description}
                                        rate={infoIndex.rate}
                                        country={infoIndex.country}
                                        city={infoIndex.city}
                                        authorized={true} />
                                ))

                            }
                </div>
                <div>
                    <AlertComponent authorized={true} />
                </div>
            </div>
        
    );
}