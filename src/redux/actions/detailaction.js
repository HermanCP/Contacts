
import http from "../../http-common";
import {
  FETCHING_DETAIL_CONTACT,
  FETCHING_DETAIL_CONTACT_SUCCESS,
  FETCHING_DETAIL_CONTACT_ERROR
} from './types';

export function isLoading(bool) {
  return {
    type: FETCHING_DETAIL_CONTACT,
    isLoading: bool,
  }
}

export function detailContactsSuccess(contact) {
  return {
    type: FETCHING_DETAIL_CONTACT_SUCCESS,
    contact
  }
}
export function errorResponce(error) {
    return {
      type: FETCHING_DETAIL_CONTACT_ERROR,
      error
    }
  }

export function GetDetailContacts(id) {
  console.log('masuk')
return (dispatch) => {
  dispatch(isLoading(true));
  return http.get(`/GetContacts/${id}`,
  ).then(response => {
      console.log(response)
    if (response.status === 201) {
      dispatch(isLoading(false))
      dispatch(detailContactsSuccess(response.data.data))
    }
    else {
      dispatch(isLoading(false))
      dispatch(detailContactsSuccess(response.data.data))

    }
  })
    .catch((error) => {
      dispatch(isLoading(false))
      dispatch(errorResponce(error.message))
    })
};
}