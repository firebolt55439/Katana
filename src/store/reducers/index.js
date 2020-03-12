import { combineReducers } from 'redux';
import TrendingReducer from './reducerTrending';
import NetflixOriginalsReducer from './reducerNetflixOriginals';
import TopRatedReducer from './reducerTopRated';
import ActionMoviesReducer from './reducerActionMovies';
import ComedyMoviesReducer from './reducerComedyMovies';
import HorrorMoviesReducer from './reducerHorrorMovies';
import RomanceMoviesReducer from './reducerRomanceMovies';
import DocumentaryReducer from './reducerDocumentary';

function defaultReducer(state = {}, action) {
  switch (action.type) {
    default:
      if ("payload" in action && "data" in action.payload && "results" in action.payload.data) {
      	const data = action.payload.data.results;
      	return { ...state, data };
      }
      return state;
  }
}

const rootReducer = combineReducers({
  trending: TrendingReducer,
  popularTv: NetflixOriginalsReducer,
  netflixOriginals: NetflixOriginalsReducer,
  topRated: TopRatedReducer,
  action: ActionMoviesReducer,
  comedy: ComedyMoviesReducer,
  horror: HorrorMoviesReducer,
  romance: RomanceMoviesReducer,
  documentary: DocumentaryReducer
});

export default rootReducer;
