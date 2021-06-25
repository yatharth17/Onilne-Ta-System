import { combineReducers } from 'redux';
import posts from './posts';
import ta from './ta';
import setuser from './user';

export const reducers = combineReducers({ 
    posts, 
    ta, 
    setuser,
});