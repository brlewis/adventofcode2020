export const seatId = (code: string) =>
  8 *
    ((code[0] === "B" ? 64 : 0) +
      (code[1] === "B" ? 32 : 0) +
      (code[2] === "B" ? 16 : 0) +
      (code[3] === "B" ? 8 : 0) +
      (code[4] === "B" ? 4 : 0) +
      (code[5] === "B" ? 2 : 0) +
      (code[6] === "B" ? 1 : 0)) +
  (code[7] === "R" ? 4 : 0) +
  (code[8] === "R" ? 2 : 0) +
  (code[9] === "R" ? 1 : 0);

export const parse = (lines: string[]) =>
  lines.map((line) => {
    return seatId(line);
  });

export const part1 = (data: number[]) => {
  let hi = 0;
  data.forEach((n) => {
    if (n > hi) {
      hi = n;
    }
  });
  return hi;
};

export const part2 = (data: number[]) => {
  data.sort((a, b) => a - b);
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i + 1] - data[i] === 2) {
      return data[i] + 1;
    }
  }
};

export default { parse, part1, part2 };
