import React, {useReducer} from 'react';
//import {v4 as uuid} from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import axios from 'axios';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_CURRENT,
    CONTACT_ERROR,
    CLEAR_CONTACTS
} from '../types';


//takes in props
//contacts: the hardcoded array of contacts
//current: the object that is used for updating
//filtered: array of filtered  contacts
const ContactState = props => {
    const initialState = {
        contacts: null,
        /*[
            {
                "type": "personal",
                "id": 1,
                "name": "Dwayne Johnson",
                "email": "Djohnson@gmail.com",
                "phone": "444-555-6666",
               
            },
            {
                "type": "professional",
                "id": 2,
                "name": "Ted Johnson",
                "email": "tjohnson@gmail.com",
                "phone": "777-777-7777",
                
            },
            {
                "type": "personal",
                "id": 3,
                "name": "Magic Johnson",
                "email": "mjohnson@gmail.com",
                "phone": "111-111-1111",
               
            }

        ] */
        current: null,
        filtered: null,
        error: null
    };

    //reducer hooks
    //state allows us to access anything in out state 
    //dispatch allows us to dispatch objects to reducer
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //get contacts
    const getContacts = async () =>
    {
        //uuid is a placeholder since were not yet updating mongo database
        //contact.id = uuid();
        
        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }

      
    }



    //add contact
    //takes in a contact
    const addContact = async contact =>
    {
        //uuid is a placeholder since were not yet updating mongo database
        //contact.id = uuid();
        
        const config = {

            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }

      
    };

    //delete contact
    const deleteContact = id =>
    {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    }

    //clear contact
    const clearContacts = () =>
    {
        dispatch({
            type: CLEAR_CONTACTS
        });
    }

    //set current contact
    const setCurrent = contact =>
    {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    }

    //clear current contact
    const clearCurrent = () =>
    {
        dispatch({
            type: CLEAR_CURRENT
        });
    }

    //update contact
    const updateContact = contact =>
    {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        });
    }

    //filter contact
    const filterContacts = text =>
    {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    }

    //clear filter
    const clearFilter = () =>
    {
        dispatch({
            type: CLEAR_FILTER
        });
    }

    //return provider ::::  wrap our application with this context
    return (
        //anything we want to access from other components goes in value eg. state, actions
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts

        }}>
        {props.children}
        </ContactContext.Provider>
    )
};

//IN ORDER TO USE THIS YOU NEED TO WRAP YOUR APPLICATION
//see app.js everything is wrapped in <ContactState>
export default ContactState;