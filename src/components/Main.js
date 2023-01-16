import { useContext, useEffect, useState } from "react";
import { Rating } from "./filters/Rating";
import { Activities } from "./filters/Activities";
import { PlaceComponent } from "./PlaceComponent"
import { Date } from "./filters/Date";

import { AlertComponent } from "./AlertComponent"
import { SearchContext } from "./context/SearchContext";

import styles from './Main.css';

import {
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
} from 'reactstrap';

export const Main = function (props) {
    const input = props.setSearchString;
    const [rating, setRating] = useState(5);
    const [date, setDate] = useState(0);
    const [searchString, setSearchString] = useState(input);
    const [selectedActivities, setSelectedActivities] = useState(
        new Array()
    );
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const searchContext = useContext(SearchContext);

    var credentials = btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))


    const [info, setInfo] = useState([]);// create useState for info thet we GET from db

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    useEffect(() => {
        const getInformation = async () => {
            const conn = await fetch('http://127.0.0.1:5000/homepage'); //create connection with db
            const getdata = await conn.json();
            setInfo(getdata);
        }
        getInformation();
    }, []);

    useEffect(() => {
        console.log("filter changed " + rating + ", " + date + ", " + selectedActivities);

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

    const toggleSideBar = () => {
        setSideBarOpen(!sideBarOpen);
    };

    return (
        <>
            <Button onClick={toggleSideBar}>Show sidebar</Button>
            <div className="wrapper">
                <Offcanvas toggle={toggleSideBar} isOpen={sideBarOpen} size="lg">
                    <OffcanvasHeader toggle={toggleSideBar}>Header</OffcanvasHeader>
                    <OffcanvasBody>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                        <div>Body</div>
                    </OffcanvasBody>
                </Offcanvas>
                {/* <div className="left-panel">
                <Rating setRating={setRating} />
                <Activities selectedActivities={selectedActivities} setSelectedActivities={setSelectedActivities}/>
                <Date date={date} setDate={setDate}/>

            </div> */}


                {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                    <DropdownToggle caret size="lg" color="primary">Filters</DropdownToggle>
                    <DropdownMenu color="primary">
                        <DropdownItem><Rating setRating={setRating} /></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem><Activities selectedActivities={selectedActivities} setSelectedActivities={setSelectedActivities} /></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem><Date date={date} setDate={setDate} /></DropdownItem>
                    </DropdownMenu>
                </Dropdown> */}


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
        </>
    );
}