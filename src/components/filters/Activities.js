import { useEffect, useState } from "react";
import {Input, Label} from 'reactstrap';


export const Activities = function(props) {
    const setSelectedActivities = props.setSelectedActivities;
    const selectedActivities = props.selectedActivities;
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(
                resolve([
                    {"id" : 1, "name" : "Hiking"}, 
                    {"id" : 2, "name" : "Mountain biking"},
                    {"id" : 3, "name" : "Rowing"}, 
                    {"id" : 4, "name" : "Cycling"},
                    {"id" : 5, "name" : "Swimming"}
                ]), 1000
            );
        }).then((json) => {
            setActivities(json);
        });
    }, []);

    const renderActivities = () => {
        return activities.map((act) => (<li key={act.id}><Input type="checkbox" onChange={() => handleOnChange(act.id)}></Input><Label className="filterItem" >{act.name}</Label></li>))
    }

    const handleOnChange = (id) => {
        //selectedActivities.includes(id) ? selectedActivities.filter((exId) => {})
        const currActivities = selectedActivities.slice();
        currActivities.indexOf(id) === -1 ? currActivities.push(id) : currActivities.splice(currActivities.indexOf(id), 1);
        setSelectedActivities(currActivities);
    }

    return (
        <div className="Activities">
        <span className="filterTitle" style={{paddingLeft:30}}>Activities</span>
        <form>
            <ul style={{listStyle: 'none'}}>
                {renderActivities()}
            </ul>
        </form>
        </div>
    );
}