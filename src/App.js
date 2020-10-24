import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './views/SignUp'


function App() {
  return (
    <div class="container">
        <Router>
          <Route exact path="/" component={SignUp} />
      </Router>
    </div>

  );
}

export default App;