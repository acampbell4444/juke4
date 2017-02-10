import {RECEIVE_ARTISTS, RECEIVE_ARTIST} from '../constants';
import { convertAlbums, convertSong } from '../utils';
import axios from 'axios';

export function recieveArtists (artists) {
  return {
    type: RECEIVE_ARTISTS,
    artists
  };
}

export function recieveArtist (artist) {
  return {
    type: RECEIVE_ARTIST,
    artist
  };
}

export function fetchArtists () {
  return (dispatch, getState) => {
    axios.get('/api/artists/')
      .then(res => res.data)
      .then(data => {
        dispatch(receiveArtists(data))
      });
  };
}

export function fetchArtist(artistId) {
  return (dispatch, getState) => {
Promise
      .all([
        axios.get(`/api/artists/${artistId}`),
        axios.get(`/api/artists/${artistId}/albums`),
        axios.get(`/api/artists/${artistId}/songs`)
      ])
      .then(res => res.map(r => r.data))
      .then(([artist,albums,songs]) => {
        songs = songs.map(convertSong);
        albums = convertAlbums(albums);
        artist.albums = albums;
        artist.songs = songs;
        dispatch(recieveArtist(data));
      });
  };
}
