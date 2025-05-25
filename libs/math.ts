const lerp = (start: number, end: number, value: number) =>
  start * (1.0 - value) + end * value

const clamp = (min: number, max: number, number: number) =>
  Math.max(min, Math.min(number, max))

const random = (min: number, max: number) => Math.random() * (max - min) + min

const distance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.hypot(x2 - x1, y2 - y1)

function truncate(value: number, decimals: number) {
  return parseFloat(value.toFixed(decimals))
}

function mapRange(
  min: number,
  max: number,
  valueToMap: number,
  newMin: number,
  newMax: number
) {
  if (valueToMap <= min) {
    return newMin
  }

  if (valueToMap >= max) {
    return newMax
  }

  valueToMap -= min
  max -= min

  const percentage = (valueToMap / max) * 100
  const newStep = (newMax - newMin) / 100

  return percentage * newStep + newMin
}

function modulo(numerator: number, divisor: number) {
  // Check for divisor zero
  if (divisor === 0) {
    return numerator // Return numerator or possibly NaN or throw an error as division by zero is undefined
  }

  // Check for negative divisor
  if (divisor < 0) {
    return NaN // Return NaN for negative divisor as it is not handled in this implementation
  }

  // Calculate and return non-negative modulo
  return ((numerator % divisor) + divisor) % divisor
}

const Maths = {
  lerp,
  random,
  distance,
  modulo,
  clamp,
  mapRange,
  truncate,
}

export { lerp, random, distance, modulo, clamp, mapRange, truncate }
export default Maths
