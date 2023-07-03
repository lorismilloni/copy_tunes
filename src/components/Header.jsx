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
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <h3 class="navbar-item">Copy Tunes</h3>
          <div class="navbar-start">
            <Link class="navbar-item" to="/search">
              <h4 data-testid="link-to-search">Pesquisa</h4>
            </Link>
            <Link class="navbar-item" to="/favorites">
              <h4 data-testid="link-to-favorites">Favoritos</h4>
            </Link>
            <Link class="navbar-item" to="/profile">
              <h4 data-testid="link-to-profile">Perfil</h4>
            </Link>
          </div>
          <div class="navbar-item navbar-end">
            <h5 data-testid="header-user-name">{ userName }</h5>
          </div>
        </nav>
        { loading && <Loading /> }
      </header>
    );
  }
}

