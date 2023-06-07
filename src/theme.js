import objectUtils from './utils/objects';

const { flatten } = objectUtils;

const theme = {};

theme.palette = {
  primary: [
    '#B37FEB',
    '#D9EEFF',
    '#84CDBDAA',
  ],
  secondary: ['#87E8DE'],
  white: ['#FFFFFF'],
  black: ['#000000'],
  grayscale: ['#F5F5F5'],
  red: ['#FF4D4F'],
  yellow: ['#FAAD14'],
  green: ['#0d200e'],
  blue: ['#1890FF'],
};

theme.reversePalette = {
  primary: ['#FFFFFF'],
  black: ['#FFFFFF'],
  white: ['#000000'],
  grayscale: ['#F5F5F5'],
};

theme.fonts = {
  primary: 'ABC Gravity Expanded',
  secondary: 'ABC Gravity Expanded',
};
const sizes = {
  padding: {
    // default: '12px',
    // large: '36px',
  },
  margin: {
    // default: '12px',
    // large: '24px',
  },
  maxWidth: '40000px',
  mobileBreakpoint: '40024px',
};

theme.sizes = flatten(sizes);

export default theme;
