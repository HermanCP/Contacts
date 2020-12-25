import {
    LOADING_ADD_TO_FAVORITE,
    ADD_TO_FAVORITES,
    REMOVE_TO_FAVORITES,
    FAVORITE_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    isLoading: false,
    isfavorites: false,
    error: undefined
}

export default function contacts(state = INITIAL_STATE, action) {
    console.log(action.type)
    switch (action.type) {
        case LOADING_ADD_TO_FAVORITE:
            return {
                ...state,
                isLoading: true,
            }
        case ADD_TO_FAVORITES:
            return {
                ...state,
                isLoading: false,
                isfavorites: action.favorites,
                error: undefined
            }
            case REMOVE_TO_FAVORITES:
            return {
                ...state,
                isLoading: false,
                isfavorites: action.favorites,
                error: undefined
            }
        case FAVORITE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}
