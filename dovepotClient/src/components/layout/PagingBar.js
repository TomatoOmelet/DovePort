import React, {Fragment} from 'react'
import PropTypes from "prop-types"

const PagingBar = ({page, totalPage, pageUp, pageDown}) => {

    return (
    <Fragment>
        <div style={{textAlign:"center"}}>
        <button className="btn" onClick={pageUp}>
            <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-caret-left-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path fillRule="evenodd" d="M10.205 12.456A.5.5 0 0 0 10.5 12V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4a.5.5 0 0 0 .537.082z"/>
            </svg>
        </button>
        <p style={{display:"inline"}}>{page}/{totalPage}</p>
        <button className="btn" onClick={pageDown}>
            <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-caret-right-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path fillRule="evenodd" d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
            </svg>
        </button>
        </div>
        <br/>
    </Fragment>
    )
}

PagingBar.propTypes = {
    page: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
    pageUp: PropTypes.func.isRequired,
    pageDown: PropTypes.func.isRequired
}

export default PagingBar
