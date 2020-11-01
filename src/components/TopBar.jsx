import {Navbar,Nav,Form,FormControl,Button} from "react-bootstrap";
import React, { Component } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../style/topbar.css'
export default class TopBar extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <>
              <Navbar bg="dark" variant="dark">
                <Button variant="dark"><FontAwesomeIcon icon={faBars} size="lg" color="white"/></Button>
                <Navbar.Brand className="navbar-title">John Doe</Navbar.Brand>
              </Navbar>
            </>
          );
    }
}
