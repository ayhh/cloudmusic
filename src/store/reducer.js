// import {combineReducers} from 'redux';
import {combineReducers} from 'redux-immutable';
import {reducer as recommendReducer} from '@/pages/Discover/children/Recommend/store';
import {reducer as playerBarReducer} from '@/components/PlayBar/store';

const reducer = combineReducers({
  recommend: recommendReducer,
  player: playerBarReducer
})

export default reducer