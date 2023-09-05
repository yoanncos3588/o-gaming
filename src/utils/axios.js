import axios from 'axios';
import { isTokenExpired } from '../utils/token';
import { useAuth } from '../hook/useAuth';

/** instance of axios to access data with token */
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

/** Intercept request and add user token if exist to request header auth */
axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && !isTokenExpired()) {
        console.log('bearer');
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
