import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import axios from 'axios';

// helper action requestSignUp
function requestSignUp() {
    return {
        type: types.AUTH_SIGNUP
    }
}

// helper action receiveUser
function receiveUser(username) {
    const newUser = {
        username,
        id: Symbol(username)
    }
    return {
        type: types.AUTH_SIGNUP_SUCCESS,
        newUser
    }
}

// helper action notReceiveUser
function notReceiveUser() {
    return {
        type: types.AUTH_SIGNUP_FAIL
    };
}

export function resetFailedToSignUp() {
    return {
        type: types.RESET_FAILED_TO_SIGNUP
    }
}


export function signUp(user) {
    return dispatch => {
        dispatch(requestSignUp());

        return axios.post('/api/signup', user)
               .then((response) => {
                   console.log(response);
                   if (response.data != null && response.data != "") {
                       console.log(response);
                       dispatch(receiveUser(user.username));
                       browserHistory.push('/chat');
                   } else {
                       dispatch(notReceiveUser());
                   }
               })
               .catch((error) => {
                  console.log("error: ", error);
               });
    };
}

//helper action requestSignIn
function requestSignIn(username) {
    return {
        type: types.AUTH_SIGNIN,
    }
}

//helper action receiveSignIn
function receiveSignIn(username) {
    const user = {
        username,
        id: Symbol(username)
    }
    return {
        type: types.AUTH_SIGNIN_SUCCESS,
        user
    }
}

function notReceiveSignIn() {
    return {
        type: types.AUTH_SIGNIN_FAIL
    };
}

export function signIn(user) {
    return dispatch => {
        dispatch(requestSignIn());

        return axios.post('/api/login', user).then((response) => {
            console.log(response);
            if(response.data != null && response.data != "") {
                console.log(response);
                dispatch(receiveSignIn(user.username));
                browserHistory.push('/');
            } else {
                dispatch(notReceiveSignIn());
            }
        })
        .catch((error) => {
            console.log("error: ", error);
        });
    };
}

// helper function requestSignOut
function requestSignOut(){
    return {
        type: types.AUTH_SIGNOUT
    }
}

// helper function receiveSignOut
function receiveSignOut() {
    return {
        type: types.AUTH_SIGNOUT_SUCCESS
    }
}

export function signOut() {
    return dispatch => {
        dispatch(requestSignOut());

        return axios.get('/api/logout').then((response) => {
            if(response.statusText == "OK") {
                console.log(response);
                dispatch(receiveSignOut());
                browserHistory.push('/');
            }
        })
        .catch((error) => {
            console.log("error: ", error);
        });
    };
}

export function receiveSocket(socketId) {
    return {
        type: types.RECEIVE_SOCKET,
        socketId
    };
}
