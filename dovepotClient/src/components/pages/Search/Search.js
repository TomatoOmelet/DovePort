import React, {useState, useContext} from 'react'
import axios from "axios" ;
import UserSearchResult from './UserSearchResult'
import AlertContect from "../../../context/alert/alertContext"
import {serverAddress} from "../../../context/properties"


const Search = () => {
    const alertContext = useContext(AlertContect);
    const {setAlert} = alertContext;

    const [keyword, setKeyword] = useState("")
    const [users, setUsers] = useState([])

    const onChange = (e) => {
        setKeyword(e.target.value)
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        search(keyword);
    }

    const search = async (keyword)=>{
        try {
            const config = {
                headers:{"ContentType":"application/json"}
            };

            const res = await axios.get(`${serverAddress}/api/users/search?keyword=${keyword}`, config);
            console.log(res);
        } catch (error) {
            console.log(error.message);
            setAlert(error.response.data);
        }
    }

    return (
        <div>
            {/*search bar*/}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username to Search" onChange={onChange} required></input>
                </div>
                <input type="submit" value="Search" className="btn btn-primary"/>
            </form>
            {/*display users*/}
            {users&&users.map((user, index) => {
                return <UserSearchResult key={index}/>
            })}
        </div>
    )
}

export default Search
