module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        0: 'var(--bg-0)',
        1: 'var(--bg-1)',
        2: 'var(--bg-2)',
        3: 'var(--bg-3)',
        4: 'var(--bg-4)',
        highlight: {
          DEFAULT: 'var(--bg-4)',
          dark: 'var(--bg-3)',
        },
        danger: 'var(--danger)',
        info: 'var(--info)',
        success: 'var(--success)',
        warn: 'var(--warn)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
        danger: 'var(--danger-dark)',
        info: 'var(--info-dark)',
        success: 'var(--success-dark)',
        warn: 'var(--warn-dark)',
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
        0: 'var(--text-0)',
        1: 'var(--text-1)',
        2: 'var(--text-2)',
        3: 'var(--text-3)',
        4: 'var(--text-4)',
        danger: 'var(--danger)',
        info: 'var(--info)',
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
      pointerEvents: ['disabled'],
    },
  },
  plugins: [],
};
