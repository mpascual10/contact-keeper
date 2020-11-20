import React, {useReducer} from 'react';
import {v4 as uuid} from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_ALERT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
} from '../Types';

//takes in props
const ContactState = props => {
    const initialState = {
        contacts: [

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

        ]
    };

    //reducer hooks
    //state allows us to access anything in out state 
    //dispatch allows us to dispatch objects to reducer
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //add contact
    //takes in a contact
    const addContact = contact =>
    {
        //uuid is a placeholder since were not yet updating mongo database
        contact.id = uuid();
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        });

    }

    //delete contact

    //set current contact

    //clear current contact

    //update contact

    //filter contact

    //clear filter

    //return provider ::::  wrap our application with this context
    return (
        //anything we want to access from other components goes in value eg. state, actions
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            addContact
        }}>
        {props.children}
        </ContactContext.Provider>
    )
};

//IN ORDER TO USE THIS YOU NEED TO WRAP YOUR APPLICATION
//see app.js everything is wrapped in <ContactState>
export default ContactState;