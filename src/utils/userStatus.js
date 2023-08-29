export const isLoggedIn = (userData) => {
    return userData?.userId ? true : false;
};

export const isDeveloper = (userData) => {
    return userData?.role === 'developer';
};

export const isGamer = (userData) => {
    return userData?.role === 'gamer';
};
