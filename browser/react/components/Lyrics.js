import React from 'react';

export function Lyrics ({
  text,
  setArtist,
  artistQuery,
  setSong,
  songQuery,
  handleSubmit
}) {
  return (
    <div id="lyrics">
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" className="form-control" value={artistQuery} placeholder="Artist" onChange={(e) => setArtist(e.target.value)}/>
          <input type="text" className="form-control" value={songQuery} placeholder="Song" onChange={(e) => setSong(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-default">Search for Lyrics</button>
        <pre>{text || 'Search above!'}</pre>
      </form>
    </div>
  );
}