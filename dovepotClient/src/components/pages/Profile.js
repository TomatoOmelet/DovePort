import React,{useContext, useEffect} from 'react'
import {profilePageStrings} from "../../resource/text/UItext"
import AuthContext from '../../context/auth/authContext'

const Profile = () => {
    const authContext = useContext(AuthContext);
    const {logout, user} = authContext;

    if(user)
    {
        const {name, username, followers, followings} = authContext.user;

        return (
            <div>
                <p><h3 style={{display:"inline"}}>{name}</h3>@{username}</p>
                <button type="submit" className="btn btn-primary" onClick={logout}>{profilePageStrings.followings}:{followings.length}</button>
                <br/><br/>
                <button type="submit" className="btn btn-primary" onClick={logout}>{profilePageStrings.followers}:{followers.length}</button>
                <br/><br/>
                <button type="submit" className="btn btn-danger" onClick={logout}>{profilePageStrings.logOut}</button>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}

export default Profile
