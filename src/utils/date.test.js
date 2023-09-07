import { expect, test } from 'vitest';
import { formatDate } from './date';

test('if function return date to format yyyy-mm-dd', () => {
    expect(formatDate('2023-09-04T19:22:49.913Z')).toEqual('2023-09-04');
    expect(formatDate('September 22, 2018 15:00:00')).toEqual('2018-09-22');
    expect(formatDate('2018-09-22T15:00:00')).toStrictEqual('2018-09-22');
});

test('if function return empty string if date is not valid', () => {
    expect(formatDate('2002-20-01')).toEqual('');
    expect(formatDate(0)).toEqual('');
    expect(formatDate(null)).toEqual('');
    expect(formatDate(undefined)).toEqual('');
});
