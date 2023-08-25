import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
});
