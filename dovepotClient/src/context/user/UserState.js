import React, {useReducer, useContext} from "react";
import axios from "axios" ;
import UserReducer from "./userReducer";
import AlertContext from "../alert/alertContext"
import {serverAddress} from "../properties"
import AuthContext from "../auth/authContext";
import UserContext from "./userContext"

const UserState = (props)=>{

    const alertContext = useContext(AlertContext);
    const {setAlert, setAlertWithError} = alertContext;
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
            setAlertWithError(error);
        }
    }

    //follow User
    const unfollowUser = async (id)=>{
        try {
            await axios.post(`${serverAddress}/api/users/unfollow/${id}`);
            loadUser();
        } catch (error) {
            console.error(error.message)
            setAlertWithError(error);
        }
    }

    const getFollowers = async(id, page = 1, entries_each_page = 10) =>{
        try {
            const res = await axios.get(`${serverAddress}/api/users/followers/${id}?page=${page}&entries_each_page=${entries_each_page}`);
            return res.data
        } catch (error) {
            console.error(error.message)
            setAlertWithError(error);
        }
    }

    const getFollowings = async(id, page = 1, entries_each_page = 10) =>{
        try {
            const res = await axios.get(`${serverAddress}/api/users/followings/${id}?page=${page}&entries_each_page=${entries_each_page}`);
            return res.data
        } catch (error) {
            console.error(error.message)
            setAlertWithError(error);
        }
    }

    return(
        <UserContext.Provider value = {{
            followUser,
            unfollowUser,
            getFollowers,
            getFollowings
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;