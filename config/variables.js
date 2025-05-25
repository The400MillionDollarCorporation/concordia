const colors = {
  black: '#2D2D27',
  white: '#F8F8F6',
  green: '#708238',
  brown: '#9A886C',
}

const themes = {
  light: {
    primary: colors.white,
    secondary: colors.black,
    white: colors.white,
    black: colors.black,
    green: colors.green,
    brown: colors.brown,
  },
  dark: {
    primary: colors.black,
    secondary: colors.white,
    white: colors.white,
    black: colors.black,
    green: colors.green,
    brown: colors.brown,
  },
}

const scrollOptions = {
  duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 0.7,
  touchMultiplier: 1,
  smoothTouch: false,
  infinite: false,
}

const breakpoints = {
  mobile: '375px',
  mobile2x: '480px',
  mobile3x: '600px',
  tablet: '768px',
  tablet2x: '992px',
  tablet3x: '1024px',
  desktop: '1200px',
  desktop2x: '1440px',
}

module.exports = {
  colors,
  themes,
  breakpoints,
  scrollOptions,
}
