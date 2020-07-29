import React,{useContext, useState} from 'react'
import {profilePageStrings} from "../../../resource/text/UItext"
import AuthContext from '../../../context/auth/authContext'
import { UserList } from './UserList';

const Profile = () => {
    const authContext = useContext(AuthContext);
    const [state, setState] = useState({mode:"none", info:[]});
    const {logout, user} = authContext;

    const showFollowers=async()=>{
        
        setState("followers");
    }

    if(user)
    {
        const {name, username, followers, followings} = authContext.user;

        return (
            <div className="row">
                <div className="col">
                    <h3 style={{display:"inline"}}>{name}</h3><p>@{username}</p>
                    <button type="submit" className="btn btn-primary" onClick={()=>setState("followings")}>{profilePageStrings.followings}:{followings.length}</button>
                    <br/><br/>
                    <button type="submit" className="btn btn-primary" onClick={()=>setState("followers")}>{profilePageStrings.followers}:{followers.length}</button>
                    <br/><br/>
                    <button type="submit" className="btn btn-danger" onClick={logout}>{profilePageStrings.logOut}</button>
                </div>

                <div className="row">
                {state.mode==="followers"&&<UserList/>}
                {state.mode==="followings"&&<UserList/>}
                </div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}

export default Profile
