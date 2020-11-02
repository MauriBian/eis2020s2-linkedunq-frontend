import React, { Component } from "react";
import '../style/addjobmodal.css'
import axios from "axios"
import {Modal, Button, Form, FormGroup, Row, Col} from "react-bootstrap"
export default class AddJobModal extends React.Component{

    constructor(props){
        super(props)
        this.state = {
          titulo: '',
          descripcion:'',
          desde:'',
          hasta:''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
      this.setState({ [e.target.name] : e.target.value })
    }

    handleSubmit () {
      const header={  'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
                 }

    axios.post('http://localhost:8080/jobs/create',
                {username:localStorage.getItem('username').replace(/ /g, ""),
                titulo:this.state.titulo.replace(/ /g, ""),
                descripcion:this.state.descripcion.replace(/ /g, ""),
                fechaInicioTrabajo:this.state.desde.replace(/ /g, ""),
                fechaFinTrabajo:this.state.hasta.replace(/ /g, ""),
                },header).then(this.props.onHide())
    }

    render(){
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <div className="addjob-modal">
            <Modal.Header className="addjob-modal-header">
              <Modal.Title className="addjob-modal-title" id="contained-modal-title-vcenter">
                Agregar Trabajo
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="modal-form">
                  <FormGroup>
                    <Form.Label className="modal-form-title" >Titulo</Form.Label>
                    <Form.Control name="titulo" onChange={this.handleChange} placeholder="Título del trabajo" />
                  </FormGroup>
                  <FormGroup>
                    <Form.Label className="modal-form-title" >Descripción</Form.Label>
                    <Form.Control name="descripcion" onChange={this.handleChange} placeholder="Descripción" />
                  </FormGroup>
                  <FormGroup>
                  <Row>
                        <Col>
                            <Form.Label className="modal-form-title">Fecha de inicio</Form.Label>
                            <Form.Control name="desde" onChange={this.handleChange} placeholder="Desde" required />
                            
                        </Col>
                        <Col>
                            <Form.Label className="modal-form-title">Fecha de finalización</Form.Label>
                            <Form.Control name="hasta" onChange={this.handleChange} placeholder="Hasta" required />
                        </Col>
                    </Row>
                  </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
              <Button onClick={this.handleSubmit} >Agregar</Button>
              <Button className="modal-close-button" onClick={this.props.onHide()}>Cerrar</Button>
            </Modal.Footer>  
            </div>
          </Modal>
          );
    }
}
