import * as _ from "lodash";

export const expenseReport = (entries: number[], desiredSum: number) => {
  for (let i = 0; i < entries.length - 1; i++) {
    const n = entries[i];
    if (n > desiredSum) {
      break;
    }
    const m = entries[_.sortedIndex(entries, desiredSum - n)];
    if (n + m === desiredSum) {
      return n * m;
    }
  }
  return false;
};

export const expenseReport2 = (entries: number[], desiredSum: number) => {
  entries.sort((a, b) => a - b);
  return expenseReport(entries, desiredSum);
};

export const expenseReport3 = (entries: number[], desiredSum: number) => {
  entries.sort((a, b) => a - b);
  for (let i = 0; i < entries.length - 1; i++) {
    const n = entries[i];
    const partialSum = desiredSum - n;
    const product2 = expenseReport(entries, partialSum);
    if (product2 !== false) {
      return n * product2;
    }
  }
  return false;
};
