import React, {useReducer} from "react"
import {v4 as uuid} from "uuid"
import AlertContext from "./alertContext"
import AlertReducer from "./alertReducer"
import {SET_ALERT, REMOVE_ALERT, CLEAR_ALERT} from "../types"

const AlertState = (props)=>{
    const initialState = []

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    //Set Alert
    const setAlert=(msg, type = "danger", timeOut = 5000)=>{
        try{
            const id = uuid();
            dispatch({type:SET_ALERT, payload:{msg, type, id}});
            setTimeout(()=>dispatch({type:REMOVE_ALERT, payload:id}) , timeOut);
        }catch(e){
            console.error(e.message)
        }
    }

    //Remove Alert
    const clearAlert=()=>{
        dispatch({type:CLEAR_ALERT});
    }

    const setAlertWithError=(error)=>
    {
        if(error.response && error.response.data)
        {
            setAlert(error.response.data);
        }else{
            setAlert("An unknown error occurs");
        }
    }

    return(
        <AlertContext.Provider value = {{
          alerts:state,
          setAlert,
          clearAlert,
          setAlertWithError
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;