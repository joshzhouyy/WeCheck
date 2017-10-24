import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import axios from 'axios';
import moment from 'moment';

function addRoom(room) {
    return {
        type: types.ADD_ROOM,
        room
    }
}

export function createRoom (room) {
    return dispatch => {
        dispatch(addRoom(room))
        return axios.post('/api/rooms/new_room', room)
        .catch(error => {
            console.log(error);
        })
    }
}

export function receiveRoom(room) {
    return {
        type: types.RECEIVE_ROOM,
        room
    }
}


export function fetchRooms() {
  return dispatch => {
    dispatch(requestRooms())
    return axios.get('/api/rooms')
      .then(response => {
       dispatch(receiveRooms(response.data))})
      .catch(error => {
          console.log(error)
      });
  }
}

function requestRooms() {
  return {
    type: types.LOAD_ROOMS
  }
}

function receiveRooms(json) {
  return {
    type: types.LOAD_ROOMS_SUCCESS,
    json
  }
}

export function changeRoom(room) {
  return {
    type: types.CHANGE_ROOM,
    room
  };
}

export function createMessage(message) {
    return dispatch => {
        dispatch(addMessage(message));

        return axios.post('/api/new_message', message)
                    .catch(error => {
                        console.log(error);
                    });
    };
}

function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}

export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
}

function requestMessages() {
  return {
    type: types.LOAD_MESSAGES
  }
}

export function fetchMessages(room) {
    return dispatch => {
        dispatch(requestMessages());
        return axios.get(`/api/messages/${room}`)
                    .then(response => {
                        console.log("json:", response.data);
                        dispatch(receiveMessages(response.data, room))
                    })
                    .catch(error => {
                        console.log(error);
                    });
  }
}

function receiveMessages(json, room) {
    const date = moment().format('lll');
    return {
        type: types.LOAD_MESSAGES_SUCCESS,
        json,
        room,
        date
    }
}

function shouldFetchMessages(state) {
    const messages = state.messagesReducer.messages;
    if (!messages) {
        return true;
    }
}

export function fetchMessagesIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchMessages(getState())) {
            return dispatch(fetchMessages())
        }
    }
}
