import { expect, test, it, describe, afterEach, vi } from 'vitest';
import { decodeToken, setUserTokens, getTokenExpirationDate } from './token';

const testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJyb2xlIjoiZGV2ZWxvcGVyIiwidXNlcm5hbWUiOiJkZXYiLCJpYXQiOjE2OTQwODg3OTcsImV4cCI6MTY5NDA5MjM5N30.A8nKVZAFt5Xmrf0UU7H16--jn4l4-XhzgoFyeAUbS1M';

const fakeUserData = { userId: 11, username: 'dev', role: 'developer' };
// const tokenKey = 'token';
// const tokenExpKey = 'token_exp';
// const userKey = 'user';

describe('decode token', () => {
    describe('get info from token', () => {
        test('decode token give user informations', () => {
            expect(decodeToken(testToken)).toStrictEqual(fakeUserData);
        });

        test('decode token return null if token is null or undefined', () => {
            expect(decodeToken(undefined)).toBeNull();
        });

        test('decode token return null if token cant be decode', () => {
            expect(decodeToken('1c2VySWQiOjExLCJyb2xlIjoiZGV2ZWx')).toBeNull();
        });
    });
});

// describe('Infos in local storage', () => {
//     const setItemSpy = vi.spyOn(global.Storage.prototype, 'setItem'); // spy set items calls

//     afterEach(() => {
//         localStorage.clear();
//         setItemSpy.mockClear(); // clear call history
//     });
//     describe('set token and infos to LocalStorage', () => {
//         it('set token to LocalStorage', () => {
//             setUserTokens(fakeUserData, testToken);

//             expect(setItemSpy).toHaveBeenCalledWith();
//         });
//     });
// });
