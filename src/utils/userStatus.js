import { isTokenExpired } from './token';
import store from '../store';
import { logout } from '../store/reducers/user';

/**
 * check if user is still connected by checking token expiration time and store for more security
 */
export const isLoggedIn = () => {
    // verifie si le token est présent
    if (localStorage.getItem('token')) {
        if (isTokenExpired()) {
            // si le token est expiré on logout
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
