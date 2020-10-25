import React, { Component } from "react";
import { form } from "bootstrap";
import {Row,Col,InputGroup,Form,Button,Card,FormControl} from 'react-bootstrap';
import './login.css'


export default class Login extends Component{
constructor(props){
    super(props);
    this.state={password:"password"}
    this.cambiarDeEstado = this.cambiarDeEstado.bind(this);
}
 cambiarDeEstado(){
    if(this.state.password=="password"){
        this.setState({password:''})
    }
else{
this.setState({password:'password'})
}
}

    render(){
    return(
    <div className="login">
        <Card  className="card">
                 <Card.Title className="title">Linked UNQ</Card.Title>
                <Form variant="secondary" className="form">
                    <Form.Group controlId="formBasicEmail">
                        <InputGroup className="mb-2" >
                            <InputGroup.Prepend >
                                <InputGroup.Text>@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl className="input"   placeholder="Username" / >
                         </InputGroup>
                     </Form.Group>
                <Form.Group controlId="formBasicPassword" style={{marginTop:"30px"}}>
                        <InputGroup className="mb-2" >
                            <InputGroup.Prepend >
                                <InputGroup.Text> 🔒 </InputGroup.Text>
                             </InputGroup.Prepend>
                             <Form.Control className="input" type={this.state.password} placeholder={this.state.password} />
                        </InputGroup>
                 </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Text className="text-muted">Nunca revele su contraseña </Form.Text>
                        <Form.Check className="myCheckbox"  label="Mostrar contraseña" onChange={this.cambiarDeEstado} style={{marginTop:"30px"}} />
                    </Form.Group>
                 </Form>
                <Button variant="danger">Iniciar sesion</Button>
         </Card>
</div>

    )   }

}