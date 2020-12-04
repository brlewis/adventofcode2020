export const parse = (lines: string[]) =>
  lines.map((line) => {
    const pairs = line.split(" ").map((pair) => pair.split(":"));
    const fields: any = new Object();
    pairs.forEach((pair) => {
      fields[pair[0]] = pair[1];
    });
    return fields;
  });

export const valid = (f: any) =>
  (f.byr && f.iyr && f.eyr && f.hgt && f.hcl && f.ecl && f.pid && 1) || 0;

export const valid2 = (f: any) => {
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = f;
  if (!byr || byr.length !== 4 || byr < "1920" || byr > "2002") {
    return 0;
  }
  if (!iyr || iyr.length !== 4 || iyr < "2010" || iyr > "2020") {
    return 0;
  }
  if (!eyr || eyr.length !== 4 || eyr < "2020" || eyr > "2030") {
    return 0;
  }
  if (!hgt || (!hgt.endsWith("cm") && !hgt.endsWith("in"))) {
    return 0;
  }
  if (
    hgt.endsWith("cm") &&
    (hgt.length !== 5 || hgt < "150cm" || hgt > "193cm")
  ) {
    return 0;
  }
  if (
    hgt.endsWith("in") &&
    (hgt.length !== 4 || hgt < "59in" || hgt > "76in")
  ) {
    return 0;
  }
  if (!hcl || hcl.length !== 7 || !hcl.match("#[0-9a-f]{6}")) {
    return 0;
  }
  if (!ecl || ecl.length !== 3 || !ecl.match("amb|blu|brn|gry|grn|hzl|oth")) {
    return 0;
  }
  if (!pid || pid.length !== 9 || !pid.match("\\d{9}")) {
    return 0;
  }
  return 1;
};

export const part1 = (data: any[]) => {
  let count = 0;
  data.forEach((f) => {
    count += valid(f);
  });
  return count;
};

export const part2 = (data: any[]) => {
  let count = 0;
  data.forEach((f) => {
    const v = valid2(f);
    count += v;
  });
  return count;
};

export default { parse, valid, part1, part2 };
