import React from 'react'
import PropTypes from "prop-types"

const PlanInfo = ({header, username, plan}) => {
    if(plan !== null)
    {
        return (
            <div className="card">
                <div className="card-header bg-info">{header}</div>
                <div className="card-body bg-light">
                    <p><i>I will</i> {plan.content}</p>
                    <p><i>before</i> {plan.deadline}</p>
                </div>
            </div>   
        )
    }else{
        return (
            <div className="card">
                <div className="card-header bg-secondary">{header}</div>
                <div className="card-body bg-light">
                    <p>{username} does not have any plan right now.</p>
                </div>
            </div>   
        )
    }
}

PlanInfo.propTypes = {
    header: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    plan: PropTypes.object
}


export default PlanInfo
