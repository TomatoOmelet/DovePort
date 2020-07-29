import React, {useContext} from 'react'
import PropTypes from "prop-types"
import AuthContext from "../../../context/auth/authContext"
import UserContext from "../../../context/user/userContext"
import {searchPageStrings} from "../../../resource/text/UItext"


const UserSearchResult = (props) => {
    const {id, username, name} = props.user; 
    const authContext = useContext(AuthContext)
    const alreadyFollowed = authContext.user.followings.includes(id);

    const userContext = useContext(UserContext)
    const {followUser, unfollowUser} = userContext;

    const followButton = ()=>{
        if(alreadyFollowed)
        {
            unfollowUser(id);
        }else{
            followUser(id);
        }
    }

    const buttonValue = alreadyFollowed?searchPageStrings.following:searchPageStrings.follow;

    return (
        <div className="card">
            <div className="card-body">
                <p><strong style={{fontSize:"25px"}}>{name}</strong>@{username}</p>
                {id!==authContext.user.id&&
                <input type="submit" value={buttonValue} 
                onClick={followButton} className={`btn ${alreadyFollowed?"btn-info":"btn-primary"}`}/>}
            </div>
        </div>
    )
}


UserSearchResult.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserSearchResult
