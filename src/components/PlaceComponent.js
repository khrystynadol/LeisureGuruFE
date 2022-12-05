import React from "react";
import {Button, CardColumns, Card, CardBody, CardTitle, CardImg, CardText} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const PlaceComponent = function({image, name, rate, description, country, city, authorized}){
    const alterText = toString(name) + ' in ' + toString(country) + ', ' + toString(city);
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
            <CardText>
                <small className="text-muted">
                Raiting: {rate}
                </small>
            </CardText>
             : <></>
            }
            {
            authorized ?
            <Button>More</Button>
             : <></>
            }
            </CardBody>
        </Card>

</>

    );
}