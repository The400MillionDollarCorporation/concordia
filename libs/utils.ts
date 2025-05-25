/**
 * String Manipulation
 */
export const capitalize = (s: string) =>
  s
    .split(' ')
    .map((word) =>
      word === word.toUpperCase()
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ')

export const localise = (text: string) =>
  text.toLocaleLowerCase().replace(/\s|[0-9_]|\W|[#$%^&*()]/g, '')

export const convertToCamelCase = (inputString: string) => {
  return inputString.charAt(0).toLowerCase() + inputString.slice(1)
}

export const capitalizeFirstLetter = (inputString: string) => {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1)
}

/**
 * Number Formatting
 */
export function padWithZero(number: number) {
  return String(number).padStart(2, '0')
}

export const getIndex = (index: number) => {
  if (index < 10) {
    return `${0}${index}`
  } else return index
}

export const twoDigits = (number: number) =>
  number > 9 ? `${number}` : `0${number}`

export function numberWithCommas(x: { toString: () => string }) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Data Type Checks
 */
export const isBoolean = (value: any) => typeof value === 'boolean'

export const isBooleanAndTrue = (value: any) => {
  return isBoolean(value) && value
}

export const isBooleanAndFalse = (value: any) => {
  return isBoolean(value) && !value
}

export const checkIsArray = (value: any[]) => {
  return Array.isArray(value) ? value[0] : value
}

export const isEmptyObject = (obj: {}) => {
  if (!obj) return true

  return Object.keys(obj).length === 0
}

export const isEmptyArray = (arr: string | any[]) => {
  if (!arr) return true

  return Array.isArray(arr) && arr.length === 0
}

/**
 * Object Manipulation
 */
export const ObjectHasData = (obj: Object | null) =>
  Object.values(obj || {}).length > 0

export const arraytoObject = (array: any[]) =>
  array.reduce(
    (acc: { [x: string]: any }, currentObj: { [x: string]: any }) => {
      const key = Object.keys(currentObj)[0]
      acc[key] = currentObj[key]
      return acc
    },
    {}
  )

export const shortenObjectKeys = (obj: { [x: string]: any }, keyword: any) => {
  const regex = new RegExp(`[^]+${keyword}(.*)`)

  for (const key in obj) {
    const match = key.match(regex)

    if (match) {
      const newKey = convertToCamelCase(match[1])
      obj[newKey] = obj[key]
      delete obj[key]
    }
  }

  return obj
}

export const filterObjectKeys = (
  obj: { [x: string]: any },
  keyword: string
) => {
  let newObj = {}

  for (const key in obj) {
    const match = key.includes(keyword)

    if (match) {
      newObj[key] = obj[key]
    }
  }

  return newObj
}

export const iterableObject = (
  obj: ArrayLike<unknown> | { [s: string]: unknown }
) =>
  // eslint-disable-next-line no-unused-vars
  Object.entries(obj).map(([_, value]) => {
    return value
  })

/**
 * CSS and Event Utilities
 */

export const pxToVw = (px: number) => `${(px / window.innerWidth) * 100}vw`
export const pxToVh = (px: number) => `${(px / window.innerHeight) * 100}vh`
export const desktopVW = (value: number, width: number) =>
  (value * width) / 1440
export const mobileVW = (value: number, width: number) => (value * width) / 375
export const glMousePos = (e: { clientX: number; clientY: number }) => ({
  x: (e.clientX / window.innerWidth) * 2 - 1,
  y: -(e.clientY / window.innerHeight) * 2 + 1,
})

/**
 * Key Generation
 */
export const generateKey = (index: number, id?: string): string => {
  const uniquePart =
    id || Date.now().toString(36) + Math.random().toString(36).substring(2, 5)
  return `${index}-${uniquePart}`
}

/**
 * Environment Checks
 */
export const isDev = process.env.NODE_ENV === 'development'
