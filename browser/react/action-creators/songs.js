import axios from 'axios'
import { RECEIVE_SONGS 

} from '../constants';



  

export function receiveSongs (songs) {
  return {
    type: RECEIVE_SONGS,
    songs
  };
}

export function fetchSongs () {
  return (dispatch, getState) => {
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => {
        dispatch(receiveSongs(songs));
      })
    };
}





