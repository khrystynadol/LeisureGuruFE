import {Input, Label} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'


export const Rating = function (props) {
    const setRating = props.setRating;
    const getStars = (number) => {
        
        
        return (
            [...Array(number)].map((e) => <FontAwesomeIcon style={{color:'white',width:10, paddingLeft:5}} icon={faStar}/>)
        );

    }
    return (
        <div>
        <span className="filterTitle" style={{paddingLeft:30}}>Rating</span>
        <form>
            <ul style={{listStyle: 'none'}}>
            <li><Input type="radio" name="radio1" onChange={(e) => setRating(1)}></Input><Label>{getStars(1)}</Label></li>
            <li><Input type="radio" name="radio1" onChange={(e) => setRating(2)}></Input><Label>{getStars(2)}</Label></li>
            <li><Input type="radio" name="radio1" onChange={(e) => setRating(3)}></Input><Label>{getStars(3)}</Label></li>
            <li><Input type="radio" name="radio1" onChange={(e) => setRating(4)}></Input><Label>{getStars(4)}</Label></li>   
            <li><Input type="radio" name="radio1" onChange={(e) => setRating(5)}></Input><Label>{getStars(5)}</Label></li>
            </ul>
        </form>
    </div>
        
    );
}