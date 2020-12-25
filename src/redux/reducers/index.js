import {combineReducers} from 'redux'
import authReducer from './authReducer';
import contact from './contactReducers'
import isfavorites from './favoritesReducers'
const rootReducer = combineReducers({
    authReducer: authReducer,
    contact,
    isfavorites
})

export default rootReducer;






