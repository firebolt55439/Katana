import React, { Component } from "react";

import PlayLogo from "../static/images/play-button.svg";
import AddLogo from "../static/images/add.svg";

import Modal from "../components/UI/Modal";
import MovieDetails from "../components/Movie/MovieDetails";

import { API_KEY } from "../store/actions/index";
import axios from "axios";

export default class Header extends Component {
  state = {
    toggleModal: false,
    downloadedMovie: null,
  };

  handleToggleModal = () => {
    const url =
      "first_air_date" in this.props.movie
        ? `https://api.themoviedb.org/3/tv/${this.props.movie.id}?api_key=${API_KEY}&language=en-US`
        : `https://api.themoviedb.org/3/movie/${this.props.movie.id}?api_key=${API_KEY}&language=en-US`;
    axios
      .get(url)
      .then((res) => {
        this.setState({ toggleModal: true, downloadedMovie: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  closeModal = () => {
    this.setState({ toggleModal: false });
  };

  render() {
    const backgroundStyle = {
      backgroundSize: "cover",
      backgroundImage: this.props.movie.backdrop_path
        ? `url(https://image.tmdb.org/t/p/original/${this.props.movie.backdrop_path})`
        : ``,
      backgroundPosition: "center",
    };

    return (
      <>
        <header style={backgroundStyle} className="header">
          <div className="header__container">
            <h1 className="header__container-heading">
              {this.props.movie.title || this.props.movie.name}
            </h1>
            <button
              onClick={() => this.handleToggleModal()}
              className="header__container-btnPlay"
            >
              <PlayLogo className="header__container-btnMyList-play" />
              Watch
            </button>

            <button className="header__container-btnMyList">
              <AddLogo className="header__container-btnMyList-add" />
              My List
            </button>
            <p className="header__container-overview">
              {this.props.movie.overview}
            </p>
          </div>
          <div className="header--fadeBottom"></div>
        </header>

        <Modal
          show={this.state.toggleModal}
          modalClosed={this.closeModal}
          movie={this.state.downloadedMovie || this.props.movie}
        >
          <MovieDetails
            movie={this.state.downloadedMovie || this.props.movie}
          />
        </Modal>
      </>
    );
  }
}
