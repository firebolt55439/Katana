import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { fetchTrending, fetchPopularTv } from '../store/actions/index';
import { getMovieRows } from '../getMovie';

import { API_KEY } from '../store/actions/index';

import MovieRow from './MovieRow';

class TrendingMovies extends Component {

  componentDidMount() {
    this.props.fetchTrending();
    this.props.fetchPopularTv();
  }

  render() {
    let movies, tv;
    // Call getMoviesRows function only when we get the data back
    // from the API through redux
    if (this.props.trending.data) {
      const url = `/trending/all/week?api_key=${API_KEY}&language=en-US`;
      movies = getMovieRows(this.props.trending.data, url);
    }
    if (this.props.popularTv.data) {
      const url = `/tv/popular?api_key=${API_KEY}&language=en-US`;
      tv = getMovieRows(this.props.popularTv.data, url);
    }
    return (
      <>
        <MovieRow heading={"Trending Now"} movies={movies} />
        <MovieRow heading={"Popular TV"} movies={tv} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { trending: state.trending, popularTv: state.popularTv }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchTrending, fetchPopularTv }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingMovies);
