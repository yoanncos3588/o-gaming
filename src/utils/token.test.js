import { expect, test } from 'vitest';
import { decodeToken } from './token';

test('decode token give user informations', () => {
    expect(decodeToken());
});
