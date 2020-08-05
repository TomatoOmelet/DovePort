import React, {useReducer, useContext} from "react";
import axios from "axios" ;
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import AlertContext from "../alert/alertContext"
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from "../types";
import {serverAddress} from "../properties"

const AuthState = (props)=>{

    const alertContext = useContext(AlertContext);
    const {setAlert, clearAlert} = alertContext;

    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        user: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load User
    const loadUser = async ()=>{
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get(`${serverAddress}/api/auth`);
            dispatch({type:USER_LOADED, payload:res.data})
        } catch (error) {
            console.error(error.message)
            dispatch({type:AUTH_ERROR})
        }
    }

    //Reguster User
    const register= async (formData)=>{
        const config = {
            headers:{"ContentType":"application/json"}
        };

        try {
            const res = await axios.post(`${serverAddress}/api/users`, formData, config);
            dispatch({type:REGISTER_SUCCESS, payload:res.data})  
            loadUser();
        } catch (error) {
            console.error(error.message)
            clearAlert();
            setAlert(error.response.data)
            dispatch({type:REGISTER_FAIL})
        }
    }

    //Login
    const login = async (formData) => {
        const config = {
           headers:{"ContentType":"application/json",
                    "Accept":"*/*"}
        };

        try {
            const param = {"username":formData.username, "password" : formData.password}
            const res = await axios.post(`${serverAddress}/authenticate`, param, config);
            dispatch({type:LOGIN_SUCCESS, payload:res.data})
            loadUser();
        } catch (error) {
            console.error(error.message)
            let alert = error.message
            if(error.response && error.response.data)
            {
                alert = error.response.data
            }
            clearAlert();
            setAlert(alert);
            dispatch({type:LOGIN_FAIL})
        }
    }

    //Logout
    const logout = ()=>{
        setAuthToken(null);
        dispatch({type:LOGOUT})
    }

    return(
        <AuthContext.Provider value = {{
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          loading: state.loading,
          user: state.user,
          register,
          login,
          logout,
          loadUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;