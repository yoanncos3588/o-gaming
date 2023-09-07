import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

import Issue from './Issue';

import { it, describe, expect, beforeAll, afterAll, test } from 'vitest';
import { shallow } from 'enzyme';

describe('test compenants issue', () => {
    describe('test structure', () => {
        test('should be a function', () => {
            expect(typeof fetchdata).toBe('function');
        });
    });
});
