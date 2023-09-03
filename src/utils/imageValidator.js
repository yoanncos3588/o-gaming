import isUrl from 'is-url';

/**
 * Test if image url end with image extension .jpg, .png
 * @param {string} imageUrl
 * @returns {boolean}
 */
const isImageExstensionOk = (imageUrl) => {
    const extension = imageUrl.slice(-4);
    return extension === '.jpg' || extension === '.png';
};

/**
 * Create an image object from image url to get meta
 * @param {string} url image url
 * @returns
 */
const getImageMeta = (url) => {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.src = url;
    });
};

/**
 * Test if image url is a valid url and size is ok
 * @param {string} imageUrl
 * @returns {boolean}
 */
export const isImageValid = async (imageUrl) => {
    if (!isUrl(imageUrl) || !isImageExstensionOk(imageUrl)) {
        return false;
    }
    try {
        const img = await getImageMeta(imageUrl);
        const w = img.width;
        const h = img.height;
        if (w && w === 1200 && h && h === 600) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};
