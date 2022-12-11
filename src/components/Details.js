import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';
import { WiDayCloudyGusts, WiDayCloudy, WiNightShowers, WiDaySleetStorm} from "react-icons/wi";
import './style.css'


export const Details = function () {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [images, setImages] = useState([]);
    const [placeData, setPlaceData] = useState({});
    const {id} = useParams();
    const location = useLocation();
    var credentials = btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))
    console.log(credentials)
    var auth = { "Authorization": `Basic ${credentials}` }


    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };


    useEffect(() => {
        fetch(`http://127.0.0.1:5000/place/photos/${id}`, {
            method: 'GET',
            headers: auth,
            mode: 'cors'
        })
            .then(response => response.json())
            .then(jsonResponse => {

                setImages(jsonResponse);
            })
            .catch(e => console.log("failed: " + e));




        fetch(`http://127.0.0.1:5000/place/${id}`, {
            method: 'GET',
            headers: auth,
            mode: 'cors'
        })
            .then(response => response.json())
            .then(jsonResponse => {

                setPlaceData(jsonResponse[0]);
              
                
            })
            .catch(e => console.log("failed: " + e));



    }, []);

    const getItems = (images) => {
        let items = [];
        for (let i = 0; i < images.length; i++) {
            items[i] = {
                src: images[i].image,
                key: i
            }
        }
        return items;
    };

    const getSlides = (images) => {
        const items = getItems(images);

        return items.map((item) => {
        
            return (
                <CarouselItem
                    key={item.src}
                    onExiting={() => setAnimating(true)}
                    onExited={() => setAnimating(false)}
                >
                    <img src={item.src} alt={item.altText} style={{ height: '600px', display: 'block', margin: 'auto' }} />
                </CarouselItem>
            );
        });
    }

    const dailyWeather = [
        {
            title: 'Today',
            icon: <WiDayCloudyGusts/>,
            temperature: '2°'
        },
        {
            title: '21.12.2022',
            icon: <WiDayCloudy/>,
            temperature: '4°'
        },
        {
            title: '22.12.2022',
            icon: <WiNightShowers/>,
            temperature: '-1°'
        },
        {
            title: '23.12.2022',
            icon: <WiNightShowers/>,
            temperature: '-3°'
        },
        {
            title: '24.12.2022',
            icon: <WiDaySleetStorm/>,
            temperature: '0°'
        },
        {
            title: '25.12.2022',
            icon: <WiNightShowers/>,
            temperature: '-1°'
        },
        {
            title: '26.12.2022',
            icon: <WiDaySleetStorm/>,
            temperature: '1°'
        }
    ];

    return (
        <div>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators
                    items={getItems(images)}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                />
                {getSlides(images)}
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                />
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                />
            </Carousel>

            <Card className="my-2" >

                <CardBody>
                    <CardTitle tag="h5">
                        {placeData.name}
                    </CardTitle>
                    <CardText>
                        {placeData.description}
                    </CardText>
                    <CardText>
                        <small className="text-muted">
                            Rating: {placeData.rate}
                        </small>
                    </CardText>
                </CardBody>
            </Card>

            <div className="detailsWeatherPanel">
                {dailyWeather.map(item => 
                    <div className="weatherCard">
                        <div>{item.title}</div>
                        <div className="weatherIcon">{item.icon}{item.temperature}</div>
                    </div>
                )}
            </div>

        </div>

    )

}