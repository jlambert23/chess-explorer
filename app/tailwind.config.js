module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        home: '10% auto 5%',
        sidebar: 'min-content 7% auto 8%',
      },
      height: {
        'screen-90': '90vh',
        'screen-80': '80vh',
        'screen-70': '70vh',
        'screen-60': '60vh',
        'screen-50': '50vh',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
