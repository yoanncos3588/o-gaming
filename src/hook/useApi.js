import { useState } from 'react';
import { axiosInstance } from '../utils/axios';

/**
 * This hook is use to centralized api calls, it can be called multiple times with destructuring
 * example : {get, data, loading} = useApi -> only once by component
 * example 2 : {get:getIssue, data:dataIssue, loading:loadingIssue} = useApi -> can be called multiple times by changing name while destructuring
 * @returns
 */
const useApi = () => {
    // state to store api result and use it in component
    const [data, setData] = useState(null);
    // state to know when api have finished request (succes or fail)
    const [loading, setLoading] = useState(false);
    // state to store error if something wrong happens
    const [error, setError] = useState(null);
    // state to know when api have finished (only succes), usefull for post, delete, patch
    const [isComplete, setIsComplete] = useState(false);

    /**
     * Main function for api calls
     * @param {string} url api's url (ex: http://myapiurl/issue)
     * @param {string} method type of request (patch, post, del, get), shortcut function are available below callApi function
     * @param {object} body data to send to the api, for post and patch
     * @param {string} objectKey only for get request, objectKey is the key of our response.data object example if objectKey = issue, result to setData(res.data.issue), its optionnal but usefull in components
     */
    const callApi = async (url, method, body = null, objectKey = null) => {
        setError(null);
        setLoading(true);
        try {
            const config = {
                method, // get/post/patch/del
                url, // api url
                data: body, // data to be send with our request when needed (post, patch)
            };
            const res = await axiosInstance(config);

            if (res.status === 200 || res.status === 201) {
                // api can send object with error and status 200
                if (Object.prototype.hasOwnProperty.call(res.data, 'error')) {
                    // throw = send to catch
                    throw Error(res.data.error);
                }
                if (objectKey) {
                    setData(res.data[objectKey]);
                } else {
                    setData(res.data);
                }
                // everything is ok
                setError(null);
                setIsComplete(true);
            } else {
                throw Error('An error has occured');
            }
        } catch (error) {
            if (error.response.data.error) {
                // sometimes api send an object with error key when error occured
                setError(error.response.data.error);
            } else {
                // if no custom message from api, we use classic error message
                setError(error.message);
            }
            setData(null);
            // is complete is only when api call is successfull
            setIsComplete(false);
        } finally {
            // isLoading do not depends on api succes, can be bad or good
            setLoading(false);
        }
    };

    // shortcut function, call this in component its simpler because most of params are already there
    const get = (url, objectKey) => callApi(url, 'get', null, objectKey);
    const post = (url, body) => callApi(url, 'post', body);
    const patch = (url, body) => callApi(url, 'patch', body);
    const del = (url) => callApi(url, 'delete');

    return {
        data,
        loading,
        error,
        isComplete,
        setData,
        get,
        post,
        patch,
        del,
    };
};

export default useApi;
