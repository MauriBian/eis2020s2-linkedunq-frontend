import React from "react";
import '../style/SignUp.css'
import {Form, InputGroup, Row, Card} from "react-bootstrap";
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import axios from "axios"
import  { Redirect } from 'react-router-dom'

export default class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            name: '',
            lastname: '',
            email: '',
            password: '',
            repassword: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.sendDataToApi = this.sendDataToApi.bind(this)
    }

    sendDataToApi(){
        const emailErrorDiv = document.querySelector('.error-log-email')
        if (localStorage.getItem(this.state.email)) {
            emailErrorDiv.classList.toggle('inactive', false)
            return
        }
        emailErrorDiv.classList.toggle('inactive', true)
        localStorage.setItem(this.state.email, this.state)
        localStorage.setItem('actualUser', this.state.name)
        this.props.history.push("/home");

    }

    handleSubmit (e) {
        e.preventDefault()


const header={  'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
                 }

    axios.post('http://localhost:8080/register',
                {username:this.state.name.replace(/ /g, ""),
                password:this.state.password.replace(/ /g, ""),
                firstName:this.state.name.replace(/ /g, ""),
                lastName:this.state.lastname.replace(/ /g, ""),
                email:this.state.email.replace(/ /g, ""),
                },header)
        .then(response =>alert("usuario creado con exito")).catch(error=>{alert("Usuario incorrecto")});
    }

    handleChange (e) {
        this.setState({ [e.target.name] : e.target.value })
        if (e.target.name === 'repassword') {
            const value = this.state.password !== e.target.value
            const elem = e.target.parentElement.querySelector('.error-log')
            elem.classList.toggle('active', value )
            elem.classList.toggle('inactive', !value)
        }
    }

    render(){
        return (
            <div className="signup-container">
            <Card className="register-card">
                <div className="title">
                    <Card.Title>Linked UNQ</Card.Title>
                    <Card.Subtitle>Formulario de registro</Card.Subtitle>
                    <div className="error-log-email mt-5 inactive" style={{color: 'red'}}>Ya existe un usuario con ese email</div>
                </div>
               <Form className="signup-form"  onSubmit={this.handleSubmit}>
                   
                    <Row>
                        <Col>
                            <Form.Control name="name" onChange={this.handleChange} placeholder="Nombre" required />
                        </Col>
                        <Col>
                            <Form.Control name="lastname" onChange={this.handleChange} placeholder="Apellido" required />
                        </Col>
                    </Row>
                    <Form.Group controlId="formBasicEmail">
                    <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    </InputGroup.Prepend>
                        <Form.Control onChange={this.handleChange} type="email" name="email" placeholder="Ingresá tu Email email" required />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control onChange={this.handleChange} type="password" name="password" placeholder="Contraseña" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control onChange={this.handleChange} type="password" name="repassword" placeholder="Reingresá tu contraseña" required />
                        <div className="error-log inactive mt-1">Las contraseñas no coinciden</div>
                    </Form.Group>
                    <Form.Group>
            <Form.Check
              required
              name="terms"
              label="Acepto los términos y condiciones"
              id="validationFormik106"
            />
          </Form.Group>
                    <div className="form-button">
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
