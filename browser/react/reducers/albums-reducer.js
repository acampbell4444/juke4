import {RECEIVE_ALBUMS, RECEIVE_ALBUM} from '../constants';

const initialState = { list: [], selected: {} };

export function albumsReducer (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ALBUMS:
      return Object.assign({}, state, { list: action.albums });
    case RECEIVE_ALBUM:
      return Object.assign({}, state, { selected: action.album });
    default:
      return state;
  }
}