import React from "react";
import NavbarElement from './Navbar';
import CarouselElement from './Carousel';
import CardElement from './Card';


class Home extends React.Component{
    render(){
        return(
            <>
            <CarouselElement />
            <NavbarElement />
            <CardElement />
            </>
        )
    }
}

export default Home