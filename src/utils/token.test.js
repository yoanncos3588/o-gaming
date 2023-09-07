import { expect, test, describe } from 'vitest';
import { decodeToken } from './token';

const testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJyb2xlIjoiZGV2ZWxvcGVyIiwidXNlcm5hbWUiOiJkZXYiLCJpYXQiOjE2OTQwODg3OTcsImV4cCI6MTY5NDA5MjM5N30.A8nKVZAFt5Xmrf0UU7H16--jn4l4-XhzgoFyeAUbS1M';

const fakeUserData = { userId: 11, username: 'dev', role: 'developer' };

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
