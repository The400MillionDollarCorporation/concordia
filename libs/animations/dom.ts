import { gsap } from '~/libs/gsap'

const map = (array, iteratee) => {
  let index = -1
  const length = array == null ? 0 : array.length
  const result = new Array(length)

  while (++index < length) {
    result[index] = iteratee(array[index], index, array)
  }
  return result
}

export const findAncestor = (element, selector) => {
  while (
    (element = element.parentElement) &&
    !(element.matches || element.matchesSelector).call(element, selector)
  ) {
    return element
  }
}

export interface Ioffset {
  bottom: number
  height: number
  left: number
  top: number
  width: number
  x: number
  y: number
}

export const getOffset = (element, scroll = 0): Ioffset => {
  if (typeof element === 'string') {
    const box = document.querySelector(element).getBoundingClientRect()
    return {
      bottom: box.bottom,
      height: box.height,
      left: box.left,
      top: box.top + scroll,
      width: box.width,
      x: box.x,
      y: box.y,
    }
  }
  const box = element.getBoundingClientRect()

  return {
    bottom: box.bottom,
    height: box.height,
    left: box.left,
    top: box.top + scroll,
    width: box.width,
    x: box.x,
    y: box.y,
  }
}

export function getIndex(node) {
  let index = 0

  while ((node = node.previousElementSibling)) {
    index++
  }

  return index
}

export function mapEach(element, callback) {
  if (element instanceof window.HTMLElement) {
    return [callback(element)]
  }

  return map(element, callback)
}

export function each(collection, callback) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      callback(collection[i], i, collection)
    }
  } else {
    for (let key in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, key)) {
        callback(collection[key], key, collection)
      }
    }
  }
}

export const getNextElement = (elem, selector) => {
  let sibling = elem.nextElementSibling
  if (!selector) return sibling

  while (sibling) {
    if (sibling.matches(selector)) return sibling
    sibling = sibling.nextElementSibling
  }
}

export function toArray(nodelist: string | object | Element) {
  return gsap.utils.toArray(nodelist)
}
