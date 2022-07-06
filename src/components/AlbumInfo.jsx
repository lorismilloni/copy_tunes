import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';

export default class AlbumInfo extends Component {
  render() {
    const { collectionId, collectionName } = this.props;
    return (
      <li>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          { collectionName }
        </Link>
      </li>
    );
  }
}

// Componente AlbumInfo seguindo modelo do AlbumCard feito pelo Leonardo Vogel

AlbumInfo.propTypes = {
  collectionId: PropType.string,
  collectionName: PropType.string,
}.isRequired;
