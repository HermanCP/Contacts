import axios from "axios";


const axiosInstance = axios.create({
  baseURL: 'http://172.20.10.3:3000/api/v1',
});


export default axiosInstance;