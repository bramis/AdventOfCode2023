const filename = process.argv[2];
const fs = require("fs");

const content = fs.readFileSync(filename, { encoding: "utf-8" });

const lines = content.split("\n");

function getNumberFromMatch(match) {
  return Number(match[0]);
}

function withGetNumbersFromMatchUpOrDown(indexRef) {
  return (match) => {
    const value = match[0];
    const indexFrom = match.index;
    const indexTo = indexFrom + value.length - 1;
    return indexFrom === indexRef || indexFrom - 1 === indexRef || indexTo === indexRef || indexTo + 1 === indexRef || (indexFrom <= indexRef && indexTo >= indexRef);
  }
}

const { validNumbers, validGears } = lines.reduce(({ validNumbers: numbers, validGears: gears }, line, currentIndex, linesArray) => {
  const matchNumbers = Array.from(line.matchAll(/(\d+)/g));
  const validNumber = matchNumbers
    .filter((match) => {
      const value = match[0];
      const indexFrom = match.index;
      
      const indexTo = indexFrom + value.length - 1;

      const isRightAdjacent =
        indexTo + 1 <= line.length - 1 && line[indexTo + 1] !== ".";
     
      const isLeftAdjacent = indexFrom > 0 && line[indexFrom - 1] !== ".";
      
      const isUpAdjacent =
        currentIndex > 0 &&
        linesArray[currentIndex - 1]
          .substring(
            indexFrom > 0 ? indexFrom - 1 : indexFrom,
            indexTo < linesArray[currentIndex - 1].length - 1
              ? indexTo + 2
              : indexTo
          )
          .split("")
          .some((char) => char !== ".");

        if (value === '157') {
          
        }

      const isDownAdjacent =
        currentIndex + 1 <= linesArray.length - 1 &&
        linesArray[currentIndex + 1]
          .substring(
            indexFrom > 0 ? indexFrom - 1 : indexFrom,
            indexTo < linesArray[currentIndex + 1].length - 1
              ? indexTo + 2
              : indexTo
          )
          .split("")
          .some((char) => char !== ".");

      return (
        isRightAdjacent || isLeftAdjacent || isUpAdjacent || isDownAdjacent
      );
    })
    .map(getNumberFromMatch);

  const matchGears = Array.from(line.matchAll(/\*/g));
  const validGear = matchGears.reduce((acc, { index }) => {
    const inlineAdjacentNumbers = matchNumbers.filter((match) => {
      const value = match[0];
      const indexFrom = match.index;
      const indexTo = indexFrom + value.length - 1;
      return indexFrom - 1 === index || indexTo + 1 === index; 
    }).map(getNumberFromMatch);
    
    const upAdjacentNumbers = (
      currentIndex > 0 &&
      Array.from(linesArray[currentIndex - 1].matchAll(/(\d+)/g))
        .filter(withGetNumbersFromMatchUpOrDown(index)).map(getNumberFromMatch)
    ) || [];
    
    const downAdjacentNumbers = (
      currentIndex < linesArray.length - 1 &&
      Array.from(linesArray[currentIndex + 1].matchAll(/(\d+)/g))
        .filter(withGetNumbersFromMatchUpOrDown(index)).map(getNumberFromMatch)
    ) || [];

    const finalAdjacentNumbers = [...inlineAdjacentNumbers, ...upAdjacentNumbers, ...downAdjacentNumbers];
    if (finalAdjacentNumbers.length === 2) {
      return [...acc, finalAdjacentNumbers.reduce((acc, value) => acc * value, 1)];
    }

    return acc
  }, [])

  return {
    validNumbers: [...numbers, ...validNumber],
    validGears: [...gears, ...validGear],
  };
}, {
  validNumbers: [],
  validGears: [],
});

// console.log("🚀 ~ file: puzzle.js:113 ~ validNumbers:", validNumbers);
console.log('Part one:', validNumbers.reduce((acc, value) => acc + value, 0));

// console.log('🚀 ~ file: puzzle.js:69 ~ validGears:', validGears);
console.log('Part two:', validGears.reduce((acc, value) => acc + value, 0));
