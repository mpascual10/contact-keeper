import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import {v4 as uuidv4} from 'uuid';

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

//takes in props
//token is stored in local storage, and used the method getitem 'token' to get the token
const AlertState = props => {
    const initialState = [];

    //reducer hooks
    //state allows us to access anything in out state 
    //dispatch allows us to dispatch objects to reducer
    const [state, dispatch] = useReducer(alertReducer, initialState);

    //SET ALERT
    const setAlert = (msg, type, timeout = 5000) => {

        const id = uuidv4();
        dispatch ({

            type: SET_ALERT,
            payload: {msg, type,id}

        });

        setTimeout(() => dispatch({
            type: REMOVE_ALERT, payload:id
        }), 
        timeout);
    }
 
    //return provider ::::  wrap our application with this context
    return (
        //anything we want to access from other components goes in value eg. state, actions
        <AlertContext.Provider
        value={{
            
            alerts: state,
            setAlert
            
            
        }}>
        {props.children}
        </AlertContext.Provider>
    );
};

//IN ORDER TO USE THIS YOU NEED TO WRAP YOUR APPLICATION

export default AlertState;