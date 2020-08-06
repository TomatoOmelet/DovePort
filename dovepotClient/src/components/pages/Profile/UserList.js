import React, { Fragment } from 'react'
import PropTypes from "prop-types"
import UserSearchResult from '../Search/UserInfo'
import PagingBar from '../../layout/PagingBar'

export const UserList = ({users, emptyMessage}) => {
    
    return (
        <div>
            {/**content*/}
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