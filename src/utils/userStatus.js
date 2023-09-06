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
        return canUserSeeIssue(i, userData, idDev);
    });
    return filteredIssues;
};

/**
 * Test if user can see an issue, depends on issue's status and user role
 * @param {object} issue issue object to test
 * @param {*} userData user data from store
 * @param {*} idDev id of the game creator
 * @returns {boolean}
 */
export const canUserSeeIssue = (issue, userData, idDev) => {
    if (!issue.is_public) {
        if (userData) {
            // if connected user is creator of the issue its ok
            if (issue.user_id === userData.userId) {
                return true;
            }
            // if connected user is a dev and is the game creator its ok
            if (isDeveloper(userData) && userData.userId === idDev) {
                return true;
            }
            // not matching criteria
            return false;
        } else {
            // no userData = user is not logged not ok
            return false;
        }
    } else {
        // issue is not private it's ok
        return true;
    }
};
