
import { CardDeck,Button,Form,Row,Col } from "react-bootstrap";


import React, { Component } from "react";
import JobCard from '../components/JobCard.jsx'
import TopBar from '../components/TopBar.jsx'
import LinkBar from '../components/LinkBar.tsx'

import '../style/home.css'
import axios from "axios"
import AddJobModal from '../components/AddJobModal.jsx'
import { faBars, faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
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
          editData: {},
          editTitle: false,
          inputTitle: '',
          title:''
        }
        this.handleJobs = this.handleJobs.bind(this)
        this.setModalShow = this.setModalShow.bind(this);
        this.actualizar=this.actualizar.bind(this)
        this.setModalShow = this.setModalShow.bind(this)
        this.editModalShow = this.editModalShow.bind(this)
        this.updateJobData = this.updateJobData.bind(this)
        this.modal = React.createRef()
        this.editTitle = this.editTitle.bind(this)
        this.cancelEdit = this.cancelEdit.bind(this)
        this.confirmEditTitle = this.confirmEditTitle.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async confirmEditTitle() {
      await this.setState({
        title: this.state.inputTitle
      })
      console.log(this.state.title)
      await axios.put('http://localhost:8080/title', {
        username: localStorage.getItem('username'),
        title: this.state.title
      })
      this.cancelEdit()
    }

    handleChange (e) {
      this.setState({ [e.target.name] : e.target.value })
    }

    async cancelEdit () {
      this.setState({
        editTitle: false
      })
    }

    async editTitle() {
      this.setState({
        editTitle: !this.state.editTitle
      })
    }

    async setModalShow() {
      this.setState({
        modalShow: !this.state.modalShow
      })
      const sortType = 'priority'
      console.log('http://localhost:8080/jobs?username=' + localStorage.getItem('username') + "&sortBy=" + sortType)
      const jobs = await axios.get('http://localhost:8080/jobs?username=' + localStorage.getItem('username') + "&sortBy=" + sortType) //Turn On
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
              const sortType = 'priority'
              const jobs = await axios.get('http://localhost:8080/jobs?username=' + localStorage.getItem('username') + "&sortBy=" + sortType)
                    this.handleJobs(jobs.data)
                alert("Trabajo eliminado")

   }
    async componentDidMount() {
      try { 
        const sortType = 'priority'
        console.log('http://localhost:8080/jobs?username=' + localStorage.getItem('username') + "&sortBy=" + sortType)
        const jobs = await axios.get('http://localhost:8080/jobs?username=' + localStorage.getItem('username') + "&sortBy=" + sortType)   //{data: [{titulo: 'One titulo', descripcion: 'one description',  fechaInicioTrabajo: new Date(), fechaFinTrabajo: new Date()}]}  //Turn On
        /*const title = await axios.get('http://localhost:8080/title/' + localStorage.getItem('username'))// 'Un titulo' //Turn On
        this.setState({
          title: title.data
        })*/
        this.handleJobs(jobs.data)
      } catch (e) {
        console.log(e)
      }
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
              <div className="home_title">
                {
                  !this.state.editTitle ? <h1 className="home_title_text" onDoubleClick={this.editTitle}>{this.state.title}</h1> :
                    <Form className="formEdit">
                      <Form.Control name="inputTitle" onChange={this.handleChange} value={this.state.inputTitle} className="edit-input" placeholder="Title" />
                      <Button onClick={this.confirmEditTitle} className="edit-button"><FontAwesomeIcon icon={faCheck} size="lg"> </FontAwesomeIcon></Button>
                      <Button onClick={this.cancelEdit} className="edit-button"><FontAwesomeIcon icon={faTimes} size="lg"> </FontAwesomeIcon></Button>
                    </Form>
                }
              </div>
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
                      return <JobCard id={elem.id} key={index} clickHandler={this.actualizar} updatefunction={this.updateJobData} editfunction={() => { this.editModalShow(elem) }} link={elem.enlace} title={elem.titulo} image={elem.urlImagen} text={elem.descripcion} footer={elem.fechaInicioTrabajo + ' - ' + (elem.fechaFinTrabajo === '9999-12-31' ? 'Actualidad' : elem.fechaFinTrabajo) }></JobCard>
                    })}
                  </CardDeck>
                })
              }

              </div>
          );
    }
}
