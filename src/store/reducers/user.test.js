import userReducer from './user';
import { initialState } from './user';
import { it, describe, expect } from 'vitest';
import { login, updateCredentials, logout } from './user';
import { setUserTokens } from '../../utils/token';

const fakeUserData = { userId: 11, username: 'dev', role: 'developer' };
const testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJyb2xlIjoiZGV2ZWxvcGVyIiwidXNlcm5hbWUiOiJkZXYiLCJpYXQiOjE2OTQwODg3OTcsImV4cCI6MTY5NDA5MjM5N30.A8nKVZAFt5Xmrf0UU7H16--jn4l4-XhzgoFyeAUbS1M';

describe('test user reducer', () => {
    it('should return initial state when called without args', () => {
        expect(userReducer(initialState, {})).toBe(initialState);
    });
    it('should login fullfiled', () => {
        const action = login.fulfilled(fakeUserData, 'login');
        const state = userReducer(initialState, action);
        expect(state.userData).toEqual(fakeUserData);
    });
    it('should login reject', () => {
        const action = login.rejected(null, 'login');
        const state = userReducer(initialState, action);
        expect(state.loginErrorMessage).toEqual('An unexpected error occured');
        expect(state.credentials).toEqual({ email: '', password: '' });
        expect(state.userData).toEqual(null);
    });
    it('should update credential', () => {
        const action = updateCredentials({
            name: 'email',
            value: 'dev@dev.fr',
        });
        const expectedState = {
            ...initialState,
            credentials: { email: 'dev@dev.fr', password: '' },
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });
    it('should delete userData and empty local storage', () => {
        const loggedState = {
            ...initialState,
            userData: { userId: 12, username: 'test', role: 'gamer' },
        };
        setUserTokens(fakeUserData, testToken);
        const action = logout();
        const expectedState = { ...initialState, userData: null };
        expect(userReducer(loggedState, action)).toEqual(expectedState);
        expect(localStorage.getItem('token')).toEqual(null);
        expect(localStorage.getItem('token_exp')).toEqual(null);
        expect(localStorage.getItem('user')).toEqual(null);
    });
});
