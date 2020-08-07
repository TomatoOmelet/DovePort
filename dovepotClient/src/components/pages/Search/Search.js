import React, {useState, useContext, useEffect} from 'react'
import axios from "axios" ;
import UserSearchResult from './UserInfo'
import AlertContect from "../../../context/alert/alertContext"
import {serverAddress} from "../../../context/properties"
import {searchPageStrings} from "../../../resource/text/UItext"
import PagingBar from '../../layout/PagingBar';


const Search = () => {
    const alertContext = useContext(AlertContect);
    const {setAlert} = alertContext;

    const [keyword, setKeyword] = useState("")
    const [searchkeyword, setSearchKeyword] = useState("")
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const entries_each_page = 10;
    const totalPage = (users&&users.totalSize)?Math.floor((users.totalSize-1)/entries_each_page + 1):1;;

    useEffect(() => {
        search();
    }, [searchkeyword, page])

    const onChange = (e) => {
        setKeyword(e.target.value)
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        setSearchKeyword(keyword);
    }

    const pageUpButton= () =>{
        if(page - 1 >= 1)
        {
            setPage(page - 1);
        }
    }

    const pageDownButton= () =>{
        if(page + 1 <= totalPage)
        {
            setPage(page + 1);
        }
    }

    const search = async ()=>{
        try {
            if(searchkeyword.length <= 0)
                return;
            
            const config = {
                headers:{"ContentType":"application/json"}
            };

            const res = await axios.get(`${serverAddress}/api/users/search?keyword=${searchkeyword}&page=${page}&entries_each_page=${entries_each_page}`, config);
            //console.log(res)
            setUsers(res.data.totalSize > 0?res.data:null);
        } catch (error) {
            console.log(error.message);
            setAlert(error.message);
        }
    }

    return (
        <div>
            {/*search bar*/}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username to Search" onChange={onChange} required></input>
                </div>
                <input type="submit" value={searchPageStrings.search} className="btn btn-primary"/>
            </form>
            {/*display users*/}
            {users&&users.content&&users.content.map((user, index) => {
                return <UserSearchResult key={index} user={user}/>
            })}
            {users===null&&<p>{searchPageStrings.noResultFound}</p>}
            {users&&users.content&&users.content.length>0&&<PagingBar page={page} totalPage={totalPage} pageUp={pageUpButton} pageDown={pageDownButton}/>}
        </div>
    )
}

export default Search
