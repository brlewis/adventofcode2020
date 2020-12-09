interface Stmt {
  op: string;
  val: number;
  executions?: number;
}

export const parse = (lines: string[]): Stmt[] =>
  lines.map((line) => {
    const [op, valStr] = line.split(" ");
    const val = parseInt(valStr);
    return { op, val };
  });

export const part1 = (data: Stmt[]) => {
  let acc = 0;
  let i = 0;
  while (!data[i].executions) {
    let offset = 1;
    data[i].executions = 1;
    if (data[i].op === "jmp") {
      offset = data[i].val;
    } else if (data[i].op === "acc") {
      acc += data[i].val;
    }
    i += offset;
  }
  return acc;
};

export const part2 = (data: Stmt[]) => {
  const flip = (stmt: Stmt) => {
    if (stmt.op === "jmp") {
      stmt.op = "nop";
    } else {
      stmt.op = "jmp";
    }
  };
  const flips: number[] = [];
  let acc = 0;
  let i = 0;
  while (!data[i].executions) {
    let offset = 1;
    data[i].executions = 1;
    if (data[i].op === "jmp") {
      offset = data[i].val;
      flips.push(i);
    } else if (data[i].op === "acc") {
      acc += data[i].val;
    } else if (data[i].op === "nop") {
      flips.push(i);
    }
    i += offset;
  }
  for (let j = 0; j < flips.length; j++) {
    const stmt = data[flips[j]];
    flip(stmt);
    acc = 0;
    let i = 0;
    data.forEach((stmt) => {
      stmt.executions = 0;
    });
    while (i < data.length && !data[i].executions) {
      let offset = 1;
      data[i].executions = 1;
      if (data[i].op === "jmp") {
        offset = data[i].val;
      } else if (data[i].op === "acc") {
        acc += data[i].val;
      } else if (data[i].op === "nop") {
      }
      i += offset;
    }
    if (i >= data.length) {
      return acc;
    } else {
      flip(stmt);
    }
  }
};

export default { parse, part1, part2 };
