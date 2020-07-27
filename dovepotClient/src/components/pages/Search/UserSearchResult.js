import React from 'react'
import PropTypes from "prop-types"

const UserSearchResult = (props) => {
    const {id, username, name} = props.user; 
    return (
        <div className="card">
            <div className="card-body">
                <h4>{name}</h4>
                <p>@{username}</p>
            </div>
        </div>
    )
}


UserSearchResult.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserSearchResult
