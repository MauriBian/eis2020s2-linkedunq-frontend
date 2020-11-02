import React, { Component } from "react";
import '../style/addjobmodal.css'
import axios from "axios"
import {Modal, Button, Form, FormGroup, Row, Col} from "react-bootstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        this.setStartDate = this.setStartDate.bind(this)
        this.setEndDate = this.setEndDate.bind(this)
    }

    handleChange (e) {
      this.setState({ [e.target.name] : e.target.value })
    }

    setStartDate(date) {
      this.setState ({
        desde: date
      })
    }

    setEndDate(date) {
      this.setState ({
        hasta: date
      })
    }

    handleSubmit () {
      const header={  'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
                 }
      const parseStartDate = this.state.desde.getFullYear() + '-'  + this.add0ToDate(this.state.desde.getMonth()) + '-' + this.add0ToDate(this.state.desde.getDate())
      const parseEndDate = this.state.hasta.getFullYear() + '-'  + this.add0ToDate(this.state.hasta.getMonth()) + '-' + this.add0ToDate(this.state.hasta.getDate())
      axios.post('http://localhost:8080/jobs/create',
                {username:localStorage.getItem('username').replace(/ /g, ""),
                titulo:this.state.titulo.replace(/ /g, ""),
                descripcion:this.state.descripcion.replace(/ /g, ""),
                fechaInicioTrabajo: parseStartDate.replace(/ /g, ""),
                fechaFinTrabajo: parseEndDate.replace(/ /g, ""),
                },header).then(this.props.onHide())
    }

    add0ToDate (date) {
      if (parseInt(date) <= 9) {
        return '0'+ date
      }
      else {
        return date
      }
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
                            <DatePicker selected={this.state.desde} onChange={date => this.setStartDate(date)} />
                            
                        </Col>
                        <Col>
                            <Form.Label className="modal-form-title">Fecha de finalización</Form.Label>
                            <DatePicker selected={this.state.hasta} onChange={date => this.setEndDate(date)} />
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
