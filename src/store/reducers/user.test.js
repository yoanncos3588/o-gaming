import userReducer from './user';
import { initialState } from './user';

import { it, describe, expect } from 'vitest';

import { login, updateCredentials, logout } from './user';

describe('test user reducer', () => {
    it('should return initial state when called without args', () => {
        expect(userReducer(initialState, {})).toBe(initialState);
    });
    // it('should login fullfiled', () => {
    //   const
    // })
});
