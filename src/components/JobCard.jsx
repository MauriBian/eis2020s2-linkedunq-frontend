import React, { Component } from "react";
import '../style/jobcard.css'
import {Card,CardDeck, Row, Col, Button} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { Route , withRouter} from 'react-router-dom';

export default class JobCard extends React.Component{

    constructor(props){
        super(props)
        this.state = {
          guestMode: this.props.guest,
          title: this.props.title,
          text: this.props.text,
          id: this.props.id,
          home:this.props.home,
          color:"grey",
          footer: this.props.footer,
          link: this.props.link,
          image: this.props.image,
          images: ['https://image.freepik.com/vector-gratis/apreton-manos-vectoriales_23-2147734271.jpg?1', 'https://image.freepik.com/vector-gratis/coleccion-moderna-cpus-diseno-plano_23-2147970259.jpg', 'https://image.freepik.com/vector-gratis/coleccion-moderna-cpus-vista-isometrica_23-2147967518.jpg']
        }
        this.getRandomImage = this.getRandomImage.bind(this)
        this.cambiarColor = this.cambiarColor.bind(this)
        this.eliminarTrabajo = this.eliminarTrabajo.bind(this)
        this.openEditModal = this.openEditModal.bind(this)
        this.visitJob = this.visitJob.bind(this)
    }

    cambiarColor(event){
    console.log(event.type)
    if(event.type=="mouseover")
    this.setState({color:"red"})
    if(event.type=="mouseout"){
        this.setState({color:"grey"})
        }
    }
    async eliminarTrabajo(){
      await axios.delete('http://localhost:8080/job/' + this.state.id)
      this.props.clickHandler()


    }
    getRandomImage() {
      return this.state.images[Math.floor(Math.random() * this.state.images.length)];
    }

    openEditModal () {
      this.props.editfunction()
    }

    visitJob () {
      window.open(this.state.link); 
    }

    render(){
        return (
            <Card className="home_card">
            { !this.state.guestMode ? <Button onClick={ this.eliminarTrabajo} >
                                  <svg   style={{color:this.state.color }}   width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path  onMouseOver={this.cambiarColor} onMouseOut={this.cambiarColor} fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                </svg>
        </Button> : <div></div> }
              <Card.Img variant="top" src={ this.image ? this.image : this.getRandomImage()} />
              {
                !this.state.guestMode ? <FontAwesomeIcon onClick={this.openEditModal} className="icon-edit" icon={faPen} size="lg"> </FontAwesomeIcon> : <div></div>
              }
              <Card.Body>
                <Card.Title className="home_card_title">{this.state.title}</Card.Title>
                <Card.Text className="home_card_text">
                  {this.state.text}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col className="job-date-col-col">
                    <div className="job-date-col">
                      <small className="text-muted">{this.state.footer}</small>
                    </div>
                  </Col>
                  <Col className="button-col">
                    {
                      this.state.link ? <Button onClick={this.visitJob}>Visitar</Button> : ''
                    }
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          );
    }
}
