import { combineReducers } from 'redux';
import user from './User_Reducer';
import products from './Products_Reducer';

const rootReducer = combineReducers({
    user,
    products
});

export default rootReducer;