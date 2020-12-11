export const parse = (lines: string[]) => {
  let blanks: string = "";
  const floor = lines.map((line) => {
    const expanded = `.${line}.`;
    if (!blanks) {
      blanks = expanded.replace(/./g, ".");
    }
    const width = expanded.length;
    return expanded.split("");
  });
  const padding = blanks.split("");
  return [padding, ...floor, padding];
};

const neighbors = (data: string[][], row: number, col: number) => {
  const xy = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  let count = 0;
  xy.forEach(([x, y]) => {
    if (data[row + y][col + x] === "#") {
      count++;
    }
  });
  return count;
};

export const part1 = (data: string[][]) => {
  let current: string[][] = data;
  let next: string[][];
  let changed: boolean = true;
  let occupied = 0;
  for (var iterations = 1; changed; iterations++, current = next) {
    next = current.map(() => []);
    changed = false;
    occupied = 0;
    for (let row = 0; row < current.length; row++) {
      for (let col = 0; col < current[row].length; col++) {
        if (current[row][col] === ".") {
          next[row][col] = ".";
        } else if (current[row][col] === "L") {
          let n = neighbors(current, row, col);
          next[row][col] = n === 0 ? "#" : "L";
          if (n === 0) {
            occupied++;
            changed = true;
          }
        } else if (current[row][col] === "#") {
          let n = neighbors(current, row, col);
          next[row][col] = n < 4 ? "#" : "L";
          if (n >= 4) {
            changed = true;
          } else {
            occupied++;
          }
        }
      }
    }
  }
  return occupied;
};

const neighbors2 = (data: string[][], row: number, col: number) => {
  const xy = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  const valid = (row: number, col: number) =>
    row > 0 && col > 0 && row < data.length && col < data[0].length;
  let count = 0;
  xy.forEach(([x, y]) => {
    for (
      let distance = 1;
      valid(row + distance * y, col + distance * x);
      distance++
    ) {
      const seen = data[row + distance * y][col + distance * x];
      if (seen === "#") {
        count++;
        return;
      }
      if (seen === "L") {
        return;
      }
    }
  });
  return count;
};

export const part2 = (data: string[][]) => {
  let current: string[][] = data;
  let next: string[][];
  let changed: boolean = true;
  let occupied = 0;
  for (var iterations = 1; changed; iterations++, current = next) {
    next = current.map(() => []);
    changed = false;
    occupied = 0;
    for (let row = 0; row < current.length; row++) {
      for (let col = 0; col < current[row].length; col++) {
        if (current[row][col] === ".") {
          next[row][col] = ".";
        } else if (current[row][col] === "L") {
          let n = neighbors2(current, row, col);
          next[row][col] = n === 0 ? "#" : "L";
          if (n === 0) {
            occupied++;
            changed = true;
          }
        } else if (current[row][col] === "#") {
          let n = neighbors2(current, row, col);
          next[row][col] = n < 5 ? "#" : "L";
          if (n >= 5) {
            changed = true;
          } else {
            occupied++;
          }
        }
      }
    }
    /*    console.log(
      JSON.stringify(
        next.map((arr) => arr.join("")),
        null,
        2
      )
    );*/
  }
  return occupied;
};

export default { parse, part1, part2 };
