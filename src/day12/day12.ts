type Instruction = [string, number];

interface Ship {
  x: number;
  y: number;
  angle: number;
}

const compass: { [key: string]: [number, number, number] } = {
  N: [0, -1, 90],
  S: [0, 1, 270],
  E: [1, 0, 0],
  W: [-1, 0, 180],
};

export const parse = (lines: string[]): Instruction[] =>
  lines.map((line) => {
    return [line[0], parseInt(line.substring(1))];
  });

const move = (ship: Ship, [dir, distance]: Instruction) => {
  if (compass[dir]) {
    ship.x += compass[dir][0] * distance;
    ship.y += compass[dir][1] * distance;
  } else if (dir === "L") {
    ship.angle = (ship.angle + distance) % 360;
  } else if (dir === "R") {
    ship.angle = (ship.angle + 360 - distance) % 360;
  } else if (dir === "F") {
    const heading = Object.values(compass).filter(
      ([x, y, angle]) => angle === ship.angle
    );
    ship.y += heading[0][1] * distance;
    ship.x += heading[0][0] * distance;
  }
  //console.log({ dir, distance, ship });
};

export const part1 = (data: Instruction[]) => {
  const ship: Ship = { x: 0, y: 0, angle: 0 };
  data.forEach((instr) => move(ship, instr));
  return Math.abs(ship.x) + Math.abs(ship.y);
};

interface Ship2 extends Ship {
  wx: number;
  wy: number;
}

const rotate = (degrees: number, ship: Ship2) => {
  if (degrees === 90) {
    let x = ship.wx;
    ship.wx = ship.wy;
    ship.wy = -x;
  } else if (degrees === 180) {
    ship.wx = -ship.wx;
    ship.wy = -ship.wy;
  } else if (degrees === 270) {
    let x = ship.wx;
    ship.wx = -ship.wy;
    ship.wy = x;
  }
};

const move2 = (ship: Ship2, [dir, distance]: Instruction) => {
  if (compass[dir]) {
    ship.wx += compass[dir][0] * distance;
    ship.wy += compass[dir][1] * distance;
  } else if (dir === "L") {
    rotate(distance, ship);
  } else if (dir === "R") {
    rotate(360 - distance, ship);
  } else if (dir === "F") {
    ship.y += ship.wy * distance;
    ship.x += ship.wx * distance;
  }
  //console.log({ dir, distance, ship });
};

export const part2 = (data: Instruction[]) => {
  const ship: Ship2 = { x: 0, y: 0, angle: 0, wx: 10, wy: -1 };
  data.forEach((instr) => move2(ship, instr));
  return Math.abs(ship.x) + Math.abs(ship.y);
};

export default { parse, rotate, move, move2, part1, part2 };
