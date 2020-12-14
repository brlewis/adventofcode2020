export const parse = (lines: string[]) =>
  lines.map((line) => {
    return line.split(",").map((str) => parseInt(str));
  });

export const part1 = (data: number[][]) => {
  const earliest = data[0][0];
  const buses = data[1].filter((x) => x);
  const times = buses.map((id) => Math.ceil(earliest / id) * id - earliest);
  let best = 0;
  for (let i = 1; i < times.length; i++) {
    if (times[i] < times[best]) {
      best = i;
    }
  }
  return times[best] * buses[best];
};

interface Bus {
  offset: number;
  id: number;
}

export const parse2 = (lines: string[]) =>
  lines.map((line) => {
    return line
      .split(",")
      .map((str, idx) => ({ offset: idx, id: parseInt(str) }))
      .filter((bus) => bus.id);
  });

export const part2 = (data: Bus[][]) => {
  const buses = data[1];
  buses.sort((a, b) => b.id - a.id);
  let step = buses[0].id;
  let start = step - buses[0].offset;
  let idx = 1;
  for (let i = start; true; i += step) {
    for (let j = idx; (i + buses[j].offset) % buses[j].id === 0; j++) {
      if (j === buses.length - 1) {
        return i;
      }
      step *= buses[j].id;
      idx = j + 1;
    }
  }
};

export default { parse, parse2, part1, part2 };
