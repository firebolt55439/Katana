import { combineReducers } from 'redux';
import TrendingReducer from './reducerTrending';
import NetflixOriginalsReducer from './reducerNetflixOriginals';
import TopRatedReducer from './reducerTopRated';

const rootReducer = combineReducers({
  trending: TrendingReducer,
  popularTv: NetflixOriginalsReducer,
  netflixOriginals: NetflixOriginalsReducer,
  topRated: TopRatedReducer
});

export default rootReducer;
