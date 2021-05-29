import logo from './logo.svg';
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Pokemon from './components/Pokemon'
import NotFound from './components/NotFound'
import Main from './components/Main'
import axios from "axios"
import { useEffect, useState } from "react";
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/pokemon/:id" component={Pokemon}/>
          <Route exact path="/*" component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
