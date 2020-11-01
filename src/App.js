import React from 'react';
import './App.css';
import Login from'./views/Login'
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './views/SignUp'
import Home from './views/Home'


function App() {
  return (
        <Router>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </Router>
  );
}

export default App;