export const parse = (lines: string[]) =>
  lines.map((line) => {
    let x: { [key: string]: number } = {};
    for (let i = 0; i < line.length; i++) {
      if (/[a-z]/.test(line[i])) {
        x[line[i]] = 1;
      }
    }
    return Object.keys(x).length;
  });

export const parse2 = (paras: string[]) =>
  paras.map((para) => {
    let x: { [key: string]: number } = {};
    for (let i = 0; i < 26; i++) {
      x["abcdefghijklmnopqrstuvwxyz"[i]] = 1;
    }
    para
      .trim()
      .split("\n")
      .forEach((line) => {
        for (let i = 0; i < para.length; i++) {
          Object.keys(x).forEach((key) => {
            if (line.indexOf(key) == -1) {
              delete x[key];
            }
          });
        }
      });
    return Object.keys(x).length;
  });

export const part1 = (data: number[]) => {
  let c = 0;
  for (let i = 0; i < data.length; i++) {
    c += data[i];
  }
  return c;
};

export const part2 = (data) => {
  return part1(data);
};

export default { parse, parse2, part1, part2 };
