import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { fetchActionMovies, API_KEY } from '../store/actions/index';
import { getMovieRows } from '../getMovie';

import MovieRow from './MovieRow';

class ActionMovies extends Component {

  componentWillMount() {
    this.props.fetchActionMovies();
  }

  render() {
    let movies;
    // Call getMoviesRows function only when we get the data back 
    // from the API through redux 
    if (this.props.actionMovies.data) {
      const url = `/discover/movie?api_key=${API_KEY}&with_genres=28`;
      movies = getMovieRows(this.props.actionMovies.data, url);
    }
    return (<MovieRow heading={"Action Movies"} movies={movies} />);
  }
}

const mapStateToProps = (state) => {
  return { actionMovies: state.action }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchActionMovies }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionMovies);
