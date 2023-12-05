const filePath = process.argv[2];
const fs = require('fs');

// Read file
const content = fs.readFileSync(filePath, 'utf-8');

// only 12 red cubes, 13 green cubes, and 14 blue cubes
const partOneCubesConfig = {
  red: 12,
  green: 13,
  blue: 14,
};

// Parse files per line
const games = content.split(/\n/);

const sum = games.reduce((acc, game) => {
  const gameId = Number(Array.from(game.matchAll(/Game (\d+)/g))[0][1]);
  const squareGrabs = game.substring(`Game ${gameId}: `.length).split('; ');
  const allGrabsValid = squareGrabs.every((squareGrab) => {
    const cubes = Array.from(squareGrab.matchAll(/(\d+) (green|red|blue)/g));
    return cubes.every(([, count, type]) => partOneCubesConfig[type] >= Number(count));
  });

  return acc + (allGrabsValid ? gameId : 0);
}, 0)
console.log('🚀 ~ file: puzzle.js:32 ~ sum ~ sum:', sum)


const sum2 = games.reduce((acc, game) => {
  const gameId = Number(Array.from(game.matchAll(/Game (\d+)/g))[0][1]);
  const squareGrabs = game.substring(`Game ${gameId}: `.length).split('; ');
  const minCubesType = squareGrabs.reduce((minCubesConfig, squareGrab) => {
    const cubes = Array.from(squareGrab.matchAll(/(\d+) (green|red|blue)/g));
    return cubes.reduce(({ red, blue, green }, [, count, type]) => ({
      red: type === 'red' && red < Number(count) ? Number(count) : red,
      green: type === 'green' && green < Number(count) ? Number(count) : green,
      blue: type === 'blue' && blue < Number(count) ? Number(count) : blue,
    }), minCubesConfig)
  }, {
    red: 0,
    green: 0,
    blue: 0,
  });

  const cubesPower = Object.values(minCubesType).reduce((cubesPowerAcc, count) => {
    return cubesPowerAcc * count;
  }, 1);

  return acc + cubesPower;
}, 0)
console.log('🚀 ~ file: puzzle.js:51 ~ sum2 ~ sum2:', sum2)