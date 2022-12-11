import React from "react";
import {Button, CardColumns, Card, CardBody, CardTitle, CardImg, CardText} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useNavigate } from "react-router-dom";
import { WiDayThunderstorm } from "react-icons/wi";

export const PlaceComponent = function({id, image, name, rate, description, country, city, authorized}){
    const navigate = useNavigate();
    const alterText = toString(name) + ' in ' + toString(country) + ', ' + toString(city);
    const more_handler = () => {
        navigate(`/details/${id}`)
    
    }

    return(
        <>
        <Card className="my-2"style={{ width: '60rem', display:'inline-block'}}>
            <CardImg src = {image}
            alt = {alterText}
            width='100%'/>
            <CardBody>
            <CardTitle tag="h5">
                {name}
            </CardTitle>
            <CardText style={{width:'57rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                {description}
            </CardText>
            <CardText>
                <small className="text-muted">
                {country}, {city}
                </small>
            </CardText>
            {
            authorized ?
            <>
            <CardText>
                <small className="text-muted">
                Raiting: {rate}
                </small>
            </CardText>
            <CardText className="text-muted" style={{marginLeft : '1%'}}>
                
            <WiDayThunderstorm style={{width: '30px',height: '30px'}}></WiDayThunderstorm> 
            <small style={{}}>4°</small>
                
            </CardText>
            </>
             : <></>
            }
            {
            authorized ?
            <Button onClick={() => more_handler()}>More</Button>
             : <></>
            }
            </CardBody>
        </Card>

</>

    );
}