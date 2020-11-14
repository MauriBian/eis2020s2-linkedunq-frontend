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
          enlace: '',
          imagen: '',
          desde: new Date(),
          hasta: new Date(),
          actualidad: false,
          editMode: false,
          jobId: 0,
          updateCallback: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.setStartDate = this.setStartDate.bind(this)
        this.setEndDate = this.setEndDate.bind(this)
        this.setActualDate = this.setActualDate.bind(this)
        this.setEditData = this.setEditData.bind(this)
        this.resetState = this.resetState.bind(this)
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

    setActualDate(){
      this.setState({
        actualidad: !this.state.actualidad
      })
    }

    handleSubmit () {
      const header={  'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
                 }
      const parseStartDate = this.state.desde !== '' ?  this.state.desde.getFullYear() + '-'  + this.add0ToDate(this.state.desde.getMonth()) + '-' + this.add0ToDate(this.state.desde.getDate()) : null
      let parseEndDate =  this.state.hasta !== ''  ? this.state.hasta.getFullYear() + '-'  + this.add0ToDate(this.state.hasta.getMonth()) + '-' + this.add0ToDate(this.state.hasta.getDate()) : null
      parseEndDate = this.state.actualidad ? '9999-12-31' : parseEndDate
      if (!this.state.editMode){
        axios.post('http://localhost:8080/jobs/create',
                  {username:localStorage.getItem('username'),
                  titulo:this.state.titulo,
                  descripcion:this.state.descripcion,
                  enlace: this.state.enlace,
                  urlImagen: this.state.imagen,
                  fechaInicioTrabajo: parseStartDate ? parseStartDate: parseStartDate,
                  fechaFinTrabajo: parseEndDate ? parseEndDate : parseEndDate,
                  },header).then(this.props.onHide()).catch(elem => alert('Las fechas no pueden estar vacias'))
      } else {
        const url = `http://localhost:8080/jobs/edit?username=${localStorage.getItem('username')}&id=${this.state.jobId}`
        const jobBody = {
          username:localStorage.getItem('username'),
          titulo:this.state.titulo,
          descripcion:this.state.descripcion,
          enlace: this.state.enlace,
          urlImagen: this.state.imagen,
          fechaInicioTrabajo: parseStartDate ? parseStartDate: parseStartDate,
          fechaFinTrabajo: parseEndDate ? parseEndDate : parseEndDate
        }
        axios.post(url, jobBody,header)
        .then((res) => {
          this.state.updateCallback(jobBody, this.state.jobId)
          this.resetState()
        })
        .catch(elem => alert('Las fechas no pueden estar vacias', elem))
      }
    }

    add0ToDate (date) {
      if (parseInt(date) <= 9) {
        return '0'+ date
      }
      else {
        return date
      }
    }

    setEditData (data, callback) {
      this.setState({
        jobId: data.id,
        titulo: data.titulo,
        descripcion: data.descripcion,
        desde: new Date (data.fechaInicioTrabajo),
        enlace: data.enlace,
        imagen: data.imagen,
        hasta: data.fechaFinTrabajo == '9999-12-31' ? '' : new Date (data.fechaFinTrabajo),
        actualidad: data.fechaFinTrabajo == '9999-12-31',
        editMode: true,
        updateCallback: callback
      })
    }

    resetState () {
      this.setState({
          titulo: '',
          descripcion:'',
          enlace: '',
          imagen: '',
          desde: new Date(),
          hasta: new Date(),
          actualidad: false,
          editMode: false,
          jobId: 0,
          updateCallback: null
      })
    }

    render(){
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            ref="modal"
          >
            <div className="addjob-modal">
            <Modal.Header className="addjob-modal-header">
              <Modal.Title className="addjob-modal-title" id="contained-modal-title-vcenter">
              {this.state.editMode? 'Editar' : 'Agregar'} Trabajo
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="modal-form">
                  <FormGroup>
                    <Form.Label className="modal-form-title" >Titulo</Form.Label>
                    <Form.Control value={this.state.titulo} name="titulo" onChange={this.handleChange} placeholder="Título del trabajo" />
                  </FormGroup>
                  <FormGroup>
                    <Form.Label className="modal-form-title" >Descripción</Form.Label>
                    <Form.Control value={this.state.descripcion} name="descripcion" onChange={this.handleChange} placeholder="Descripción" />
                  </FormGroup>
                  <FormGroup>
                    <Form.Label className="modal-form-title" >Enlace de referencia</Form.Label>
                    <Form.Control value={this.state.enlace} name="enlace" onChange={this.handleChange} placeholder="Ingrese una URL" />
                  </FormGroup>
                  <FormGroup>
                  <Row>
                        <Col>
                            <Form.Label className="modal-form-title">Fecha de inicio</Form.Label>
                            <DatePicker value={this.state.fechaInicioTrabajo} selected={this.state.desde} onChange={date => this.setStartDate(date)} />
                            
                        </Col>
                        <Col>
                            <Form.Label className="modal-form-title">Fecha de finalización</Form.Label>
                            <DatePicker value={this.state.fechaFinTrabajo} disabled={this.state.actualidad} className="modal-datepicker" selected={this.state.hasta} onChange={date => this.setEndDate(date)} />
                            <Form.Check
                              checked={this.state.actualidad}
                              label="Actualidad"
                              className="modal-checkbox"
                              onChange={this.setActualDate}
                          />
                        </Col>
                    </Row>
                  </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
              <Button onClick={this.handleSubmit} >{this.state.editMode? 'Editar' : 'Agregar'}</Button>
              <Button className="modal-close-button" onClick={this.props.onHide()}>Cerrar</Button>
            </Modal.Footer>  
            </div>
          </Modal>
          );
    }
}
