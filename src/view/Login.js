import React, { Component } from "react";
import { form } from "bootstrap";
import {Row,Col,InputGroup,Form,Button,Card,FormControl} from 'react-bootstrap';
import './login.css'
import axios from "axios"
import  { Redirect } from 'react-router-dom'
export default class Login extends Component{
constructor(props){

    super(props);
    this.state={username:"username",password:"password"}
    this.cambiarDeEstado = this.cambiarDeEstado.bind(this);
    this.iniciarSesion=this.iniciarSesion.bind(this);
    this.handleChange = this.handleChange.bind(this);

}
 cambiarDeEstado(){
    if(this.state.password=="password"){
        this.setState({password:''})
    }
else{
this.setState({password:'password'})
}
}

  handleChange(event) {
      this.setState({[event.target.name] : event.target.value});
    };


iniciarSesion(e) {
e.preventDefault();

const header={  'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
                 }

    axios.post('http://localhost:8080/login',
                {username:this.state.username.replace(/ /g, ""),password:this.state.password.replace(/ /g, "")},header)
        .then(response =>this.props.history.push('/home')).catch(error=>{alert("Usuario incorrecto")});
}
    render(){
    return(
    <div className="login">
        <Card className="login-card">
                 <Card.Title className="title">Linked UNQ</Card.Title>
                <Form variant="secondary" className="form" onSubmit={this.iniciarSesion}>
                    <Form.Group controlId="formBasicEmail">
                        <InputGroup className="mb-2" >
                            <InputGroup.Prepend >
                                <InputGroup.Text>@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl className="input" name="username"placeholder={this.state.username}  onChange={this.handleChange} / >
                         </InputGroup>
                     </Form.Group>
                <Form.Group controlId="formBasicPassword" style={{marginTop:"30px"}}>
                        <InputGroup className="mb-2" >
                            <InputGroup.Prepend >
                                <InputGroup.Text> 🔒 {this.state.username}</InputGroup.Text>
                             </InputGroup.Prepend>
                             <Form.Control className="input" type={this.state.password} placeholder={this.state.password} onChange={this.handleChange} />
                        </InputGroup>
                 </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Text className="text-muted">Nunca revele su contraseña </Form.Text>
                        <Form.Check className="myCheckbox"  label="Mostrar contraseña" onChange={this.cambiarDeEstado} style={{marginTop:"30px"}} />
                    </Form.Group>
                 <Button variant="danger" onClick={this.iniciarSesion}>Iniciar sesion</Button>
                 </Form>

         </Card>
</div>

    )   }

}