import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import './App.css';
import NavBar from './components/layout/NavBar';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"

import AuthState from "./context/auth/AuthState"
import UserState from "./context/user/UserState"
import AlertState from "./context/alert/AlertState"
import PrivateRoute from './components/routing/PrivateRoute';
import Search from './components/pages/Search/Search';
import Profile from './components/pages/Profile';


function App() {
  return (
    <AlertState>
    <AuthState>
    <UserState>
    <BrowserRouter>
      <NavBar/>
      
      <div className="container">
        <Alert/>
        <Switch>
          <PrivateRoute exact path = {process.env.PUBLIC_URL + "/"} component={Home}/>
          <Route exact path = {process.env.PUBLIC_URL + "/login"} component={Login}/>
          <Route exact path = {process.env.PUBLIC_URL + "/register"} component={Register}/>
          <PrivateRoute exact path = {process.env.PUBLIC_URL + "/search"} component={Search}/>
          <PrivateRoute exact path = {process.env.PUBLIC_URL + "/profile"} component={Profile}/>
          <PrivateRoute component={Home}/>
        </Switch>
      </div>
    </BrowserRouter>
    </UserState>
    </AuthState>
    </AlertState>
  );
}

export default App;
