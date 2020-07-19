import React, {useReducer} from "react"
import axios from "axios"
import contactContext from "./contactContext"
import contactReducer from "./contactReducer"
import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, FILTER_CONTACTS, CLEAR_FILTER, UPDATE_CONTACT, CONTACT_ERROR,
    CLEAR_CONTACTS, GET_CONTACTS} from "../types"

const ContactState = (props)=>{
    const initialState = {
        contacts:null,
        current : null,
        filtered: null,
        error:null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);
    //Get Contact
    const getContacts= async ()=>{
        try {
            const res = await axios.get("/api/contacts");
            dispatch({type:GET_CONTACTS, payload:res.data})
        } catch (error) {
            dispatch({type:CONTACT_ERROR, payload:error.response.msg})
        }
        
    }

    //Clear Contact
    const clearContacts= ()=>{
        dispatch({type:CLEAR_CONTACTS})        
    }

    //Add Contact
    const addContact= async (contact)=>{
        const config = {header:{"Content-Type":"application/json"}}
        try {
            const res = await axios.post("/api/contacts", contact, config);
            dispatch({type:ADD_CONTACT, payload:res.data})
        } catch (error) {
            dispatch({type:CONTACT_ERROR, payload:error.response.msg})
        }
        
    }

    //Delete Contact
    const deleteContact=async (id)=>{
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({type:DELETE_CONTACT, payload:id})
        } catch (error) {
            dispatch({type:CONTACT_ERROR, payload:error.response.msg})
        } 
    }

    //Set Current Contact
    const setCurrent=(contact)=>{
        dispatch({type:SET_CURRENT, payload:contact})
    }

    //Clear Current Contact
    const clearCurrent=()=>{
        dispatch({type:CLEAR_CURRENT})
    }

    //Update Contact
    const updateContact=async (contact)=>{
        const config = {header:{"Content-Type":"application/json"}}
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({type:UPDATE_CONTACT, payload:res.data})
        } catch (error) {
            dispatch({type:CONTACT_ERROR, payload:error.response.msg})
        }
        
    }

    //Filter Contacts
    const filterContacts=(text)=>{
        dispatch({type:FILTER_CONTACTS, payload:text})
    }

    //Clear Filters
    const clearFilter=()=>{
        dispatch({type:CLEAR_FILTER})
    }

    return(
        <contactContext.Provider value = {{
            contacts : state.contacts,
            current: state.current,
            filtered: state.filtered,
            error:state.error,
            getContacts,
            clearContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}>
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;