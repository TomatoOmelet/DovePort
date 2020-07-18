import React, {useState} from 'react'
import {NavLink} from "react-router-dom"
import {navbarStrings} from "../../resource/text/UItext"

const Navbar = () => {
    function useForceUpdate(){
        const [index, setIndex] = useState(1); // integer state
        return () => setIndex(index===1?2:1); // update the state to force render
    }
    const forceUpdate = useForceUpdate();
    

    return (
        <ul className="navigation">
            <li className={`right ${window.location.pathname=== process.env.PUBLIC_URL + "/"?"currentPage":undefined}`}>
                <NavLink to = {process.env.PUBLIC_URL + "/"} onClick={forceUpdate}>{navbarStrings.explore}</NavLink>
            </li>
            <li className={`right ${window.location.pathname=== process.env.PUBLIC_URL + "/About"?"currentPage":undefined}`}>
                <NavLink to = {process.env.PUBLIC_URL + "/About"} onClick={forceUpdate}>{navbarStrings.profile}</NavLink>
            </li>
        </ul>

    )
}

export default Navbar