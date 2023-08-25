import axios from 'axios';

/** instance of axios to access data with token */
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

/** Intercept request and add user token if exist to request header auth */
axiosInstance.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});
