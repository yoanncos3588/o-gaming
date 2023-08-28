import store from './../store';

export const isLoggedIn = () => {
    return store.getState().user.userId ? true : false;
};

export const isDeveloper = () => {
    return store.getState().user.role === 'developer' && isLoggedIn();
};

export const isGamer = () => {
    return store.getState().user.role === 'gamer' && isLoggedIn();
};
