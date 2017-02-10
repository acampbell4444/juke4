import React from 'react';

import store from '../store';
import {Lyrics} from '../components/Lyrics';

import {fetchLyrics} from '../action-creators/lyrics';

export default class LyricsContainer extends React.Component {

  constructor (props) {
    super(props);

    const initialLocalState = {
      artistQuery: 'imogen heap',
      songQuery: 'hide and seek'
    };

    const initialGlobalState = store.getState();

    this.state = Object.assign(initialLocalState, initialGlobalState);

    this.handleArtistInput = this.handleArtistInput.bind(this);
    this.handleSongInput = this.handleSongInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleArtistInput(artist) {
    this.setState({artistQuery: artist});
  }

  handleSongInput(song) {
    this.setState({songQuery: song});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.artistQuery && this.state.songQuery) {
      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));
    }
  }

  render () {

    return <Lyrics
      text={this.state.text}
      setArtist={this.handleArtistInput}
      setSong={this.handleSongInput}
      artistQuery={this.state.artistQuery}
      songQuery={this.state.songQuery}
      handleSubmit={this.handleSubmit}
    />
  }
}
