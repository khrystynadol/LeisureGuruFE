
import {Input, Label} from 'reactstrap';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'


export const Date = function(props) {
    const date = props.date;
    const setDate = props.setDate;
    const dateSelection = [

    {"id" : 1, "name" : "Today"}, 
    {"id" : 2, "name" : "Next week"},
    {"id" : 3, "name" : "Next 2 weeks"}, 
    {"id" : 4, "name" : "Next month"},
    {"id" : 5, "name" : "Choose dates"}


    ];
   
    const renderDate = () => {
        return dateSelection.map((s) => (<li key={s.id}><Input type="radio" name="radio1" onChange={(e) => setDate(s.id)}></Input><Label className="filterItem" >{s.name}</Label></li>))
    }

    return (
        <div className="Date">
        <span className="filterTitle" style={{paddingLeft:30}}>Date</span>
        <form>
            <ul style={{listStyle: 'none'}}>
                {renderDate()}
               
            </ul>
            {date == 5 ? <Calendar selectRange="true"/> : null}
        </form>
        </div>
    );

}


