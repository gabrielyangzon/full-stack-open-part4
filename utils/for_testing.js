const reverse = (string) => {
  return string
    .split('')
    .reverse('')
    .join('')
}

const average = (arr) => {
  return arr.length === 0 
  ? 0 
  : arr.reduce((a,b) => a + b) / arr.length
}

module.exports = {
    reverse,
    average
}