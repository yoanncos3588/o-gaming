import jwt_decode from 'jwt-decode';

/**
 * Retrieve user info frome token body
 * @param {*} token
 * @returns {object} {userId, role}
 */
export const decodeToken = (token) => {
    const decoded = jwt_decode(token);
    const userdata = {
        userId: decoded.userId,
        username: decoded.username,
        role: decoded.role,
    };
    return userdata;
};
