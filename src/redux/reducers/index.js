import {combineReducers} from 'redux'
import authReducer from './authReducer';
import contact from './contactReducers'
import isfavorites from './favoritesReducers'
import detailContacts from './detailReducers'
const rootReducer = combineReducers({
    authReducer: authReducer,
    contact,
    isfavorites,
    detailContacts
})

export default rootReducer;






