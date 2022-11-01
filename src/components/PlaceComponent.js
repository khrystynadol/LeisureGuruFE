import React from "react";
import {Button, CardColumns, Card, CardBody, CardTitle, CardImg, CardText} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const PlaceComponent = function({photo, name, rate, description, locationCountry, locationCity, authorized}){
    const alterText = {name} + ' in ' + {locationCountry} + ', ' + {locationCity};
    return(
        <>
        <Card className="my-2"style={{width: '60rem', display:'inline-block'}}>
            <CardImg src = {photo}
            alt = {alterText}
            width='100%'/>
            <CardBody>
            <CardTitle tag="h5">
                {name}
            </CardTitle>
            <CardText>
                {description}
            </CardText>
            <CardText>
                <small className="text-muted">
                {locationCountry}, {locationCity}
                </small>
            </CardText>
            {
            authorized ?
            <CardText>
                <small className="text-muted">
                Raiting: {rate}
                </small>
            </CardText> && 
            <Button>More</Button> : <></>
            }
            </CardBody>
        </Card>

</>

    );
}