import React, {useEffect, useState, useContext, Fragment} from 'react'
import AuthContext from "../../context/auth/authContext"
import UserContext from "../../context/user/userContext"
import PlanInfo from "../Item/PlanInfo"

const Home = () => {
    const [friends, setFriends] = useState([]); 
    const authContext = useContext(AuthContext);
    const {user} = authContext;
    const userContext = useContext(UserContext);
    const {getFollowings} = userContext;

    const setFollowings = async() =>{
        try{
            const followings = await getFollowings(user.id);
            setFriends(followings.content);
        }catch(e){
            console.error(e.message)
        }
    }

    useEffect(()=>{
        if(user !== null)
        {
            setFollowings()
        }
    },[user])

    return (
        <div>
            {friends.length <= 0?<p>You are not following anyone. You should get some friends.</p>:
            friends.map((following, index) => {
                return <Fragment key={index}>
                    <PlanInfo header={following.username + "'s plan"} username={following.username} 
                        plan={following.currentPlan?following.currentPlan:null}/><br/></Fragment> 
            })} 
        </div>
    )
}

export default Home
