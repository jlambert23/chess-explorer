module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        sidebar: 'min-content 7% auto 8%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
