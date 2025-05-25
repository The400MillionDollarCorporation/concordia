/* eslint-disable no-useless-escape */

export const slugify = (title: string) => {
  if (title) {
    return title
      .toString() // Cast to string (optional)
      .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
      .toLowerCase() // Convert the string to lowercase letters
      .trim() // Remove whitespace from both sides of a string (optional)
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
  }
}

// export function reverseSlug(slug: string) {
//   const words = slug?.split('-')
//   for (let i = 0; i < words?.length; i++) {
//     const word = words[i]
//     words[i] = word.charAt(0).toUpperCase() + word.slice(1)
//   }

//   return words?.join(' ')
// }

export function deslugify(slug: string) {
  if (!slug) {
    return ''
  }

  return slug
    .toString() // Cast to string (optional)
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
}
