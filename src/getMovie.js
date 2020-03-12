import MovieGenre from './components/MovieGenre';
import React from 'react';

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

export function getMovieRows(movies, url) {
  let movieRow = movies.map((movie) => {
    let movieImageUrl = "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path;
    if (url.indexOf("with_networks=213") !== -1) {
      movieImageUrl = "https://image.tmdb.org/t/p/original/" + movie.poster_path;
    }

    if (movie.poster_path && movie.backdrop_path !== null) {
      const movieComponent = <MovieGenre
        key={movie.id}
        url={url}
        posterUrl={movieImageUrl}
        movie={movie} />;

      return movieComponent;
    }
  });

  shuffle(movieRow);

  return movieRow
}
