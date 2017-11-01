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
function receiveUser(user) {
    const newUser = {
        userAccount: user.userAccount,
        id: user.id
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
        // console.log(0)
        return axios.post('/signup', user)
               .then((response) => {
                  console.log("user's information" + JSON.stringify(user))
                  // console.log("m")
                  // console.log("@@@@@@@@@@@@@@@@@@@@@ " + JSON.stringify(response))
                   if (response.data != null && response.data != "") {
                      console.log(response);
                      let data = {};
                      data.userAccount = response.data.userAccount;
                      data.id = response.data._id;
                      dispatch(receiveUser(data));
                      browserHistory.push('/app');
                   } else {
                       // console.log("m")
                       dispatch(notReceiveUser());
                   }
               })
               .catch((error) => {
                  console.log("n")
                  
                  dispatch(notReceiveUser());
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
function receiveSignIn(data) {
    const user = {
        userAccount: data.userAccount,
        id: data.id
    }
    // console.log(user)
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

        return axios.put('/login', user).then((response) => {
            if(response.data != null && response.data != "") {
                let data = {};
                data.userAccount = response.data.userAccount;
                data.id = response.data._id;
                dispatch(receiveSignIn(data));
                browserHistory.push('/app');
            } else {
                dispatch(notReceiveSignIn());
            }
        })
        .catch((error) => {
            dispatch(notReceiveSignIn());
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
    // return dispatch => {
        // return axios.get('/api/logout').then((response) => {
        //     if(response.statusText == "OK") {
        //         console.log(response);
        //         dispatch(receiveSignOut());
        //         browserHistory.push('/');
        //     }
        // })
        // .catch((error) => {
        //     console.log("error: ", error);
        // });
    // };
     browserHistory.push('/');
}

export function receiveSocket(socketId) {
    return {
        type: types.RECEIVE_SOCKET,
        socketId
    };
}
