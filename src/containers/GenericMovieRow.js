import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import axios from '../axios-movies';

import { getMovieRows } from '../getMovie';
import { fetchRomanceMovies, API_KEY } from '../store/actions/index';

import MovieRow from './MovieRow';

import GENRE_IDS from './genres.json';

export default class GenericMovieRow extends Component {
  state = {
    genreItems: null,
    genreHeading: null
  }

  componentDidMount() {
    let {genre, type, heading} = this.props;
    if (type && !genre) {
      const arr = GENRE_IDS[type];
      genre = arr[Math.floor(Math.random() * arr.length)];
      if (!heading) {
        heading = genre["name"];
      }
      genre = genre["id"];
    }
    this.fetchDiscoverGenre(genre, type, heading);
  }

  fetchDiscoverGenre(genre, type, heading) {
    const url = `/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`;
    axios
      .get(url)
      .then((res) => {
        res = res.data.results;
        res = getMovieRows(res, url);
        this.setState({
          genreItems: res,
          genreHeading: heading
        });
      })
      .catch(error => {
        console.log(error);
      })
    ;
  }

  render() {
    let { genreHeading, genreItems } = this.state;
    return genreItems && genreItems.length && genreHeading ? (
      <>
        <MovieRow heading={genreHeading} movies={genreItems} />
      </>
    ) : (<></>);
  }
}
