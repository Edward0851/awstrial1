import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'

class CarouselElement extends React.Component{
    render(){
        return(
        <Carousel>
            <Carousel.Item>
            <img
                className="d-block"
                src="1.jpg"
                alt="First slide"
            />
            <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
            <img
                className="d-block"
                src="2.jpg"
                alt="Second slide"
            />

            <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
            <img
                className="d-block"
                src="3.jpg"
                alt="Third slide"
            />

            <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
        )
    }
}
export default CarouselElement