import { Button } from "bootstrap";
import React, { Component } from "react";
export default class Home extends React.Component{

    constructor(props){
        super(props)

        // this.setComponent = this.setComponent.bind(this);
    }

    render(){
        return (
            <div className="Home">
                <h1>Hola LinkedUNQ</h1>

                <button className="btn btn-dark">Click</button>
            </div>
          );
    }
}
