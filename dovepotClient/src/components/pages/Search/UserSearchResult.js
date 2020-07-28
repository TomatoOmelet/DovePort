import React, {useContext} from 'react'
import PropTypes from "prop-types"
import axios from "axios"
import {serverAddress} from "../../../context/properties"
import AuthContext from "../../../context/auth/authContext"
import {searchPageStrings} from "../../../resource/text/UItext"


const UserSearchResult = (props) => {
    const {id, username, name} = props.user; 
    const authContext = useContext(AuthContext)
    const alreadyFollowed = authContext.user.followings.includes(id);

    return (
        <div className="card">
            <div className="card-body">
                <p><strong style={{fontSize:"25px"}}>{name}</strong>@{username}</p>
                <input type="submit" value={alreadyFollowed?searchPageStrings.following:searchPageStrings.follow} 
                                className={`btn ${alreadyFollowed?"btn-info":"btn-primary"}`}/>
            </div>
        </div>
    )
}


UserSearchResult.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserSearchResult
