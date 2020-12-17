import * as _ from "lodash";
import { num } from "../util";

interface Field {
  name: string;
  min1: number;
  max1: number;
  min2: number;
  max2: number;
}

interface Notes {
  fields: Field[];
  yours: number[];
  nearby: number[][];
}

export const parse = (notes: string[][]): Notes => {
  const fields = notes[0].map((line: string) => {
    const match = line.match(/^([^:]*): (\d*)-(\d*) or (\d*)-(\d*)$/).map(num);
    if (!match) {
      throw new Error(`non-field line ${line}`);
    }
    const [, name, min1, max1, min2, max2] = match;
    return { name, min1, max1, min2, max2 } as Field;
  });

  const yours = notes[1][1].split(",").map((s) => parseInt(s));

  const nearby = notes[2].map((line) =>
    line.split(",").map((s) => parseInt(s))
  );
  nearby.shift();

  return { fields, yours, nearby };
};

const validForField = (f: Field, n: number): string | false =>
  ((f.min1 <= n && n <= f.max1) || (f.min2 <= n && n <= f.max2)) && f.name;

export const validForFields = (fs: Field[], n: number): string[] =>
  fs.map((f) => validForField(f, n)).filter((x) => x);

export const invalidForFields = (fs: Field[], n: number): string[] =>
  fs.map((f) => !validForField(f, n) && f.name).filter((x) => x);

export const part1 = (data: Notes) => {
  let errorRate = 0;
  data.nearby.forEach((nums) =>
    nums.forEach((n) => {
      if (!validForFields(data.fields, n).length) {
        errorRate += n;
      }
    })
  );
  return errorRate;
};

export const fieldOrder = (data: Notes) => {
  const possible: Set<string>[] = data.yours.map(() => {
    const set: Set<string> = new Set();
    data.fields.forEach((f) => set.add(f.name));
    return set;
  });

  const isFinished = (fieldName: string, i: number) => {
    if (possible[i].delete(fieldName) && possible[i].size === 1) {
      let finished = true;
      possible[i].forEach((foundName) => {
        for (let j = 0; j < possible.length; j++) {
          if (j !== i) {
            if (isFinished(foundName, j)) {
              finished = true;
            }
            if (possible[j].size > 1) {
              finished = false;
            }
          }
        }
      });
      return finished;
    } else {
      return false;
    }
  };

  let finished = false;
  data.nearby.forEach((nums) => {
    if (!finished) {
      for (let i = 0; i < nums.length; i++) {
        if (validForFields(data.fields, nums[i]).length === 0) {
          return;
        }
      }
      nums.forEach((n, i) => {
        invalidForFields(data.fields, n).forEach((name) => {
          finished = isFinished(name, i);
        });
      });
    }
  });

  return possible.map((set) => Array.from(set)[0]);
};

export const part2 = (data: Notes) => {
  const fieldNames = fieldOrder(data);
  let product = 1;
  for (let i = 0; i < data.yours.length; i++) {
    if (fieldNames[i].startsWith("departure")) {
      product *= data.yours[i];
    }
  }
  return product;
};

export default { parse, validForFields, part1, fieldOrder, part2 };
