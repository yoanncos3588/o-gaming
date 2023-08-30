import jwt_decode from 'jwt-decode';
import store from './../store';
import { logout } from './../store/reducers/user';

/**
 * Retrieve user info frome token body
 * @param {string} token
 * @returns {object} {userId, role}
 */
export const decodeToken = (token) => {
    if (token || token !== undefined) {
        const decoded = jwt_decode(token);
        const userData = {
            userId: decoded.userId,
            username: decoded.username,
            role: decoded.role,
        };
        return userData;
    } else {
        return null;
    }
};

/**
 * Save user infos and login info in localstorage
 * @param {object} userData
 * @param {string} token
 */
export const setUserTokens = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('token_exp', JSON.stringify(getTokenExpirationDate()));
};

/**
 * Delete user's tokens and info from localstorage
 */
export const removeUserTokens = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('token_exp');
};

/**
 * Get expiration date from user token
 * @returns {number || null} expiration time or null if no token found
 */
export const getTokenExpirationDate = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        return decoded.exp;
    } else {
        return null;
    }
};

/**
 * Check if user token from local storage is still valid
 * @returns {boolean}
 */
export const isTokenExpired = () => {
    const exp = Number(localStorage.getItem('token_exp'));
    if (!exp) {
        return true;
    }
    if (exp * 1000 < new Date().getTime()) {
        //disconnect user
        store.dispatch(logout());
        return true;
    } else {
        return false;
    }
};
