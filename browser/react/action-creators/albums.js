import {RECEIVE_ALBUMS, RECEIVE_ALBUM} from '../constants';
import { convertAlbums, convertAlbum } from '../utils';
import axios from 'axios';

export function recieveAlbums (albums) {
  return {
    type: RECEIVE_ALBUMS,
    albums
  };
}

export function recieveAlbum (album) {
  return {
    type: RECEIVE_ALBUM,
    album
  };
}

export function fetchAlbums () {
  return (dispatch, getState) => {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(data => {
        dispatch(recieveAlbums(convertAlbums(data)));
      });
  };
}

export function fetchAlbum (albumId) {
  return (dispatch, getState) => {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(data => {
        dispatch(recieveAlbum(convertAlbum(data)));
      });
  };
}
