import * as _ from "lodash";

export const parse = (lines: string[]) =>
  lines.map((line) => {
    const tokens = line.replaceAll(" ", "").split("");
    let i = -1;
    const expr = () => {
      let arr: any[] = [];
      while (tokens[++i] !== ")" && i < tokens.length) {
        if (tokens[i] === "(") {
          arr.push(expr());
        } else if (/\d/.test(tokens[i])) {
          arr.push(parseInt(tokens[i]));
        } else {
          arr.push(tokens[i]);
        }
      }
      return arr;
    };
    return expr();
  });

const part1eval = (expr: any): number => {
  if (typeof expr === "number") {
    return expr;
  }
  let accum: number = part1eval(expr[0]);
  for (let pos = 1; pos < expr.length; pos += 2) {
    if (expr[pos] === "*") {
      accum *= part1eval(expr[pos + 1]);
    } else if (expr[pos] === "+") {
      accum += part1eval(expr[pos + 1]);
    } else {
      throw new Error(`unexpected ${expr[pos]}`);
    }
  }
  return accum;
};

export const part1 = (data: any[]) => {
  let sum = 0;
  data.forEach((expr) => {
    sum += part1eval(expr);
  });
  return sum;
};

const part2eval = (expr: any): number => {
  if (typeof expr === "number") {
    return expr;
  }
  let accum: number = part2eval(expr[0]);
  for (let pos = 1; pos < expr.length; pos += 2) {
    if (expr[pos] === "*") {
      accum *= part2eval(expr.slice(pos + 1));
      break;
    } else if (expr[pos] === "+") {
      accum += part2eval(expr[pos + 1]);
    } else {
      throw new Error(`unexpected ${expr[pos]}`);
    }
  }
  return accum;
};

export const part2 = (data: any[]) => {
  let sum = 0;
  data.forEach((expr) => {
    sum += part2eval(expr);
  });
  return sum;
};

export default { parse, part1, part2 };
