import {combineReducers} from 'redux'
import authReducer from './authReducer';
import contact from './contactReducers'

const rootReducer = combineReducers({
    authReducer: authReducer,
    contact
})

export default rootReducer;






