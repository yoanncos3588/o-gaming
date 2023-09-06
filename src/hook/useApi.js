import { useState } from 'react';
import { axiosInstance } from '../utils/axios';

const useApi = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isComplete, setIsComplete] = useState(false);

    const callApi = async (url, method, body = null) => {
        setLoading(true);
        try {
            const config = {
                method,
                url,
                data: body,
            };
            const res = await axiosInstance(config);
            console.log(res);
            if (res.status === 200 || res.status === 201) {
                // api can send error with status 200
                if (Object.prototype.hasOwnProperty.call(res.data, 'error')) {
                    throw Error(res.data.error);
                }
                setData(res.data);
                setError(null);
                setIsComplete(true);
            } else {
                throw Error('An error has occured');
            }
        } catch (error) {
            setError(error.message);
            setData(null);
            setIsComplete(false);
        } finally {
            setLoading(false);
        }
    };

    const get = (url) => callApi(url, 'get');
    const post = (url, body) => callApi(url, 'post', body);
    const patch = (url, body) => callApi(url, 'patch', body);
    const del = (url) => callApi(url, 'delete');

    return {
        data,
        loading,
        error,
        isComplete,
        get,
        post,
        patch,
        del,
    };
};

export default useApi;
