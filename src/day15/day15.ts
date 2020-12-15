export const parse = (lines: string[]) =>
  lines[0].split(",").map((str) => parseInt(str));

export const part1 = (data: number[], limit: number) => {
  const map: Map<number, number> = new Map();
  let latestNumber: number = -1;

  for (let turn = 1; turn <= limit; turn++) {
    let newNumber = -1;
    if (data.length) {
      newNumber = data[0];
      data.shift();
    } else {
      let lastTurn = map.get(latestNumber);
      if (lastTurn) {
        newNumber = turn - 1 - lastTurn;
      } else {
        newNumber = 0;
      }
    }
    map.set(latestNumber, turn - 1);
    latestNumber = newNumber;
  }
  return latestNumber;
};

export const part2 = (data) => {
  return part1(data);
};

export default { parse, part1, part2 };
