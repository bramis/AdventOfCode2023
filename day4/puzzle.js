const filePath = process.argv[2];
const fs = require('fs');

// Read file
const content = fs.readFileSync(filePath, 'utf-8');

// Cards entry list
const cards = content.split(/\n/);

// Part One: Parse each card which has two lists of numbers separated by a vertical bar (|): a list of winning numbers and then a list of numbers you have.
// Part Two: Increase cards copy count with an increase count equal to the number of winning numbers you have
const { pointsSum, cardsCopyCount } = cards.reduce((acc, card, currentIndex) => {
  const cardMatch = Array.from(card.matchAll(/Card\s+(\d+):(?<winningNumbers>(\s+\d+\s?)+)\s\|\s(?<myNumbers>(\s?\d+\s?)+)/g))[0];

  if (cardMatch === undefined) {
    return acc;
  }

  const winningNumbers = Array.from(cardMatch.groups.winningNumbers.matchAll(/(\d+)/g)).map(([, number]) => {
    return Number(number)
  })
  const myNumbers = Array.from(cardMatch.groups.myNumbers.matchAll(/(\d+)/g)).map(([, number]) => {
    return Number(number)
  })
  const { points, matchingNumbersCount } = winningNumbers.reduce(({ points: pointsAcc, matchingNumbersCount: matchingNumbersCountAcc }, winningNumber) => {
    if (myNumbers.includes(winningNumber)) {
      return {
        points: (pointsAcc === 0 ? 1 : pointsAcc * 2),
        matchingNumbersCount: matchingNumbersCountAcc + 1,
      };
    }

    return { points: pointsAcc, matchingNumbersCount: matchingNumbersCountAcc };
  }, { points: 0, matchingNumbersCount: 0 });
  
  for (let count = 1; count <= matchingNumbersCount; count++) {
    if (currentIndex + count <= acc.cardsCopyCount.length) {
      acc.cardsCopyCount[currentIndex + count] = acc.cardsCopyCount[currentIndex + count] + acc.cardsCopyCount[currentIndex];
    }
  }

  return {
    ...acc,
    pointsSum: acc.pointsSum + points,
  };
}, { pointsSum: 0, cardsCopyCount: Array(cards.length).fill(1) })

console.log('🚀 Part One:', pointsSum)
console.log('🚀 Part Two:', cardsCopyCount.reduce((acc, count) => acc + count, 0));
