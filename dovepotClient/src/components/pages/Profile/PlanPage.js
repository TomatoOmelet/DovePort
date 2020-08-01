import React, {useContext, Fragment} from 'react'
import AuthContext from "../../../context/auth/authContext"

const PlanPage = () => {
    const authContext = useContext(AuthContext)
    const plan = authContext.user.currentPlan;

    return (
        <div>
            {plan?
                /*Plan Page*/
                <Fragment>
                    <p>Plan:</p>
                    <p>{plan.content}</p>
                    <p>before {plan.deadline}</p>
                </Fragment>
                :
                /*No Plan Page*/
                <p>You currently do not have a plan. You shuld add one and be productive.</p>
            }
        </div>
    )
}

export default PlanPage
