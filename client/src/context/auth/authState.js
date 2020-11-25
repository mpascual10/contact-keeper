import React, {useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../Types';

//takes in props
//token is stored in local storage, and used the method getitem 'token' to get the token
const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    };

    //reducer hooks
    //state allows us to access anything in out state 
    //dispatch allows us to dispatch objects to reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    //load user

    //register user

    //login user

    //logout

    // clear errors

    //return provider ::::  wrap our application with this context
    return (
        //anything we want to access from other components goes in value eg. state, actions
        <AuthContext.Provider
        value={{
            
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            
            
        }}>
        {props.children}
        </AuthContext.Provider>
    )
};

//IN ORDER TO USE THIS YOU NEED TO WRAP YOUR APPLICATION
//see app.js everything is wrapped in <ContactState>
export default AuthState;