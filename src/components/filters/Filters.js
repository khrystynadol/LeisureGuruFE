import { useContext, useState } from "react";
import { Rating } from "./Rating";
import { Activities } from "./Activities";
import { Date } from "./Date";
import {
    Button,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
} from 'reactstrap';
import { AiOutlineBars } from "react-icons/ai";
import { FilterContext } from "../context/FilterContext";
import styles from '../style.css';
export const Filters = function() {
    const filterContext = useContext(FilterContext);

    const [sideBarOpen, setSideBarOpen] = useState(false);
    const toggleSideBar = () => {
        setSideBarOpen(!sideBarOpen);
    };

    return (
        <>
            {/* <Button onClick={toggleSideBar} className="bigFilter">Filters</Button> */}
            <Button onClick={toggleSideBar} className="smallFilter"><AiOutlineBars className="filterLines"/></Button>
            <Offcanvas toggle={toggleSideBar} isOpen={sideBarOpen} size="lg">
                <OffcanvasHeader toggle={toggleSideBar} className="offcanvHeader">Filters</OffcanvasHeader>
                <OffcanvasBody className="offcanvBody">
                <Rating setRating={filterContext.setRating} />
                <Activities selectedActivities={filterContext.selectedActivities} setSelectedActivities={filterContext.setSelectedActivities}/>
                <Date date={filterContext.date} setDate={filterContext.setDate}/>
                </OffcanvasBody>
            </Offcanvas> 
        </>
    );
}