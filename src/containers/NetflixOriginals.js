import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { getMovieRows } from '../getMovie';
import { fetchNetflixOriginals } from '../store/actions/index';

import { API_KEY } from '../store/actions/index';

import MovieRow from './MovieRow';

class NetflixOriginals extends Component {

  componentDidMount() {
    this.props.fetchNetflixOriginals();
  }

  render() {
    let movies
    // Call getMoviesRows function only when we get the data back 
    // from the API through redux 
    if (this.props.movies.data) {
      const url = `/discover/tv?api_key=${API_KEY}&with_networks=213`;
      movies = getMovieRows(this.props.movies.data, url);
    }
    return (<MovieRow heading={"Netflix Originals"} movies={movies} />);
  }
}


const mapStateToProps = (state) => {
  return { movies: state.netflixOriginals }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchNetflixOriginals }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NetflixOriginals);
