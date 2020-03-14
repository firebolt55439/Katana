import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { fetchTopRated } from '../store/actions/index';
import { getMovieRows } from '../getMovie';

import { API_KEY } from '../store/actions/index';

import MovieRow from './MovieRow';

class TopRated extends Component {

  componentWillMount() {
    this.props.fetchTopRated();
  }

  render() {
    let movies
    // Call getMoviesRows function only when we get the data back 
    // from the API through redux 
    if (this.props.topRated.data) {
      const url = `/movie/top_rated?api_key=${API_KEY}&language=en-US`;
      movies = getMovieRows(this.props.topRated.data, url);
    }
    return (<MovieRow heading={"Top Rated Movies"} movies={movies} />);
  }
}

const mapStateToProps = (state) => {
  return { topRated: state.topRated }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchTopRated }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TopRated);
