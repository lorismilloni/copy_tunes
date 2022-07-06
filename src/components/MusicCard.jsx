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
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="{ trackId }">
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ handleFavorite }
            checked={ favoriteSongs.includes(trackId) }
          />
        </label>
      </div>
    );
  }
}

// usado o modelo do Alessandro Achtenberg para desestruturar as props e usar como parâmetro na handleFavorite

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  handleFavorite: PropTypes.func,
  favoriteSongs: PropTypes.array,
}.isRequired;
