import { createStore, combineReducers } from 'redux';
import auth from './auth';

export const rootReducer = combineReducers({
	auth,
});

export default rootReducer;
