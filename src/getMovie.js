import MovieGenre from './components/MovieGenre';
import React from 'react';

export function getMovieRows(movies, url) {
  const movieRow = movies.map((movie) => {
    let movieImageUrl = "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path;
    if (url.indexOf("with_networks=213") !== -1) {
      movieImageUrl = "https://image.tmdb.org/t/p/original/" + movie.poster_path;
    }

    if (movie.poster_path && movie.backdrop_path !== null) {
      const movieComponent = <MovieGenre
        key={movie.id}
        url={url}
        posterUrl={movieImageUrl}
        movie={movie} />

      return movieComponent;
    }
  });

  return movieRow
}
