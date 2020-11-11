
import { CardDeck,Button } from "react-bootstrap";


import React, { Component } from "react";
import JobCard from '../components/JobCard.jsx'
import TopBar from '../components/TopBar.jsx'
import LinkBar from '../components/LinkBar.tsx'

import '../style/home.css'
import axios from "axios"
import AddJobModal from '../components/AddJobModal.jsx'
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Home extends React.Component{

    constructor(props){
        super(props)
        this.sideBarRef = React.createRef();
        this.state = {
          jobs: [],
          sidebarOpen: true,
          modalShow: false,
          alerta:"",
          claseAlerta:"",
          editData: {}
        }
        this.handleJobs = this.handleJobs.bind(this)
        this.setModalShow = this.setModalShow.bind(this);
        this.actualizar=this.actualizar.bind(this)
        this.setModalShow = this.setModalShow.bind(this)
        this.editModalShow = this.editModalShow.bind(this)
        this.updateJobData = this.updateJobData.bind(this)
        this.modal = React.createRef()
    }

    async setModalShow() {
      this.setState({
        modalShow: !this.state.modalShow
      })
      const jobs = await axios.get('http://localhost:8080/jobs?username=' + localStorage.getItem('username'))
      this.handleJobs(jobs.data)
    }

    async editModalShow(data) {
      this.setState({
        modalShow: !this.state.modalShow
      })
      this.modal.current.setEditData(data, this.updateJobData)
      // const jobs = await axios.get('http://localhost:8080/jobs?username=' + localStorage.getItem('username'))
      // this.handleJobs(jobs.data)
    }

    async handleJobs (jobs) {
      const parsedJobs = []
      jobs.forEach( (elem, index) => {
        if (index % 4 === 0) {
          parsedJobs.push([elem])
        } else {
          parsedJobs[Math.floor(index/4)].push(elem)
        }
      })
      await this.setState({
        jobs: parsedJobs
      })
    }



   async actualizar(){
              const jobs = await axios.get('http://localhost:8080/jobs?username=' + localStorage.getItem('username'))
                    this.handleJobs(jobs.data)
                alert("Trabajo eliminado")

   }
    async componentDidMount() {
      const jobs = await axios.get('http://localhost:8080/jobs?username=' + localStorage.getItem('username')) // {data: [{titulo: 'One titulo', descripcion: 'one description', fechaInicioTrabajo: new Date(), fechaFinTrabajo: new Date()}]} 
      this.handleJobs(jobs.data)
    }

    async updateJobData (job, jobId) {
      this.setState({
        modalShow: !this.state.modalShow
      })
      const jobs = await axios.get('http://localhost:8080/jobs?username=' + localStorage.getItem('username'))
      this.handleJobs(jobs.data)
      this.setState({
        modalShow: false
      })
      window.location.reload()
    }
    render(){
        return (
            <div className="home_container">

              <TopBar openModal={this.setModalShow} sideBar={this.sideBarRef}></TopBar>
              <Button  onClick={this.setModalShow} className="add-job"> <FontAwesomeIcon icon={faPlus} size="lg"> </FontAwesomeIcon></Button>
              <AddJobModal
                show={this.state.modalShow}
                onHide={() => this.setModalShow}
                ref={this.modal}
              />

              {
                this.state.jobs.map( (deck,index) => {
                  return <CardDeck key={index}>
                    {
                    deck.map ((elem, index) => {
                      return <JobCard id={elem.id} key={index} clickHandler={this.actualizar} updatefunction={this.updateJobData} editfunction={() => { this.editModalShow(elem) }} link={elem.enlace} title={elem.titulo} text={elem.descripcion} footer={elem.fechaInicioTrabajo + ' - ' + (elem.fechaFinTrabajo === '9999-12-31' ? 'Actualidad' : elem.fechaFinTrabajo) }></JobCard>
                    })}
                  </CardDeck>
                })
              }

              </div>
          );
    }
}
