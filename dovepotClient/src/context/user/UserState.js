import React, {useReducer, useContext} from "react";
import axios from "axios" ;
import UserReducer from "./userReducer";
import AlertContext from "../alert/alertContext"
import {serverAddress} from "../properties"
import AuthContext from "../auth/authContext";
import UserContext from "./userContext"

const UserState = (props)=>{

    const alertContext = useContext(AlertContext);
    const {setAlert, clearAlert} = alertContext;
    const authContext = useContext(AuthContext);
    const {loadUser} = authContext;

    const initialState = {

    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    //follow User
    const followUser = async (id)=>{
        try {
            await axios.post(`${serverAddress}/api/users/follow/${id}`);
            loadUser();
        } catch (error) {
            console.error(error.message)
        }
    }

    //follow User
    const unfollowUser = async (id)=>{
        try {
            await axios.post(`${serverAddress}/api/users/unfollow/${id}`);
            loadUser();
        } catch (error) {
            console.error(error.message)
        }
    }

    return(
        <UserContext.Provider value = {{
            followUser,
            unfollowUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;