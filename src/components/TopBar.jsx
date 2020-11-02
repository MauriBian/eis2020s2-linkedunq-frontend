import {Navbar,Nav,Form,FormControl,Button} from "react-bootstrap";
import React, { Component } from "react";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../style/topbar.css'

export default class TopBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          sideBar: this.props.sideBar
        }
    }

    render(){
        return (
            <>
              <Navbar className="topBar" bg="dark" variant="dark">
                <div>
                  <Button variant="dark"><FontAwesomeIcon icon={faBars} size="lg" color="white"/></Button>
                  <Navbar.Brand className="navbar-title">John Doe</Navbar.Brand>
                </div>
              </Navbar>
            </>
          );
    }
}
