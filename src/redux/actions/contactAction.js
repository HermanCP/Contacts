
import http from "../../http-common";
import {
  FETCHING_LIST_CONTACT,
  FETCHING_LIST_CONTACT_SUCCESS,
  FETCHING_LIST_CONTACT_ERROR
} from './types';

export function isLoading(bool) {
  return {
    type: FETCHING_LIST_CONTACT,
    isLoading: bool,
  }
}

export function ListContactsSuccess(contact) {
  return {
    type: FETCHING_LIST_CONTACT_SUCCESS,
    contact
  }
}
export function errorResponce(error) {
    return {
      type: FETCHING_LIST_CONTACT_ERROR,
      error
    }
  }

export function GetListContacts(data) {
    console.log('masuk')
  return (dispatch) => {
    dispatch(isLoading(true));
    return http.get(`/Contacts`,
    ).then(response => {
        console.log(response)
      if (response.status === 201) {
        dispatch(isLoading(false))
        dispatch(ListContactsSuccess(response.data.data))
      }
      else {
        dispatch(isLoading(false))
        dispatch(ListContactsSuccess(response.data.data))

      }
    })
      .catch((error) => {
        dispatch(isLoading(false))
        dispatch(errorResponce(error.message))
      })
  };
}
