import { FETCH_NETFLIX_ORIGINALS, FETCH_POPULAR_TV } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_NETFLIX_ORIGINALS:
    case FETCH_POPULAR_TV:
      const data = action.payload.data.results;
      return { ...state, data }
    default:
      return state;
  }
}
