import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      handleFavorite,
      favoriteSongs,
    } = this.props;

    return (
      <div class="columns">
        <div class="column"></div>
        <div class="column box is-three-quarters">
            <p class="title">{trackName}</p>
          <div class="box has-background-black-bis">
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>
          <div class="box">
            <label class="checkbox subtitle ml-3" htmlFor="{ trackId }">
              <input
                type="checkbox"
                name="favorite"
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ handleFavorite }
                checked={ favoriteSongs.includes(trackId) }
              />
            <p>Favorita</p>
            </label>
          </div>
        </div>
        <div class="column"></div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  handleFavorite: PropTypes.func,
  favoriteSongs: PropTypes.array,
}.isRequired;
