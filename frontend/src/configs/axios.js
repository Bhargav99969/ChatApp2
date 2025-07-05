import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:["https://chatapp2backend.onrender.com","http://localhost:3000/api"],
    withCredentials:true
})