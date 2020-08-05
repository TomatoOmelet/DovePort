import React, {useState, useContext, useEffect, Fragment} from 'react'
import {NavLink} from "react-router-dom"
import {navbarStrings} from "../../resource/text/UItext"
import AuthContext from '../../context/auth/authContext'


const Navbar = () => {
    const authContext = useContext(AuthContext);
    const {loadUser, user, token, isAuthenticated} = authContext;

    useEffect(() => {
        if(!isAuthenticated)
        {
            loadUser();
        }
        
    }, [])

    function useForceUpdate(){
        const [index, setIndex] = useState(1); // integer state
        return () => setIndex(index===1?2:1); // update the state to force render
    }
    const forceUpdate = useForceUpdate();
    
    const authLink = (
        <Fragment>
            <li className={`left ${window.location.pathname=== process.env.PUBLIC_URL + "/"?"currentPage":undefined}`}>
                <NavLink to = {process.env.PUBLIC_URL + "/"} onClick={forceUpdate}>{navbarStrings.explore}</NavLink>
            </li>
            <li className={`left ${window.location.pathname=== process.env.PUBLIC_URL + "/search"?"currentPage":undefined}`}>
                <NavLink to = {process.env.PUBLIC_URL + "/search"} onClick={forceUpdate}>{navbarStrings.search}</NavLink>
            </li>
            {user&&user.username&&
            <li className={`right ${window.location.pathname=== process.env.PUBLIC_URL + "/profile"?"currentPage":undefined}`}>
                <NavLink to = {process.env.PUBLIC_URL + "/profile"} onClick={forceUpdate}>{user.username}</NavLink>
            </li>}
        </Fragment>
    )

    const unauthLink = (
        <Fragment>
            <li className={`right ${window.location.pathname=== process.env.PUBLIC_URL + "/login"?"currentPage":undefined}`}>
                <NavLink to = {process.env.PUBLIC_URL + "/login"} onClick={forceUpdate}>{navbarStrings.login}</NavLink>
            </li>
            <li className={`right ${window.location.pathname=== process.env.PUBLIC_URL + "/register"?"currentPage":undefined}`}>
                <NavLink to = {process.env.PUBLIC_URL + "/register"} onClick={forceUpdate}>{navbarStrings.register}</NavLink>
            </li>
        </Fragment>
    )

    return (
        <ul className="navigation">
            <div className="container">
                {isAuthenticated?authLink:unauthLink}
            </div>
        </ul>

    )
}

export default Navbar