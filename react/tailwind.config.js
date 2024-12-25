/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      /** 색상 */
      colors: {
        brand: '#1976D2',
        'ods-primary': '#232323',
        secondary: '#676767',
        tertiary: '#9A9A9A',
        caption: '#B3B3B3',
        black: '#000000',
        white: '#FFFFFF',
        'off-white': '#F8F8F8',
        card: '#FCFCFC',
        gray: {
          900: '#232323',
          800: '#454545',
          700: '#676767',
          600: '#787878',
          500: '#9A9A9A',
          400: '#B3B3B3',
          300: '#CDCDCD',
          200: '#E2E2E2',
          100: '#F8F8F8',
          50: '#FCFCFC',
        },
        // colors -> 상태 ----- //
        state: {
          danger: '#DD0027',
          warning: 'FF8A00',
          success: '#00DD31',
          info: '#0066FE',
        },
        // colors -> border ----- //
        borderActive: '#232323',
        borderPrimary: '#E2E2E2',
        borderSecondary: '#B3B3B3',
      },
      /** 텍스트 크기 */
      fontSize: {
        xxxl: '1.5em',
        xxl: '1.38em',
        xl: '1.25em',
        lg: '1.13em',
        md: '1em',
        sm: '0.88em',
        xs: '0.75em',
        xxs: '0.69em',
        // fontSize -> typography ----- //
        h1: ['1.5em', { fontWeight: 700, lineHeight: '2.38em' }],
        h2: ['1.38em', { fontWeight: 700, lineHeight: '2.13em' }],
        h3: ['1.25em', { fontWeight: 700, lineHeight: '2em' }],
        h4: ['1.13em', { fontWeight: 400, lineHeight: '1.75em' }],
        title1: ['1em', { fontWeight: 700, lineHeight: '1.5em' }],
        title2: ['1em', { fontWeight: 400, lineHeight: '1.5em' }],
        title3: ['0.88em', { fontWeight: 700, lineHeight: '1.25em' }],
        title4: ['0.88em', { fontWeight: 400, lineHeight: '1.25em' }],
        body1: ['0.75em', { fontWeight: 700, lineHeight: '1.13em' }],
        body2: ['0.75em', { fontWeight: 400, lineHeight: '1.13em' }],
        body3: ['0.69em', { fontWeight: 400, lineHeight: '1em' }],
      },
      /** 텍스트 굵기 */
      fontWeight: {
        bold: 700,
        regular: 400,
      },
      /** padding, margin */
      spacing: {
        xxxl: '3em',
        xxl: '2em',
        xl: '1.5em',
        lg: '1.25em',
        md: '1em',
        sm: '0.75em',
        xs: '0.5em',
        xxs: '0.25em',
        xxxs: '0.13em',
      },
      // 레이아웃별 사이즈
      width: {
        mobile: '20.5em',
        desktop: '80em',
      },
      // 레이아웃 사이즈
      screens: {
        mobile: '20.5em',
        desktop: '80em',
      },
    },
  },
  plugins: [],
};
