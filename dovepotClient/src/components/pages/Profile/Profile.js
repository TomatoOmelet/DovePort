import React,{useContext, useState, useEffect} from 'react'
import {profilePageStrings} from "../../../resource/text/UItext"
import AuthContext from '../../../context/auth/authContext'
import UserContext from '../../../context/user/userContext'
import { UserList } from './UserList';
import PlanPage from './PlanPage';
import PagingBar from '../../layout/PagingBar';

const Profile = () => {
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const [users, setUsers] = useState({mode:"none", info:{}});
    const [page, setPage] = useState(1);
    const {logout, user} = authContext;
    const {getFollowings, getFollowers} = userContext;

    const users_per_page = 5
    const totalPage = users.info.totalSize?Math.floor((users.info.totalSize-1)/users_per_page + 1):1;

    useEffect(() => {
        if(users.mode==="followers"){
            showFollowers();
        }else if(users.mode==="followings"){
            showFollowings();
        }
    }, [page, users.mode, user])

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

    const showFollowers=async()=>{
        try{
            let followers;
            if(page > totalPage){
                setPage(totalPage);
            }else{
                followers = await getFollowers(user.id, page, users_per_page);
            }
            setUsers({mode:"followers", info:followers});
        }catch(e){
            console.error(e.message)
        }

    }

    const showFollowings=async()=>{
        try{
            let followings;
            if(page > totalPage){
                setPage(totalPage);
            }else{
                followings = await getFollowings(user.id, page, users_per_page);
            }
            setUsers({mode:"followings", info:followings});
        }catch(e){
            console.error(e.message)
    }
    }

    if(user)
    {
        const {name, username, followers, followings} = authContext.user;

        return (
            <div className="row">
                <div className="col">
                    <h3 style={{display:"inline"}}>{name}</h3><p>@{username}</p>
                    <button type="submit" className="btn btn-primary" style={{marginRight:"5px"}} 
                            onClick={()=>{setUsers({...users, mode:"followings"})}}>{profilePageStrings.followings}:{followings.length}</button>
                    
                    <button type="submit" className="btn btn-primary"  style={{marginInline:"5px"}} 
                            onClick={()=>{setUsers({...users, mode:"followers"})}}>{profilePageStrings.followers}:{followers.length}</button>
                    
                    <button type="submit" className="btn btn-danger"  style={{marginInline:"5px"}} 
                            onClick={logout}>{profilePageStrings.logOut}</button>
                    <br/><br/>
                    <PlanPage/>
                </div>

                <div className="col">
                    <PagingBar page={page} totalPage={totalPage} pageUp={pageUpButton} pageDown = {pageDownButton}/>
                {users.mode==="followers"&&users.info.content&&<UserList users = {users.info.content} emptyMessage={profilePageStrings.emptyFollowers}/>}
                {users.mode==="followings"&&users.info.content&&<UserList users = {users.info.content} emptyMessage={profilePageStrings.emptyFollowings}/>}
                </div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}

export default Profile
