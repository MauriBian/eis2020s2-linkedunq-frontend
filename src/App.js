import React from 'react';
import './App.css';
import Home from './components/Home'
import Login from'./components/Login'
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
    </Router>
  );
}

export default App;