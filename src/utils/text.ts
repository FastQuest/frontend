export const limitChars = (text: string, max = 300): string =>
  text.length <= max ? text : text.slice(0, max) + '…'
