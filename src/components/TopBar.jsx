import {Navbar,Nav,Form,FormControl,Button,Row,Col,Container,Badge,ListGroup,Card} from "react-bootstrap";
import React, { Component } from "react";

import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from "@fortawesome/free-solid-svg-icons"
import '../style/topbar.css'

import axios from "axios"


export default class TopBar extends React.Component{
    constructor(props){
        super(props)

       this.state ={
            checked:false,
            generado:false,
            link:"",
            sideBar: this.props.sideBar
        }
      this.handleChange=this.handleChange.bind(this)

    }
     handleChange() {
     if(!this.state.generado){
            this.setState({generado:true})
        const header={  'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                         }

     axios.put('http://localhost:8080/link',   {username:localStorage.getItem('username')},header)
                .then(response =>{ this.setState({link:response.data})}
            ).catch(error=>{alert("Error")});

}
     if(this.state.checked==true)  this.setState({ checked:false });

      else this.setState({ checked:true });

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
         <div>
                  {this.state.checked ? (
                                        <Card bg="secondary" style={{ width: '100 px', alingText:"center" }}>
                                        <Card.Title>{this.state.link}</Card.Title>
                                        </Card> ) : (
                             <div />
                           )}
                    </div>
            </>

          );
    }
}
