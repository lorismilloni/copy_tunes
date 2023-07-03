import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumInfo from '../components/AlbumInfo';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      searchButton: true,
      loading: false,
      albumFound: false,
      albums: [],
      artist: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      searchInput: target.value,
    }, this.validateButton);
  }

  validateButton = () => {
    const MIN_VALUE = 2;
    const { searchInput } = this.state;
    if (searchInput.length >= MIN_VALUE) {
      this.setState({ searchButton: false });
    } else {
      this.setState({ searchButton: true });
    }
  }

  handleAlbumSearch = async () => {
    this.setState({ loading: true, albumFound: false });
    const { searchInput } = this.state;
    this.setState({ searchInput: '' });

    const albumsArray = await searchAlbumsAPI(searchInput);

    this.setState({
      loading: false,
      albumFound: true,
      albums: albumsArray,
      artist: searchInput,
    });
  }

  render() {
    const {
      searchButton,
      searchInput,
      loading,
      albumFound,
      albums,
      artist,
    } = this.state;

    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
        <div class="columns">
          <div class="column"></div>
        </div>
        <div class="columns">
          <div class="column"></div>
            <div class="box column has-background-warning">
              { loading ? <Loading class="box" /> : (
                  <form class="box has-background-warning">
                    <div class="control field">
                      <input
                        class="input is-large is-rounded"
                        type="text"
                        value={ searchInput }
                        onChange={ this.handleChange }
                        data-testid="search-artist-input"
                      />
                    </div>
                    <button
                      class="button is-dark is-medium is-responsive is-outlined is-fullwidth has-text-white"
                      type="submit"
                      disabled={ searchButton }
                      onClick={ this.handleAlbumSearch }
                      data-testid="search-artist-button"
                    >
                      Pesquisar
                    </button>
                  </form>
              )}
              { albumFound && (
                <section class="box">
                  { albums.length ? <h4 class="title">{`Resultado de álbuns de: ${artist}`}</h4> : (
                    <h4 class="subtitle">Nenhum álbum foi encontrado</h4>) }
                  <section>
                    { albums.map((album) => (
                      <AlbumInfo key={ album.collectionId } { ...album } />
                      ))}
                  </section>
                </section>
              )}
            </div>
          <div class="column"></div>
        </div>
      </>
    );
  }
}

