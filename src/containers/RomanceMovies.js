import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { getMovieRows } from '../getMovie';
import { fetchRomanceMovies } from '../store/actions/index';

import { API_KEY } from '../store/actions/index';

import MovieRow from './MovieRow';

class RomanceMovies extends Component {

  componentWillMount() {
    this.props.fetchRomanceMovies();
  }

  render() {
    let movies
    // Call getMoviesRows function only when we get the data back 
    // from the API through redux 
    if (this.props.movies.data) {
      const url = `/discover/tv?api_key=${API_KEY}&with_genres=10749`;
      movies = getMovieRows(this.props.movies.data, url);
    }
    return (
      <>
        (<MovieRow heading={"Romance"} movies={movies} />);
      </>
    )
  }
}


const mapStateToProps = (state) => {
  return { movies: state.romance }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchRomanceMovies }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RomanceMovies);
