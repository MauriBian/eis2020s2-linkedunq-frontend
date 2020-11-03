import { CardDeck,Button } from "react-bootstrap";
import React, { Component } from "react";
import JobCard from '../components/JobCard.jsx'
import TopBar from '../components/TopBar.jsx'
import LinkBar from '../components/LinkBar.tsx'

import '../style/home.css'
import axios from "axios"
import { parseJSON } from "jquery";
export default class Repo extends React.Component{

    constructor(props){
         super(props)
                this.state = {
                  jobs: []
                }
                this.handleJobs = this.handleJobs.bind(this)
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

const jobs = await axios.get('http://localhost:8080/jobs?username=' + this.props.match.params.id.substring(1))
      this.handleJobs(jobs.data);

        }


    render(){
        return (
            <div className="home_container">
{
                this.state.jobs.map( (deck,index) => {
                  return <CardDeck key={index}>
                    {
                    deck.map ((elem, index) => {
                      return <JobCard title={elem.titulo} text={elem.descripcion} footer={elem.fechaInicioTrabajo + ' - ' + elem.fechaFinTrabajo}></JobCard>
                    })}
                  </CardDeck>
                })
              }

              </div>
          );
    }
}
