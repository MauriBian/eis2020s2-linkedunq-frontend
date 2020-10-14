import React from 'react';
import './App.css';
import Home from './components/Home'
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  );
}

export default App;