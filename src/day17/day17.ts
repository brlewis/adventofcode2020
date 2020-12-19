import * as _ from "lodash";

class Cube {
  x: number;
  y: number;
  z: number;
  active: boolean;
  neighbors: number;
  constructor(x: number, y: number, z: number, active: boolean) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.active = active;
    this.neighbors = 0;
  }
}

class Dimension {
  map: Map<string, Cube> = new Map();
  get(x: number, y: number, z: number): Cube {
    const index = [x, y, z].join();
    const found = this.map.get(index);
    if (found) {
      return found;
    } else {
      let made = new Cube(x, y, z, false);
      this.map.set(index, made);
      return made;
    }
  }
  set(x: number, y: number, z: number, active: boolean) {
    const cube = this.get(x, y, z);
    if (cube.active !== active) {
      cube.active = active;
      for (let col = x - 1; col < x + 2; col++) {
        for (let row = y - 1; row < y + 2; row++) {
          for (let plane = z - 1; plane < z + 2; plane++) {
            if (col !== x || row !== y || plane !== z) {
              this.get(col, row, plane).neighbors += active ? 1 : -1;
            }
          }
        }
      }
    }
  }
  next(): Dimension {
    const dim = new Dimension();
    for (let cube of this.map.values()) {
      let active = false;
      if (cube.active && [2, 3].includes(cube.neighbors)) {
        active = true;
      }
      if (!cube.active && cube.neighbors === 3) {
        active = true;
      }
      dim.set(cube.x, cube.y, cube.z, active);
    }
    return dim;
  }
}

export const parse = (lines: string[]): Cube[] =>
  _.flatten(
    lines.map((line, row) =>
      line.split("").map((char, col) => new Cube(col, row, 0, char === "#"))
    )
  );

export const part1 = (data: Cube[]) => {
  let dim = new Dimension();
  data.forEach((cube) => dim.set(cube.x, cube.y, cube.z, cube.active));
  for (let _cycle = 1; _cycle <= 6; _cycle++) {
    dim = dim.next();
  }
  let count = 0;
  for (let cube of dim.map.values()) {
    if (cube.active) {
      count++;
    }
  }
  return count;
};

class HyperCube {
  x: number;
  y: number;
  z: number;
  w: number;
  active: boolean;
  neighbors: number;
  constructor(x: number, y: number, z: number, w: number, active: boolean) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.active = active;
    this.neighbors = 0;
  }
}

class Dimension4 {
  map: Map<string, HyperCube> = new Map();
  get(x: number, y: number, z: number, w: number): HyperCube {
    const index = [x, y, z, w].join();
    const found = this.map.get(index);
    if (found) {
      return found;
    } else {
      let made = new HyperCube(x, y, z, w, false);
      this.map.set(index, made);
      return made;
    }
  }
  set(x: number, y: number, z: number, w: number, active: boolean) {
    const cube = this.get(x, y, z, w);
    if (cube.active !== active) {
      cube.active = active;
      for (let col = x - 1; col < x + 2; col++) {
        for (let row = y - 1; row < y + 2; row++) {
          for (let plane = z - 1; plane < z + 2; plane++) {
            for (let ww = w - 1; ww < w + 2; ww++) {
              if (col !== x || row !== y || plane !== z || ww !== w) {
                this.get(col, row, plane, ww).neighbors += active ? 1 : -1;
              }
            }
          }
        }
      }
    }
  }
  next(): Dimension4 {
    const dim = new Dimension4();
    for (let cube of this.map.values()) {
      let active = false;
      if (cube.active && [2, 3].includes(cube.neighbors)) {
        active = true;
      }
      if (!cube.active && cube.neighbors === 3) {
        active = true;
      }
      dim.set(cube.x, cube.y, cube.z, cube.w, active);
    }
    return dim;
  }
}

export const parse2 = (lines: string[]): HyperCube[] =>
  _.flatten(
    lines.map((line, row) =>
      line
        .split("")
        .map((char, col) => new HyperCube(col, row, 0, 0, char === "#"))
    )
  );

export const part2 = (data: HyperCube[]) => {
  let dim = new Dimension4();
  data.forEach((cube) => dim.set(cube.x, cube.y, cube.z, cube.w, cube.active));
  for (let _cycle = 1; _cycle <= 6; _cycle++) {
    dim = dim.next();
  }
  let count = 0;
  for (let cube of dim.map.values()) {
    if (cube.active) {
      count++;
    }
  }
  return count;
};

export default { parse, part1, parse2, part2 };
