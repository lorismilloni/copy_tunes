import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.selectUser();
  }

  selectUser = async () => {
    this.setState({ loading: true });

    const findUserName = await api.getUser();

    this.setState({
      userName: findUserName.name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;

    return (
      <header data-testid="header-component">
        <h3>Título</h3>
        <nav>
          <Link to="/search">
            <h4 data-testid="link-to-search">Pesquisa</h4>
          </Link>
          <Link to="/favorites">
            <h4 data-testid="link-to-favorites">Favoritos</h4>
          </Link>
          <Link to="/profile">
            <h4 data-testid="link-to-profile">Perfil</h4>
          </Link>
        </nav>
        { loading && <Loading /> }
        <section>
          <h5 data-testid="header-user-name">{ userName }</h5>
        </section>
      </header>
    );
  }
}

// requisito 3 e 4 foi feito com a ajuda da Yasmim Matos
