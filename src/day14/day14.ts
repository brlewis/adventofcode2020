export const parse = (lines: string[]) =>
  lines.map((line) => {
    const match = line.match(/^(mem|mask)(\[(\d*)\])? = ([X\d]*)$/);
    if (match![1] === "mask") {
      return ["mask", match![4]];
    } else {
      return ["mem", parseInt(match![3]), parseInt(match![4])];
    }
  });

export const applyMask = (mask: string, value: number) => {
  for (let i = mask.length - 1, bit = 1; i >= 0; i--, bit *= 2) {
    if (mask[i] === "1") {
      if (!(value & bit)) {
        value += bit;
      }
    } else if (mask[i] === "0") {
      if (value & bit) {
        value -= bit;
      }
    }
  }
  return value;
};

export const part1 = (data: any[][]) => {
  const mem: any[] = [];
  let mask = "";

  data.forEach((instr) => {
    if (instr[0] === "mask") {
      mask = instr[1];
    } else {
      mem[instr[1]] = applyMask(mask, instr[2]);
    }
  });
  let sum = 0;
  for (let i = 0; i < mem.length; i++) {
    sum += mem[i] || 0;
  }
  return sum;
};

const getMasks = (mask: string): string[] => {
  if (!mask.length) {
    return [""];
  }
  let bit = mask[0];
  if (bit === "X") {
    return [
      ...getMasks(mask.substring(1)).map((m) => `-${m}`),
      ...getMasks(mask.substring(1)).map((m) => `1${m}`),
    ];
  } else {
    return getMasks(mask.substring(1)).map((m) => `${bit}${m}`);
  }
};

const applyMask2 = (mask: string, value: number) => {
  for (let i = mask.length - 1, bit = 1; i >= 0; i--, bit *= 2) {
    if (mask[i] === "1") {
      if (!(value & bit)) {
        value += bit;
      }
    } else if (mask[i] === "-") {
      if (value & bit) {
        value -= bit;
      }
    }
  }
  return value;
};

export const part2 = (data: any[][]) => {
  const mem: Map<number, number> = new Map();
  let masks: string[] = [];

  data.forEach((instr) => {
    if (instr[0] === "mask") {
      masks = getMasks(instr[1]);
    } else {
      masks.forEach((m) => {
        const addr = applyMask2(m, instr[1]);
        mem.set(addr, instr[2]);
      });
    }
  });
  let sum = 0;
  mem.forEach((val) => {
    sum += val;
  });
  return sum;
};

export default { parse, applyMask, part1, getMasks, applyMask2, part2 };
