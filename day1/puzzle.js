const filePath = process.argv[2]
const fs = require('fs')

// Map number string to int
const numberStringToInt = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
}

// Read file
const content = fs.readFileSync(filePath, 'utf-8')

// Parse files per line
const lines = content.split(/\n/)

// for each lines, get the first and last digit character into a string of alphanumeric characters and sum with accumulator
const sum1 = lines.reduce((acc, line) => {
  // in a line string of letter and digit, retrieve the first and last digit
  const lineMatch = Array.from(line.match(/\d/g))

  // get the first digit (word or digit character) and convert to an int
  const firstNumber = numberStringToInt[lineMatch[0]]

  // get the last digit (word or digit character) and convert to an int
  const lastNumber = numberStringToInt[lineMatch[lineMatch.length - 1]]

  // if first and last digit are not null, concatenate them and convert to an int, else return 0
  const result = firstNumber && lastNumber ? Number(`${firstNumber}${lastNumber}`) : 0

  return acc + result
}, 0)
console.log('🚀 ~ file: puzzle.js:48 ~ sum1 ~ sum1:', sum1)

// for each lines, get the first and last digit character into a string of alphanumeric characters and sum with accumulator
const sum2 = lines.reduce((acc, line) => {
  // in a line string of letter and digit, retrieve the first and last digit
  const lineMatch = Array.from(line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g))

  // get the first digit (word or digit character) and convert to an int
  const firstNumber = numberStringToInt[lineMatch[0][1]]

  // get the last digit (word or digit character) and convert to an int
  const lastNumber = numberStringToInt[lineMatch[lineMatch.length - 1][1]]

  // if first and last digit are not null, concatenate them and convert to an int, else return 0
  const result = firstNumber && lastNumber ? Number(`${firstNumber}${lastNumber}`) : 0

  return acc + result
}, 0)

console.log('🚀 ~ file: puzzle.js:32 ~ sum:', sum2)
