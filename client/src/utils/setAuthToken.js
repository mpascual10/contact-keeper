import axios from 'axios';

//checks to see if token is passed in, if so, set to global header, else delete

const setAuthToken = token => {
    if(token)
    {
        axios.defaults.headers.common['x-auth-token'] = token;
    }
    else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;