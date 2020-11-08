import React, { Component } from "react";
import '../style/jobcard.css'
import {Card,CardDeck,Button} from "react-bootstrap"
import axios from "axios"
import { Route , withRouter} from 'react-router-dom';

export default class JobCardView  extends React.Component{

    constructor(props){
        super(props)
        this.state = {
          title: this.props.title,
          text: this.props.text,
          id: this.props.id,
          home:this.props.home,
          color:"grey",
          footer: this.props.footer,
          images: ['https://image.freepik.com/vector-gratis/apreton-manos-vectoriales_23-2147734271.jpg?1', 'https://image.freepik.com/vector-gratis/coleccion-moderna-cpus-diseno-plano_23-2147970259.jpg', 'https://image.freepik.com/vector-gratis/coleccion-moderna-cpus-vista-isometrica_23-2147967518.jpg']
        }
        this.getRandomImage = this.getRandomImage.bind(this)
    }


    getRandomImage() {
      return this.state.images[1];
    }

   render(){
        return (
         <Card className="home_card">

                                 <Card.Img variant="top" src={this.getRandomImage()} />
                                 <Card.Body>
                                   <Card.Title className="home_card_title">{this.state.title}</Card.Title>
                                   <Card.Text className="home_card_text">
                                     {this.state.text}
                                   </Card.Text>
                                 </Card.Body>
                                 <Card.Footer>
                                   <small className="text-muted">{this.state.footer}</small>
                                 </Card.Footer>
                               </Card>
          );
    }
}
