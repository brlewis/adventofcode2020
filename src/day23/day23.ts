import * as _ from "lodash";

interface Cup {
  car: number;
  cdr?: Cup;
}

export const parse = (lines: string[]) =>
  lines.map((line) => {
    return line.split("").map((str) => parseInt(str));
  });

const getCircle = (data: number[]): Cup => {
  let cups: Cup[];
  cups = data.map((n) => ({ car: n }));
  for (let i = 0; i < cups.length; i++) {
    cups[i].cdr = i < cups.length - 1 ? cups[i + 1] : cups[0];
  }
  return cups[0];
};

export const part1 = (data: number[], moveCount: number) => {
  let cups = getCircle(data);
  const map: Map<number, Cup> = new Map();
  map.set(cups.car, cups);
  let max = cups.car;
  for (let cup = cups.cdr; cup != cups; cup = cup!.cdr) {
    map.set(cup!.car, cup!);
    if (cup!.car > max) {
      max = cup!.car;
    }
  }

  const rotate = () => {
    cups = cups!.cdr!;
  };

  const move = () => {
    const three = [cups.cdr, cups.cdr!.cdr, cups.cdr!.cdr!.cdr];
    let dest = cups.car - 1 || max;
    let destCup = map.get(dest);
    while (!destCup || three.includes(destCup)) {
      if (!destCup) {
        throw new Error(`lost ${dest}`);
      }
      if (--dest < 1) {
        dest = max;
      }
      destCup = map.get(dest);
    }
    const nextCup = three[2]!.cdr;
    three[2]!.cdr = destCup!.cdr;
    destCup!.cdr = three[0];
    cups.cdr = nextCup;
    rotate();
  };
  for (let i = 1; i <= moveCount; i++) {
    move();
  }
  let one = map.get(1);
  let str = "";
  for (let cup = one!.cdr; cup !== one; cup = cup!.cdr) {
    str += cup!.car;
  }
  return str;
};

export const part2 = (data: number[], moveCount: number, upTo: number) => {
  let cups = getCircle(data);
  const map: Map<number, Cup> = new Map();
  let cup2: Cup;
  map.set(cups.car, cups);
  let max = cups.car;
  for (let cup = cups.cdr; cup != cups; cup = cup!.cdr) {
    map.set(cup!.car, cup!);
    if (cup!.car > max) {
      max = cup!.car;
    }
    if (cup!.cdr === cups) {
      cup2 = cup!;
    }
  }

  if (upTo) {
    for (let i = max + 1; i <= upTo; i++) {
      let cup3 = { car: i };
      map.set(i, cup3);
      cup2!.cdr = cup3!;
      cup2 = cup3!;
    }
    cup2!.cdr = cups;
    max = upTo;
  }

  for (let i = 1; i < upTo; i++) {
    if (map.get(i)!.car !== i) {
      throw new Error(`${map.get(i)!.car} should be ${i}`);
    }
  }

  const rotate = () => {
    cups = cups!.cdr!;
  };

  const move = () => {
    const three = [cups.cdr, cups.cdr!.cdr, cups.cdr!.cdr!.cdr];
    let dest = cups.car - 1 || max;
    let destCup = map.get(dest);
    while (!destCup || three.includes(destCup)) {
      if (!destCup) {
        throw new Error(`lost ${dest}`);
      }
      if (--dest < 1) {
        dest = max;
      }
      destCup = map.get(dest);
    }
    const nextCup = three[2]!.cdr;
    three[2]!.cdr = destCup!.cdr;
    destCup!.cdr = three[0];
    cups.cdr = nextCup;
    rotate();
  };
  for (let i = 1; i <= moveCount; i++) {
    move();
  }
  const one = map.get(1);
  return one!.cdr!.car * one!.cdr!.cdr!.car;
};

export default { parse, part1, part2 };
