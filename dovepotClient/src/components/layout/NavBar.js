import React, {useState, useContext, useEffect} from 'react'
import {NavLink} from "react-router-dom"
import {navbarStrings} from "../../resource/text/UItext"
import AuthContext from '../../context/auth/authContext'


const Navbar = () => {
    const authContext = useContext(AuthContext);
    const {loadUser, username, token} = authContext;

    useEffect(() => {
        if(!username || !token)
        {
            loadUser();
        }
        
    }, [])

    function useForceUpdate(){
        const [index, setIndex] = useState(1); // integer state
        return () => setIndex(index===1?2:1); // update the state to force render
    }
    const forceUpdate = useForceUpdate();
    

    return (
        <ul className="navigation">
            <div className="container">
            <li className={`left ${window.location.pathname=== process.env.PUBLIC_URL + "/"?"currentPage":undefined}`}>
                <NavLink to = {process.env.PUBLIC_URL + "/"} onClick={forceUpdate}>{navbarStrings.explore}</NavLink>
            </li>
            <li className={`left ${window.location.pathname=== process.env.PUBLIC_URL + "/search"?"currentPage":undefined}`}>
                <NavLink to = {process.env.PUBLIC_URL + "/search"} onClick={forceUpdate}>{navbarStrings.explore}</NavLink>
            </li>
            <li className={`right ${window.location.pathname=== process.env.PUBLIC_URL + "/profile"?"currentPage":undefined}`}>
                <NavLink to = {process.env.PUBLIC_URL + "/profile"} onClick={forceUpdate}>{navbarStrings.profile}</NavLink>
            </li>
            </div>
        </ul>

    )
}

export default Navbar