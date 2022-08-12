export const getDate = (date) => {
  let actualDate

  if (date) {
    actualDate = new Date(date)
  } else {
    actualDate = new Date()
  }

  const formatedDate = actualDate.toLocaleDateString()
  const formatedTime = actualDate
    .toLocaleTimeString()
    .split(':')
    .slice(0, 2)
    .join(':')

  return `${formatedDate} ${formatedTime}`
}
