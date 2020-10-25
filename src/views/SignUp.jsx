import React, { Component } from "react";
import '../style/SignUp.css'
import {Form, InputGroup, Container, Row, Card} from "react-bootstrap";
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

export default class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {}
        // this.setComponent = this.setComponent.bind(this);
    }

    render(){
        return (
            <div class="signup-container">
            <Card>
                <div class="title">
                    <Card.Title>Linked UNQ</Card.Title>
                    <Card.Subtitle>Formulario de registro</Card.Subtitle>
                </div>
               <Form class="signup-form">
                    <Row>
                        <Col>
                            <Form.Control placeholder="Nombre" required />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Apellido" required />
                        </Col>
                    </Row>
                    <Form.Group controlId="formBasicEmail">
                    <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    </InputGroup.Prepend>
                        <Form.Control type="email" placeholder="Ingresá tu Email email" required />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Contraseña" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Reingresá tu contraseña" required />
                    </Form.Group>
                    <Form.Group>
            <Form.Check
              required
              name="terms"
              label="Acepto los términos y condiciones"
              id="validationFormik106"
            />
          </Form.Group>
                    <div class="form-button">
                        <Button type="submit" block>
                            Registrarme
                        </Button>
                    </div>
                </Form>
                </Card>
            </div>
          );
    }
}
