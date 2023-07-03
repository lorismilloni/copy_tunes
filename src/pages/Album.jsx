/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      tracks: [],
      loading: false,
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    // ao montar o componente, busca as músicas do album selecionado
    const { match: { params: { id } } } = this.props;
    // realiza uma desestruturação das props, é o mesmo que: `this.props.match.params.id`
    const tracks = await getMusics(id);
    // atribui para a const tracks todas as músicas retornadas da função getMusic
    // a prop match é enviada quando é gerada uma página dinamicamente, através do :id no path
    const favoritesArray = await getFavoriteSongs();
    const { artistName, collectionName } = tracks[0];
    // desestrutura as chaves presentes no primeiro item do array
    this.setState({
      artistName,
      collectionName,
      tracks: tracks.slice(1),
      favoriteSongs: favoritesArray.map((song) => song.trackId),
      // aqui o map é utilizado para salvar apenas o trackId das músicas no array de favoritos
    });

    // aqui é utilizado o método slice(1) para pegar somente a partir do índice 1, excluindo o primeiro objeto do array porque ele não é referente a uma música, mas às informações do álbum.
  }

  handleFavorite = async (song) => {
    const { favoriteSongs } = this.state;
    this.setState({ loading: true });
    await addSong(song);
    this.setState({
      loading: false,
      favoriteSongs: [...favoriteSongs, song.trackId],
    });
  }

  render() {
    const {
      artistName,
      collectionName,
      tracks,
      loading,
      favoriteSongs,
    } = this.state;

    return (
      <section data-testid="page-album">
        <Header />
        <main>
          <div class="columns box">
            { (loading) ? <Loading class="column"/>
              : (
                <>
                  <div class="column"></div>
                  <section>
                    <div class="column has-background-warning">
                      <h4 class="title" data-testid="artist-name">{artistName}</h4>
                      <h5 class="title" data-testid="album-name">{collectionName}</h5>
                      <section>
                        {tracks.map((track) => (<MusicCard
                          key={track.trackId}
                          handleFavorite={() => this.handleFavorite(track)}
                          favoriteSongs={favoriteSongs}
                          {...track} />))}
                        {/* o map aqui é usado para renderizar todas as músicas do array tracks, chamando o componente MusicCard e passando como prop todo o objeto da música, com um spread operator */}
                      </section>
                    </div>
                  </section>
                  <div class="column"></div>
                </>
              )}
          </div>
        </main>
      </section>
    );
  }
}

Album.propTypes = {
  id: PropTypes.number,
}.isRequired;
