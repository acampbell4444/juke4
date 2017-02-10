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
    console.log(AUDIO.src);
    AUDIO.play();
    console.log(AUDIO.playing);
    window.AUDIO = AUDIO
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
  return (dispatch) => {
    dispatch(startSong(...skip(1, this.state)));
  };
}

export function prev () {
  return (dispatch) => {
    dispatch(startSong(...skip(-1, this.state)));
  };
}