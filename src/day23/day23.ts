import * as _ from "lodash";
import { num } from "../util";

export const parse = (lines: string[]) =>
  lines.map((line) => {
    return line.split("").map((str) => parseInt(str));
  });

export const part1 = (data: number[], moveCount: number) => {
  const cups = [...data];
  let max = -1;
  cups.forEach((num) => {
    if (num > max) {
      max = num;
    }
  });

  const rotate = () => cups.push(cups.shift());
  const move = () => {
    let dest = cups[0] - 1;
    let i = cups.indexOf(dest);
    while (i < 4) {
      if (i === -1) {
        dest = max;
      } else {
        dest--;
      }
      i = cups.indexOf(dest);
    }
    const three = cups.splice(1, 3);
    cups.splice(i - 2, 0, ...three);
    rotate();
  };
  for (let i = 1; i <= moveCount; i++) {
    move();
  }
  let one = cups.indexOf(1);
  return [...cups.slice(one + 1), ...cups.slice(0, one)].join("");
};

export const part2 = (data: any[]) => {
  return part1(data);
};

export default { parse, part1, part2 };
