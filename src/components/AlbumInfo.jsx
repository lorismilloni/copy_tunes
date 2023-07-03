import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';

export default class AlbumInfo extends Component {
  render() {
    const { collectionId, collectionName } = this.props;
    return (
      <li class="box">
        <Link class="title is-4"
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          { collectionName }
        </Link>
      </li>
    );
  }
}

AlbumInfo.propTypes = {
  collectionId: PropType.string,
  collectionName: PropType.string,
}.isRequired;
