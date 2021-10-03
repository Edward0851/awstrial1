import React from "react";
import NavbarElement from './Navbar';
import CardElement from './Card';


class Shop extends React.Component{
    render(){
        return(
            <>
            <NavbarElement />
            <CardElement />
            <CardElement />
            </>
        )
    }
}

export default Shop