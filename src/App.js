import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './views/SignUp'
import Home from './views/Home'


function App() {
  return (
    <div className="container">
        <Router>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/home" component={Home} />
      </Router>
    </div>

  );
}

export default App;