import {RECEIVE_SONGS } from '../constants';

const initialState = { songs: [] };

export function songsReducer (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SONGS: 
       return Object.assign({}, state, { songs: action.songs });
    default: 
       return state;
  }
}