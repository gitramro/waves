import { combineReducers } from 'redux';
import user from './User_Reducer';
import products from './Products_Reducer';
import site from './Site_Reducer';

const rootReducer = combineReducers({
    user,
    products,
    site
});

export default rootReducer;