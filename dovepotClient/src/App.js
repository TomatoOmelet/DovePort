import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import './App.css';
import NavBar from './components/layout/NavBar';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"

import AuthState from "./context/auth/AuthState"
import AlertState from "./context/alert/AlertState"


function App() {
  return (
    <AlertState>
    <AuthState>
    <BrowserRouter>
      <NavBar/>
      
      <div className="container">
        <Alert/>
        <Switch>
          <Route exact path = {process.env.PUBLIC_URL + "/"} component={Home}/>
          <Route exact path = {process.env.PUBLIC_URL + "/login"} component={Login}/>
          <Route exact path = {process.env.PUBLIC_URL + "/register"} component={Register}/>
          <Route component={Home}/>
        </Switch>
      </div>
    </BrowserRouter>
    </AuthState>
    </AlertState>
  );
}

export default App;
