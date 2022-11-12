import {Input, Label} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import {  useState } from "react";

export const Rating = function (props) {
    const setRating = props.setRating;
    const getStars = (number) => {
        
        return (
            [...Array(number)].map((e) => <FontAwesomeIcon style={{color:'white',width:10, paddingLeft:5}} icon={faStar}/>)
        );

    }

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);
  
    return (
        <>
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
    

    
    {/* <div className="d-flex p-4">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >

      <DropdownToggle caret>Dropdown</DropdownToggle>
        <DropdownMenu >
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem text>Dropdown Item Text</DropdownItem>
          <DropdownItem disabled>Action (disabled)</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Foo Action</DropdownItem>
          <DropdownItem>Bar Action</DropdownItem>
          <DropdownItem>Quo Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div> */}



      </>



    );
}