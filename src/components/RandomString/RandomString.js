export const getRandomString = (length) => {
  const list = 'abcdefghijklmnopqrstuvwxyz0123456789'

  let result = ''
  for (let i = 0; i < length; i += 1) {
    result += list.charAt(Math.random() * list.length)
  }
  return result
}
