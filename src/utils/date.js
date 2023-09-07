/**
 * Format string to date yyyy-mm-dd
 * @param {string} date
 * @returns {string} date with format yyyy-mm-dd
 */
export const formatDate = (date) => {
    try {
        if (typeof date !== 'string') throw Error;
        const newDate = new Date(date);
        return newDate.toISOString().split('T')[0];
    } catch (error) {
        return '';
    }
};
