import * as _ from "lodash";

export const parse = (lines: string[]) =>
  lines.map((line) => {
    return parseInt(line);
  });

const hasParts = (arr: number[], sum: number) => {
  for (let i = 0; i < arr.length; i++) {
    const n1 = arr[i];
    const n2 = sum - n1;
    const m = arr[_.sortedIndex(arr, n2)];
    if (n1 !== n2 && n2 === m) {
      return true;
    }
  }
  return false;
};

export const part1 = (data: number[], preamble: number) => {
  const active = [];
  for (let i = 0; i < preamble; i++) {
    active[i] = data[i];
  }
  active.sort((a, b) => a - b);
  for (let j = preamble; j < data.length; j++) {
    if (!hasParts(active, data[j])) {
      return data[j];
    }
    for (let k = 0; k < preamble; k++) {
      if (active[k] === data[j - preamble]) {
        active[k] = data[j];
      }
    }
    active.sort((a, b) => a - b);
  }
  // unreached
  return -999;
};

export const part2 = (data: number[], preamble: number) => {
  const weak1 = part1(data, preamble);
  for (let i = 0; i < data.length; i++) {
    let sum = data[i];
    for (let j = i + 1; j < data.length && sum < weak1; j++) {
      sum += data[j];
      if (sum === weak1) {
        let min = sum;
        let max = 0;
        for (let k = i; k <= j; k++) {
          if (data[k] < min) {
            min = data[k];
          }
          if (data[k] > max) {
            max = data[k];
          }
        }
        return min + max;
      }
    }
  }
};

export default { parse, part1, part2 };
