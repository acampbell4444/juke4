import {RECEIVE_ARTISTS, RECEIVE_ARTIST} from '../constants';

const initialState = { list: [], selected: {} };

export function artistsReducer (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ARTISTS:
      return Object.assign({}, state, { list: action.artists });
    case RECEIVE_ARTIST:
      return Object.assign({}, state, { selected: action.artist });
    default:
      return state;
  }
}