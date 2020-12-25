
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
const updateUser = async(data) => {
  console.log('data  user ======>', data)
  let nonfile ={
    user_id: String(data.id),
    name_personel:data.name_personel,
    nrp_nip: data.nrp_nip,
    no_hp: data.no_hp,
    id_pangkat: String(data.pangkat),
    id_jabatan: String(data.jabatan),
    id_polda:String(data.polda),
    id_polres: String(data.polres),
    id_polsek: String(data.polsek),
    password:data.password,
    confirm_password:data.confirm_password
  }
  if(data.file == null){
     return http.post(`/updateUser`, nonfile)
  }else{
    return  RNFetchBlob.fetch(
      'POST',
      'http://222.124.251.69:443/api/v1/updateUser',
      {
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'files', filename: data.file.fileName, data: RNFetchBlob.wrap(data.file.uri)},
        {name : 'name_personel', data:data.name_personel},
        {name : 'nrp_nip', data:data.nrp_nip},
        {name : 'no_hp', data:data.no_hp},
        {name : 'id_pangkat', data:String(data.pangkat)},
        {name : 'id_jabatan', data:String(data.jabatan)},
        {name : 'id_polda', data:String(data.polda)},
        {name : 'id_polres', data:String(data.polres)},
        {name : 'id_polsek', data:String(data.polsek)}, 
        {name : 'user_id', data:String(data.id)}, 
      ],
    )
  }
  
};
const GetContacts =(id)=> {
  return http.get(`/GetContacts/${id}`)
}

export default {
    AddContact,
    GetContacts,
    updateUser,
};