
import http from "../../http-common";
import {
  ADD_TO_FAVORITES,
  REMOVE_TO_FAVORITES,
  LOADING_ADD_TO_FAVORITE,
  FAVORITE_ERROR
} from './types';

export function isLoadingFavorites(bool) {
  return {
    type: LOADING_ADD_TO_FAVORITE,
    isLoading: bool,
  }
}
export function addFavorites(favorites) {
  return {
    type: ADD_TO_FAVORITES,
    favorites
  }
}
export function removeFavorites(favorites) {
    return {
      type: REMOVE_TO_FAVORITES,
      favorites
    }
  }
export function errorResponce(error) {
  return {
    type: FAVORITE_ERROR,
    error
  }
}

export function AddFavorites(data) {
    console.log('masukkkk')
  return (dispatch) => {
    dispatch(isLoadingFavorites(true));
    return http.post(`/AddToFavorites`,data
    ).then(response => {
      console.log(response)
      if (response.status === 201) {
        dispatch(isLoadingFavorites(false))
        dispatch(addFavorites(response.data.status))
      }
      else {
        dispatch(isLoadingFavorites(false))
        dispatch(addFavorites(response.data.status))

      }
    })
      .catch((error) => {
        dispatch(isLoadingFavorites(false))
        dispatch(errorResponce(error.message))
      })
  };
}
export function RemoveFavorites(data) {
  return (dispatch) => {
    dispatch(isLoadingFavorites(true));
    return http.post(`/RemoveToFavorites`,data
    ).then(response => {
      console.log(response)
      if (response.status === 201) {
        dispatch(isLoadingFavorites(false))
        dispatch(removeFavorites(response.data.status))
      }
      else {
        dispatch(isLoadingFavorites(false))
        dispatch(removeFavorites(response.data.status))

      }
    })
      .catch((error) => {
        dispatch(isLoadingFavorites(false))
        dispatch(errorResponce(error.message))
      })
  };
}