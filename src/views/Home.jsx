
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
          modalShow: false
        }
        
        this.handleJobs = this.handleJobs.bind(this)
        this.setModalShow = this.setModalShow.bind(this);
    }

    async setModalShow() {
      this.setState({
        modalShow: !this.state.modalShow
      })
      const jobs = await axios.get('http://localhost:8080/jobs?username=' + localStorage.getItem('username'))
      this.handleJobs(jobs.data)
    }

    handleJobs (jobs) {
      const parsedJobs = []
      jobs.forEach( (elem, index) => {
        if (index % 4 === 0) {
          parsedJobs.push([elem])
        } else {
          parsedJobs[Math.floor(index/4)].push(elem)
        }
      })
      this.setState({
        jobs: parsedJobs
      })
    }

    async componentDidMount() {
      const jobs = await axios.get('http://localhost:8080/jobs?username=' + localStorage.getItem('username'))
      this.handleJobs(jobs.data)
      console.log(jobs.data)
    }

    render(){
        return (
            <div className="home_container">

              <TopBar openModal={this.setModalShow} sideBar={this.sideBarRef}></TopBar>
              <Button  onClick={this.setModalShow} className="add-job"> <FontAwesomeIcon icon={faPlus} size="lg"> </FontAwesomeIcon></Button>
              <AddJobModal
                show={this.state.modalShow}
                onHide={() => this.setModalShow}
              />

              {
                this.state.jobs.map( (deck,index) => {
                  return <CardDeck key={index}>
                    {
                    deck.map ((elem, index) => {
                      return <JobCard key={index} title={elem.titulo} text={elem.descripcion} footer={elem.fechaInicioTrabajo + ' - ' + (elem.fechaFinTrabajo === '9999-12-31' ? 'Actualidad' : elem.fechaFinTrabajo) }></JobCard>
                    })}
                  </CardDeck>
                })
              }
              </div>
          );
    }
}
