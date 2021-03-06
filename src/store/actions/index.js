import axios from '../../axios-movies';

import { TMDB_API_KEY, TMDB_API_KEY_SECONDARY} from './keys';

export const FETCH_TRENDING = 'FETCH_TRENDING';
export const FETCH_NETFLIX_ORIGINALS = 'FETCH_NETFLIX_ORIGINALS';
export const FETCH_TOP_RATED = 'FETCH_TOP_RATED';
export const FETCH_POPULAR_TV = 'FETCH_POPULAR_TV';
export const FETCH_ACTION_MOVIES = 'FETCH_ACTION_MOVIES';
export const FETCH_COMEDY_MOVIES = 'FETCH_COMEDY_MOVIES';
export const FETCH_HORROR_MOVIES = 'FETCH_HORROR_MOVIES';
export const FETCH_ROMANCE_MOVIES = 'FETCH_ROMANCE_MOVIES';
export const FETCH_DOCUMENTARIES = 'FETCH_DOCUMENTARIES';

export const API_KEY = TMDB_API_KEY;
export const API_KEY_SECONDARY = TMDB_API_KEY_SECONDARY;

export function fetchTrending() {
  const request = axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`);

  return {
    type: FETCH_TRENDING,
    payload: request
  }
}

export function fetchNetflixOriginals() {
  const request = axios.get(`/discover/tv?api_key=${API_KEY}&with_networks=213`);

  return {
    type: FETCH_NETFLIX_ORIGINALS,
    payload: request
  }
}

export function fetchTopRated() {
  const request = axios.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US`)

  return {
    type: FETCH_TOP_RATED,
    payload: request
  }
}

export function fetchPopularTv() {
  const request = axios.get(`/tv/popular?api_key=${API_KEY}&language=en-US`)

  return {
    type: FETCH_POPULAR_TV,
    payload: request
  }
}

export function fetchActionMovies() {
  const request = axios.get(`/discover/movie?api_key=${API_KEY}&with_genres=28`)

  return {
    type: FETCH_ACTION_MOVIES,
    payload: request
  }
}

export function fetchComedyMovies() {
  const request = axios.get(`/discover/movie?api_key=${API_KEY}&with_genres=35`)

  return {
    type: FETCH_COMEDY_MOVIES,
    payload: request
  }
}

export function fetchHorrorMovies() {
  const request = axios.get(`/discover/movie?api_key=${API_KEY}&with_genres=27`)

  return {
    type: FETCH_HORROR_MOVIES,
    payload: request
  }
}

export function fetchRomanceMovies() {
  const request = axios.get(`/discover/movie?api_key=${API_KEY}&with_genres=10749`)

  return {
    type: FETCH_ROMANCE_MOVIES,
    payload: request
  }
}

export function fetchDocumentaries() {
  const request = axios.get(`/discover/movie?api_key=${API_KEY}&with_genres=99`)

  return {
    type: FETCH_DOCUMENTARIES,
    payload: request
  }
}
