import React,{useContext, useState} from 'react'
import {profilePageStrings} from "../../../resource/text/UItext"
import AuthContext from '../../../context/auth/authContext'
import UserContext from '../../../context/user/userContext'
import { UserList } from './UserList';

const Profile = () => {
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const [state, setState] = useState({mode:"none", info:[]});
    const {logout, user} = authContext;
    const {getFollowings, getFollowers} = userContext;

    const showFollowers=async()=>{
        try{
            const followers = await getFollowers(user.id);
            setState({mode:"followers", info:followers});
            console.log(followers)
        }catch(e){
            console.error(e.message)
        }

    }

    const showFollowings=async()=>{
        try{
            const followings = await getFollowings(user.id);
            setState({mode:"followings", info:followings});
            console.log(followings)
        }catch(e){
            console.error(e.message)
    }
    }

    if(user)
    {
        const {name, username, followers, followings} = authContext.user;

        return (
            <div className="row">
                <div className="col">
                    <h3 style={{display:"inline"}}>{name}</h3><p>@{username}</p>
                    <button type="submit" className="btn btn-primary" onClick={showFollowings}>{profilePageStrings.followings}:{followings.length}</button>
                    <br/><br/>
                    <button type="submit" className="btn btn-primary" onClick={showFollowers}>{profilePageStrings.followers}:{followers.length}</button>
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
