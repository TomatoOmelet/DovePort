import React from 'react'
import PropTypes from "prop-types"
import UserSearchResult from '../Search/UserInfo'

export const UserList = ({users, emptyMessage}) => {
    return (
        <div>
            {users.length <= 0?<p>{emptyMessage}</p>:
            users.map((user, index) => {
                return <UserSearchResult key={index} user={user}/>
            })}
        </div>
    )
}

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    emptyMessage: PropTypes.string.isRequired
}