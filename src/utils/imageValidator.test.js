import { expect, it, describe } from 'vitest';
import { exportForTesting, isImageValid } from './imageValidator';

const imageUrl = 'https://i.imgur.com/asAuCMn.jpg';
const wrongUrl = 'http://url.com/file.pdf';
const wrongSize =
    'https://upload.wikimedia.org/wikipedia/commons/f/fe/Face_2_1.JPG';

const { isImageExstensionOk } = exportForTesting;

describe('test image validator', () => {
    it('should return if url ends with a .png or .jpg', () => {
        expect(isImageExstensionOk(imageUrl)).toBeTruthy();
        expect(isImageExstensionOk(wrongUrl)).toBeFalsy();
        expect(isImageExstensionOk(wrongSize)).toBeFalsy();
        expect(isImageExstensionOk(3)).toBeFalsy();
        expect(isImageExstensionOk(undefined)).toBeFalsy();
    });
    it('should say if an url is a .jpg or .png of 1600px by 600px', () => {
        expect(isImageValid(imageUrl)).toBeTruthy();
        expect(isImageValid(wrongUrl)).toBeTruthy();
        expect(isImageValid(wrongSize)).toBeTruthy();
        expect(isImageValid(2)).toBeTruthy();
        expect(isImageValid(undefined)).toBeTruthy();
        expect(isImageValid(null)).toBeTruthy();
    });
});
