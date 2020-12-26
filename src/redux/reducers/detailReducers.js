import {
    FETCHING_DETAIL_CONTACT,
    FETCHING_DETAIL_CONTACT_SUCCESS,
    FETCHING_DETAIL_CONTACT_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    isLoading: false,
    DetailContacts: [],
    error: undefined
}

export default function contacts(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCHING_DETAIL_CONTACT:
            return {
                ...state,
                isLoading: true,
            }
        case FETCHING_DETAIL_CONTACT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                DetailContacts: action.contact,
                error: undefined
            }
        case FETCHING_DETAIL_CONTACT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}
