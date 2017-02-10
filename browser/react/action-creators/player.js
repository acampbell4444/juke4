import {
  START_PLAYING,
  STOP_PLAYING,
  SET_CURRENT_SONG,
  SET_LIST
} from '../constants';
import AUDIO from '../audio';
import {skip} from '../utils';

export function startPlaying () {
  return {
    type: START_PLAYING
  };
}

export function stopPlaying () {
  return {
    type: STOP_PLAYING
  };
}

export function setCurrentSong (song) {
  return {
    type: SET_CURRENT_SONG,
    song
  };
}

export function setList (list) {
  return {
    type: SET_LIST,
    list
  };
}

export function play() {
  return (dispatch) => {
    AUDIO.play();
    dispatch(startPlaying());
  }
}

export function pause() {
  return (dispatch) => {
    AUDIO.pause();
    dispatch(stopPlaying());
  }
}

export function load (currentSong, currentSongList) {
  return (dispatch) => {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    dispatch(setCurrentSong(currentSong));
    dispatch(setList(currentSongList));
  }
}

export function startSong (song, list) {
  return (dispatch) => {
    dispatch(pause());
    dispatch(load(song, list));
    dispatch(play());
  }
}

export function next () {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(startSong(...skip(1, state.player)));
  };
}

export function prev () {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(startSong(...skip(-1, state.player)));
  };
}