import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:"https://chatapp2backend.onrender.com",
    withCredentials:true
})