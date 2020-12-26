
import {
    Platform,
} from 'react-native'
import http from "../http-common";
import RNFetchBlob from 'rn-fetch-blob'



const AddContact = async(data) => {
    console.log('data  user ======>', data)
    const realPath = Platform.OS === 'ios' ? data.files.uri.replace('file://', '') : data.files.uri;
    return  RNFetchBlob.fetch(
      'POST',
      'http://172.20.10.3:3000/api/v1/AddContacts',
      {
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'files', filename: data.files.fileName, data: RNFetchBlob.wrap(realPath)},
        {name : 'firstName', data:data.firstName},
        {name : 'lastName', data:data.lastName},
        {name : 'mobile', data:data.mobile},
        {name : 'email', data:data.email}
      ],
    )
};
const updateContacts = async(data,id) => {
  console.log('data  user ======>', data)
  let nonfile ={
    firstName: data.firstName,
    lastName:data.lastName,
    mobile: data.mobile,
    email: data.email,
  }
  if(data.files == null){
    return http.put(`/UpdateContacts/${id}`, nonfile)
  }else{
    let t = `http://172.20.10.3:3000/api/v1/UpdateContacts/${id}`
    console.log('masuk ada file',t)
    const realPath = Platform.OS === 'ios' ? data.files.uri.replace('file://', '') : data.files.uri;
    return  RNFetchBlob.fetch(
      'PUT',
      `http://172.20.10.3:3000/api/v1/UpdateContacts/${id}`,
      {
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'files', filename: data.files.fileName, data: RNFetchBlob.wrap(realPath)},
        {name : 'firstName', data:data.firstName},
        {name : 'lastName', data:data.lastName},
        {name : 'mobile', data:data.mobile},
        {name : 'email', data:data.email}
      ],
    )
  }
};
const GetContacts =(id)=> {
  return http.get(`/GetContacts/${id}`)
}
const DeleteContacts =(id)=> {
  return http.delete(`/DeleteContacts/${id}`)
}

export default {
    AddContact,
    GetContacts,
    updateContacts,
    DeleteContacts
};