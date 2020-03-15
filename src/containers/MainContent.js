import React, { Component } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

import TrendingMovies from './TrendingMovies';
import NetflixOriginals from './NetflixOriginals';
import TopRated from './TopRated';
import GenericMovieRow from './GenericMovieRow';

import { API_KEY } from '../store/actions/index';

import GENRE_IDS from './genres.json';

/**
 * Shuffles array in place. ES6 version
 * @source https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class MainContent extends Component {

  state = {
    /** Will hold our chosen movie to display on the header */
    selectedMovie: {},
    selectedGenres: {}
  };

  componentWillMount = () => {
    var tvArr = GENRE_IDS["tv"], movieArr = GENRE_IDS["movie"];
    shuffle(tvArr);
    shuffle(movieArr);

    const arr = [tvArr, movieArr];
    var genreNodes = [];
    for (var i = 0; i < 2; i++) {
      const on = arr[i];
      for (var j = 0; j < 3; j++) {
        genreNodes.push(<GenericMovieRow key={Math.random().toString() + on[j]["id"]} type={i == 1 ? "movie" : "tv"} heading={on[j]["name"]} genre={on[j]["id"]} />);
      }
    }
    shuffle(genreNodes);

    this.state.selectedGenres = genreNodes;
  }

  componentDidMount = () => {
    this.getMovie();
  };


  getMovie = () => {
    Array.prototype.random = function () {
      return this[Math.floor((Math.random()*this.length))];
    };
    /** ID for Star Trek: Picard  */
    const movieId = 85949;
    /** Make Api call to retrieve the details for a single movie  */
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`;
    // const url = `https://api.themoviedb.org/3/tv/${movieId}?api_key=${API_KEY}`;
    axios
      .get(url)
      .then(res => {
        const movieData = res.data.results.random();
        this.setState({ selectedMovie: movieData });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <Header movie={this.state.selectedMovie} />
        <div className="movieShowcase">
          <NetflixOriginals />
          <TrendingMovies />
          <TopRated />
          {/*<ActionMovies />*/}
          {/*<ComedyMovies />*/}
          {/* <HorrorMovies /> */}
          {/*<Documentaries />*/}
          {this.state.selectedGenres}
        </div>
        <Footer />
      </div>
    );
  }
}

export default MainContent; 
