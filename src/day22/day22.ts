import * as _ from "lodash";
import { num } from "../util";

export const parse = (players: string[][]) =>
  players.map((lines) => lines.slice(1).map(num));

export const part1 = (data: number[][]) => {
  let winner = -1;
  while (data[0].length && data[1].length) {
    let max = -1;
    let cards = [];
    for (let i = 0; i < data.length; i++) {
      cards.push(data[i][0]);
      if (data[i][0] > max) {
        max = data[i][0];
        winner = i;
      }
    }
    cards.sort((a, b) => b - a);
    for (let i = 0; i < data.length; i++) {
      data[i].shift();
      if (i === winner) {
        data[i] = data[i].concat(cards);
      }
    }
  }
  let answer = 0;
  for (let i = 1; i <= data[winner].length; i++) {
    answer += i * data[winner][data[winner].length - i];
  }
  return answer;
};

export const part2 = (data: any[]) => {
  return part1(data);
};

export default { parse, part1, part2 };
