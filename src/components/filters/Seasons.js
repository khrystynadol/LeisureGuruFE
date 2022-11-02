import { useEffect, useState } from "react";
import {Input, Label} from 'reactstrap';


export const Seasons = function(props) {
    const setSelectedSeasons = props.setSelectedSeasons;
    const selectedSeasons = props.selectedSeasons;
    const seasons = [

    {"id" : 1, "name" : "Winter"}, 
    {"id" : 2, "name" : "Spring"},
    {"id" : 3, "name" : "Summer"}, 
    {"id" : 4, "name" : "Autumn"}

    ];
   
    const renderSeasons = () => {
        return seasons.map((s) => (<li key={s.id}><Input type="checkbox" onChange={() => handleOnChange(s.id)}></Input><Label className="filterItem" >{s.name}</Label></li>))
    }

    const handleOnChange = (id) => {
        //selectedActivities.includes(id) ? selectedActivities.filter((exId) => {})
        const currSeasons = selectedSeasons.slice();
        currSeasons.indexOf(id) === -1 ? currSeasons.push(id) : currSeasons.splice(currSeasons.indexOf(id), 1);
        setSelectedSeasons(currSeasons);
    }

    return (
        <div className="Seasons">
        <span className="filterTitle" style={{paddingLeft:30}}>Seasons</span>
        <form>
            <ul style={{listStyle: 'none'}}>
                {renderSeasons()}
            </ul>
        </form>
        </div>
    );

}