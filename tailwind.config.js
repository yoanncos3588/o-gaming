/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: ['business'],
    },
    plugins: [require('daisyui')],
};
