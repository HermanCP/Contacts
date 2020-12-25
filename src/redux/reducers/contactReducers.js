import {
    FETCHING_LIST_CONTACT,
    FETCHING_LIST_CONTACT_SUCCESS,
    FETCHING_LIST_CONTACT_ERROR

} from '../actions/types';

const INITIAL_STATE = {
    isLoading: false,
    ListContacts:[],
    error: undefined
}

export default function contacts(state = INITIAL_STATE, action) {
    console.log(action.type)
    switch (action.type) {
        case FETCHING_LIST_CONTACT:
            return {
                ...state,
                isLoading: true,
            }
        case FETCHING_LIST_CONTACT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ListContacts: action.contact,
                error: undefined
            }
        case FETCHING_LIST_CONTACT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}
