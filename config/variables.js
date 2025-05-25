const colors = {
  black: '#000000',
  white: '#ffffff',
  green: '#00ff6a',
}

const themes = {
  light: {
    primary: colors.white,
    secondary: colors.black,
    contrast: colors.green,
  },
  dark: {
    primary: colors.black,
    secondary: colors.white,
    contrast: colors.green,
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
