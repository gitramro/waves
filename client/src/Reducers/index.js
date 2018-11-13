import { combineReducers } from 'redux';
import user from './User_Reducer';

const rootReducer = combineReducers({
    user
});

export default rootReducer;