import React, {useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

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
    const loadUser = async () => {
        //todo- load token into global header to stop sending tokens to protected routes via headers

        if(localStorage.token)
        {
            setAuthToken(localStorage.token);
        }

        try {
            const res =  await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            });
        }
    };

    //register user
    const register = async formData => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        
        try {            
            const res = await axios.post('api/users', formData, config);
            //res.data will have the token in the response
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }

    }

    //login user
    const login = () => console.log('login');

    //logout
    const logout = () => console.log('logout');

    // clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS});

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
            register,
            loadUser,
            login,
            logout,
            clearErrors
            
            
        }}>
        {props.children}
        </AuthContext.Provider>
    )
};

//IN ORDER TO USE THIS YOU NEED TO WRAP YOUR APPLICATION
//see app.js everything is wrapped in <ContactState>
export default AuthState;