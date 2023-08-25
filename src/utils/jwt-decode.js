import jwt_decode from 'jwt-decode';

export const decodeToken = (token) => {
    const decoded = jwt_decode(token);
    const userdata = {
        userId: decoded.userId,
        role: decoded.role,
    };
    return userdata;
};
