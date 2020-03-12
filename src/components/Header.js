import React, { Component } from 'react';

import PlayLogo from '../static/images/play-button.svg';
import AddLogo from '../static/images/add.svg';

export default class Header extends Component {
  state = {
     toggleModal: false
  }

  handleToggleModal = () => {
    this.setState({ toggleModal: true });
    alert("TODO");
  }

  closeModal = () => {
     this.setState({ toggleModal: false });
  }

  render() {
    const backgroundStyle = {
      backgroundSize: "cover",
      backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.props.movie.backdrop_path})`,
      backgroundPosition: "center",
    };

    return (
      <header style={backgroundStyle} className="header">
        <div className="header__container">
          <h1 className="header__container-heading">{this.props.movie.title || this.props.movie.name}</h1>
          <button onClick={() => this.handleToggleModal()} className="header__container-btnPlay">
            <PlayLogo className="header__container-btnMyList-play" />
            Play
          </button>

          <button className="header__container-btnMyList">
            <AddLogo className="header__container-btnMyList-add" />
            My List
          </button>
          <p className="header__container-overview">{this.props.movie.overview}</p>
        </div>
        <div className="header--fadeBottom"></div>
      </header>
    );
  }
}
