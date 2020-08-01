import React, {useContext, Fragment, useState} from 'react'
import AuthContext from "../../../context/auth/authContext"
import UserContext from "../../../context/user/userContext"

const PlanPage = () => {
    const [plan, setPlan] = useState({content:"", deadline:""});

    const authContext = useContext(AuthContext)
    const currentPlan = authContext.user.currentPlan;

    const userContext = useContext(UserContext)
    const {removePlan, addPlan} = userContext;

    const onChange = (e) => {
        setPlan(
            {
                ...plan,
                [e.target.name]: e.target.value
            }
        )
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        addPlan(plan);
    }

    return (
        <div>
            {currentPlan?
                /*Plan Page*/
                <Fragment>
                    <div className="card">
                        <div className="card-header bg-info">Current Plan</div>
                        <div className="card-body bg-light">
                            <p><i>I will</i> {currentPlan.content}</p>
                            <p><i>before</i> {currentPlan.deadline}</p>
                            <br/>
                            <button type="submit" className="btn btn-success"  style={{marginInline:"5px"}} 
                            onClick={()=>{removePlan(currentPlan.id)}}>I'm Done</button>

                            <button type="submit" className="btn btn-danger"  style={{marginInline:"5px"}} 
                            onClick={()=>{removePlan(currentPlan.id)}}>I give up</button>
                        </div>
                    </div>       
                </Fragment>
                :
                /*No Plan Page*/
                <Fragment>
                <div className="card">
                    <div className="card-header bg-info">
                        What are you planning to do?
                    </div>
                    <div className="card-body bg-light">
                    <form onSubmit = {onSubmit}>
                        <div className="form-group">
                            <label htmlFor="content"><i>I will</i></label>
                            <textarea className="form-control" name="content" onChange={onChange} required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="deadline"><i>before</i></label>
                            <input type="text" className="form-control" name="deadline" onChange={onChange} required></input>
                        </div>
                        <input type="submit" value="Set Plan" className="btn btn-primary" />
                    </form>
                    </div>
                </div>
                </Fragment>
            }
        </div>
    )
}

export default PlanPage
