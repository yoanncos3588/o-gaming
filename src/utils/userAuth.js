import store from './../store';

export const isLoggedIn = () => {
    return store.getState().user.userData.userId ? true : false;
};

export const isDeveloper = () => {
    return store.getState().user.userData.role === 'developer' && isLoggedIn();
};

export const isGamer = () => {
    return store.getState().user.userData.role === 'gamer' && isLoggedIn();
};
