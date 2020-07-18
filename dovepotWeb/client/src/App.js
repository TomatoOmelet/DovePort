import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import './App.css';
import NavBar from './components/layout/NavBar';
import Home from './components/layout/Home';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <div className="container">
        
        <Switch>
          <Route exact path = {process.env.PUBLIC_URL + "/"} component={Home}/>
          <Route component={Home}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
