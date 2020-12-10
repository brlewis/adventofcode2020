export const parse = (lines: string[]) =>
  lines.map((line) => {
    return parseInt(line);
  });

export const part1 = (data: number[]) => {
  data.sort((a, b) => a - b);
  let ones = 0;
  let threes = 1; // for adapter
  for (let i = 0; i < data.length - 1; i++) {
    const diff = data[i + 1] - data[i];
    if (diff === 3) {
      threes++;
    } else if (diff === 1) {
      ones++;
    }
  }
  return ones * threes;
};

export const part2 = (data: number[]) => {
  data.sort((a, b) => a - b);
  const poss: number[] = [];
  const getPoss = (n: number) => {
    if (poss[n]) {
      return poss[n];
    }
    if (n >= data.length) {
      return 0;
    }
    if (n >= data.length - 2) {
      poss[n] = 1;
      return 1;
    }
    if (n <= data.length - 4) {
      if (data[n + 3] - data[n] <= 3) {
        poss[n] = getPoss(n + 1) + getPoss(n + 2) + getPoss(n + 3);
        return poss[n];
      }
    }
    if (data[n + 2] - data[n] <= 3) {
      poss[n] = getPoss(n + 1) + getPoss(n + 2);
      return poss[n];
    }
    poss[n] = getPoss(n + 1);
    return poss[n];
  };
  return getPoss(0);
};

export default { parse, part1, part2 };
