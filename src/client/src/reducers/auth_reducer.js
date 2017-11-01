import {
    AUTH_SIGNUP,
    AUTH_SIGNUP_SUCCESS,
    AUTH_SIGNUP_FAIL,
    RESET_FAILED_TO_SIGNUP,
    AUTH_SIGNIN,
    AUTH_SIGNIN_SUCCESS,
    AUTH_SIGNIN_FAIL,
    AUTH_SIGNOUT,
    AUTH_SIGNOUT_SUCCESS,
    RECEIVE_SOCKET
} from '../constants/ActionTypes';

const initialState = {
    loaded: false,
    user: {
        userAccount: null,
        id: null,
        socketID: null
    },
    failedToSignIn: false,
    failedToSignUp: false,
};

// Getters
export const getUserId = (state) => {
  return state.authReducer.user.id;
} 

export const getUserAccount = (state) => {
  return state.authReducer.user.userAccount;
}

// Setters
export default function authReducer(state = initialState, action = {}) {
    switch(action.type) {
        case AUTH_SIGNUP:
            console.log("Begin to sign up");
            return {
                ...state,
                isSigningUp: true
            };
        case AUTH_SIGNUP_SUCCESS:
            console.log(action.newUser.username + " sign up successfully!");
            return {
                ...state,
                isSigningUp: false,
                user: {
                    username: action.newUser.userName,
                    id: action.newUser.id,
                    socketID: null
                }
            };
        case AUTH_SIGNUP_FAIL:
            console.log("Failed to sign up");
            return {
                ...state,
                failedToSignUp: true
            }
        case RESET_FAILED_TO_SIGNUP:
            return {
                ...state,
                failedToSignUp: false
            }
        case AUTH_SIGNIN:
            console.log("begin to sign in");
            return {
                ...state,
                isSigningIn: true
            };
        case AUTH_SIGNIN_SUCCESS:
            console.log("sign in successfully");
            return{
                ...state,
                isSigningIn: false,
                user: {
                    userAccount: action.user.userAccount,
                    id: action.user.id,
                    socketID: null
                }
            };
        case AUTH_SIGNIN_FAIL:
            return {
                ...state,
                failedToSignIn: true
            };
        case AUTH_SIGNOUT:
            console.log("begin to sign out");
            return {
                ...state,
                isSigningOut: true
            };
        case AUTH_SIGNOUT_SUCCESS:
            console.log("sign out successfully!");
            return {
                ...state,
                isSigningOut: false,
                user: {
                    userAccount: null,
                    id: null,
                }
            };
        case RECEIVE_SOCKET:
            return {
                ...state,
                user: {
                    ...state.user,
                    socketId: action.socketId
                }
            };
        default:
            return state;
    }
}
