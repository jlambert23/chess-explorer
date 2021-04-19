module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        danger: 'var(--danger)',
        success: 'var(--success)',
        warn: 'var(--warn)',
      },
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
      listStyleType: {
        circle: 'circle',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
        danger: 'var(--danger)',
        success: 'var(--success)',
        warn: 'var(--warn)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      brightness: ['focus', 'hover'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
