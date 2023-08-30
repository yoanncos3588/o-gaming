import { isTokenExpired } from './token';

/**
 * check if user is still connected by checking token expiration time and store for more security
 * @param {*} userData
 * @returns
 */
export const isLoggedIn = (userData) => {
    if (isTokenExpired()) {
        return false;
    }
    return userData?.userId ? true : false;
};

export const isDeveloper = (userData) => {
    return userData?.role === 'developer' && isLoggedIn(userData);
};

export const isGamer = (userData) => {
    return userData?.role === 'gamer' && isLoggedIn(userData);
};
