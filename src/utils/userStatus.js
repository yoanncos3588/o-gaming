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

/**
 * Filter issues from api
 * @param {Array} data array of issues from api
 * @returns {Array} filtered issues for user
 */
export const filterPrivateIssues = (issuesList, userData, idDev) => {
    const filteredIssues = issuesList.filter((i) => {
        // if issue is not public we do more check
        if (!i.is_public) {
            // if connected user is creator of the issue its ok
            if (userData.userId === i.user_id) {
                return true;
            }
            // if connected user is a dev and is the game creator its ok
            if (isDeveloper(userData) && userData.userId === idDev) {
                return true;
            }
            // else we remove the private issue to hide it for user
            return false;
        } else {
            // issue is not private
            return true;
        }
    });
    return filteredIssues;
};
