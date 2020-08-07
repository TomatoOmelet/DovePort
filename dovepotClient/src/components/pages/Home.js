import React, {useEffect, useState, useContext, Fragment} from 'react'
import AuthContext from "../../context/auth/authContext"
import UserContext from "../../context/user/userContext"
import PlanInfo from "../Item/PlanInfo"
import PagingBar from '../layout/PagingBar'

const Home = () => {
    const [friends, setFriends] = useState({}); 
    const [page, setPage] = useState(1);
    const authContext = useContext(AuthContext);
    const {user} = authContext;
    const userContext = useContext(UserContext);
    const {getFollowings} = userContext;
    const users_per_page = 10;
    const totalPage = (friends&&friends.totalSize)?Math.floor((friends.totalSize-1)/users_per_page + 1):1;

    const setFollowings = async() =>{
        try{
            const followings = await getFollowings(user.id, page, users_per_page);
            setFriends(followings);
        }catch(e){
            console.error(e.message)
        }
    }

    useEffect(()=>{
        if(user !== null)
        {
            setFollowings()
        }
    },[user, page])

    return (
        <div>
            {(friends===null||friends.content===undefined||friends.content.length <= 0)?<p>You are not following anyone. You should get some friends.</p>:
            friends.content.map((following, index) => {
                return <Fragment key={index}>
                    <PlanInfo header={following.username + "'s plan"} username={following.username} 
                        plan={following.currentPlan?following.currentPlan:null}/><br/></Fragment> 
            })} 
            {friends&&friends.content&&friends.content.length>0&&<PagingBar totalPage={totalPage} onChange={(p)=>{setPage(p)}}/>}
        </div>
    )
}

export default Home
