import { isTokenExpired } from './token';
import store from '../store';
import { logout } from '../store/reducers/user';

/**
 * check if user is still connected by checking token expiration time and store for more security
 */
export const isLoggedIn = () => {
    // if token exist user is logged
    if (localStorage.getItem('token')) {
        if (isTokenExpired()) {
            // if token is expired we disconnect user
            store.dispatch(logout());
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

export const isGuest = () => {
    return !!localStorage.getItem('token');
};

export const isDeveloper = (userData) => {
    return userData?.role === 'developer';
};

export const isGamer = (userData) => {
    return userData?.role === 'gamer';
};
