interface coloredBag {
  color: string;
  contents: string[];
  other?: number;
}

export const parse = (lines: string[]) => {
  const allBags: { [color: string]: coloredBag } = {};
  lines.forEach((line) => {
    const [container, contents] = line.split(" contain ");
    const [adj, color, _bags] = container.split(" ");
    allBags[`${adj} ${color}`] = {
      color: `${adj} ${color}`,
      contents: [],
    };
    if (contents !== "no other bags.") {
      const held = contents.split(", ").map((desc) => desc.split(" "));
      held.forEach(([num, adj2, color2, _bags]) => {
        for (let i = 0; i < parseInt(num); i++) {
          allBags[`${adj} ${color}`].contents.push(`${adj2} ${color2}`);
        }
      });
    }
  });
  return allBags;
};

export const part1 = (data: { [color: string]: coloredBag }, color: string) => {
  let count = 0;
  const canContain = (bag: coloredBag) => {
    for (let i = 0; i < bag.contents.length; i++) {
      if (bag.contents[i] === color) {
        return true;
      } else if (
        (i === 0 || bag.contents[i] !== bag.contents[i - 1]) &&
        canContain(data[bag.contents[i]])
      ) {
        return true;
      }
    }
    return false;
  };
  Object.keys(data).forEach((key) => {
    if (canContain(data[key])) {
      count++;
    }
  });
  return count;
};

export const part2 = (data: { [color: string]: coloredBag }, color: string) => {
  const getOther = (bag: coloredBag) => {
    if (bag.other === undefined) {
      let count = 0;
      for (let i = 0; i < bag.contents.length; i++) {
        count += 1 + getOther(data[bag.contents[i]]);
      }
      bag.other = count;
    }
    return bag.other;
  };
  return getOther(data[color]);
};

export default { parse, part1, part2 };
