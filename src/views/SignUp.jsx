import React, { Component } from "react";
import {Form, Container, Row, Card} from "react-bootstrap";
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
            <div>
                <Card>
               <Form style={{width: '60vh', margin: 'auto'}}>
                    <Row>
                        <Form.Label>Nombre</Form.Label>
                        <Col>
                            <Form.Control placeholder="Nombre" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Apellido" />
                        </Col>
                    </Row>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Ingresá tu Email email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <div class="mt-3">
                        <Button class="mt-5" variant="primary" type="submit">
                            Registrarme
                        </Button>
                    </div>
                </Form>
                </Card>
            </div>
          );
    }
}
