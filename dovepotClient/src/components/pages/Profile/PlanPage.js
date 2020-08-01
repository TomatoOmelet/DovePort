import React, {useContext, Fragment} from 'react'
import AuthContext from "../../../context/auth/authContext"
import UserContext from "../../../context/user/userContext"

const PlanPage = () => {
    const authContext = useContext(AuthContext)
    const plan = authContext.user.currentPlan;

    const userContext = useContext(UserContext)
    const {removePlan} = userContext;

    return (
        <div>
            {plan?
                /*Plan Page*/
                <Fragment>
                    <div class="card">
                        <div class="card-header bg-info">Current Plan</div>
                        <div class="card-body bg-light">
                            <p><i>I will</i> {plan.content}</p>
                            <p><i>before</i> {plan.deadline}</p>
                            <br/>
                            <button type="submit" className="btn btn-success"  style={{marginInline:"5px"}} 
                            onClick={()=>{removePlan(plan.id)}}>I'm Done</button>

                            <button type="submit" className="btn btn-danger"  style={{marginInline:"5px"}} 
                            onClick={()=>{removePlan(plan.id)}}>I give up</button>
                        </div>
                    </div>
                    
                </Fragment>
                :
                /*No Plan Page*/
                <p>You currently do not have a plan. You shuld add one and be productive.</p>
            }
        </div>
    )
}

export default PlanPage
