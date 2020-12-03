export const parseForest = (lines: string[]) =>
  lines.map((line) => {
    const trees: number[] = [];
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "#") {
        trees.push(1);
      } else {
        trees.push(0);
      }
    }
    return trees;
  });

export const encounters = (trees: number[][], across: number, down: number) => {
  let x = 0;
  let count = 0;
  for (let i = down; i < trees.length; i += down) {
    x += across;
    count += trees[i][x % trees[i].length];
  }
  return count;
};

export const part2 = (trees: number[][]) =>
  encounters(trees, 1, 1) *
  encounters(trees, 3, 1) *
  encounters(trees, 5, 1) *
  encounters(trees, 7, 1) *
  encounters(trees, 1, 2);
