import React from 'react'
import axios from "axios"
import {Table, Button} from "react-bootstrap"
import '../style/homeRecruiter.css'
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default class HomeRecruiter extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      userList: []
    }
  }

  render () {
    return (
    <div className="home-recruiter__container">
      <h1 className="home-recruiter_title_text">Posibles candidatos</h1>
      <Table className="userTable" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th className="url-portfolio">Portfolio</th>
          </tr>
        </thead>
        <tbody>
          {
           this.state.userList.map( elem => {
             return <tr key={elem.id}>
               <td> {elem.firstName} </td>
               <td> {elem.lastName} </td>
               <td> {elem.email} </td>
               <td className="buttonTd"><Button onClick={() => window.open(elem.link)}> Visitar </Button></td>
              </tr>
           }) 
          }
        </tbody>
      </Table>
    </div>
    )
  }

  async componentDidMount () {
    const response = await axios.get('http://localhost:8080/candidates')
    this.setState({
      userList: response.data
    })
  }
}