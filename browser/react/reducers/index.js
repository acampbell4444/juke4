import {combineReducers} from 'redux';
import {lyricsReducer} from './lyrics-reducer';
import {playerReducer} from './player-reducer';

/*
  {
    lyrics: {
      text: ''
    },
    player: {
      currentSong: {},
      currentSongList: [],
      isPlaying: false,
      progress: 0
    }
  }
 */

export const reducers = combineReducers({
  lyrics: lyricsReducer,
  player: playerReducer
});
