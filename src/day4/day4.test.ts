import day4 from "./day4";
import { lines } from "../util";

const sampleInput = [
  "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm",
  "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 hcl:#cfa07d byr:1929",
  "hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm",
  "hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in",
];
const puzzleInput = lines(__dirname + "/input.txt");

/**
 * --- Day 4: Passport Processing ---You arrive at the airport only to realize that you grabbed your North Pole Credentials instead of your passport. While these documents are extremely similar, North Pole Credentials aren't issued by a country and therefore aren't actually valid documentation for travel in most of the world.
 * It seems like you're not the only one having problems, though; a very long line has formed for the automatic passport scanners, and the delay could upset your travel itinerary.
 * Due to some questionable network security, you realize you might be able to solve both of these problems at the same time.
 * The automatic passport scanners are slow because they're having trouble detecting which passports have all required fields. The expected fields are as follows:
 *
 * byr (Birth Year)
 * iyr (Issue Year)
 * eyr (Expiration Year)
 * hgt (Height)
 * hcl (Hair Color)
 * ecl (Eye Color)
 * pid (Passport ID)
 * cid (Country ID)
 *
 * Passport data is validated in batch files (your puzzle input). Each passport is represented as a sequence of key:value pairs separated by spaces or newlines. Passports are separated by blank lines.
 * Here is an example batch file containing four passports:
 * ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
 * byr:1937 iyr:2017 cid:147 hgt:183cm
 *
 * iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
 * hcl:#cfa07d byr:1929
 *
 * hcl:#ae17e1 iyr:2013
 * eyr:2024
 * ecl:brn pid:760753108 byr:1931
 * hgt:179cm
 *
 * hcl:#cfa07d eyr:2025 pid:166559648
 * iyr:2011 ecl:brn hgt:59in
 *
 * The first passport is valid - all eight fields are present. The second passport is invalid - it is missing hgt (the Height field).
 * The third passport is interesting; the only missing field is cid, so it looks like data from North Pole Credentials, not a passport at all! Surely, nobody would mind if you made the system temporarily ignore missing cid fields.  Treat this "passport" as valid.
 * The fourth passport is missing two fields, cid and byr. Missing cid is fine, but missing any other field is not, so this passport is invalid.
 * According to the above rules, your improved system would report 2 valid passports.
 * Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?
 */

describe("Day 4 validate", () => {
  it("should parse", () => {
    const result = day4.parse(sampleInput);
    expect(result[0]).toEqual({
      ecl: "gry",
      pid: "860033327",
      eyr: "2020",
      hcl: "#fffffd",
      byr: "1937",
      iyr: "2017",
      cid: "147",
      hgt: "183cm",
    });
    expect(day4.valid(result[0])).toEqual(1);
    expect(day4.valid(result[1])).toEqual(0);
    expect(day4.valid(result[2])).toEqual(1);
    expect(day4.valid(result[3])).toEqual(0);
  });
});

describe("Day 4 part1", () => {
  it("should work", () => {
    const data = day4.parse(sampleInput);
    expect(day4.part1(data)).toEqual(2);
  });
  it("should solve", () => {
    const data = day4.parse(puzzleInput);
    expect(day4.part1(data)).toEqual(204);
  });
});

describe("Day 4 part2", () => {
  const sampleInvalid = [
    "eyr:1972 cid:100 hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926",
    "iyr:2019 hcl:#602927 eyr:1967 hgt:170cm ecl:grn pid:012533040 byr:1946",
    "hcl:dab227 iyr:2012 ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277",
    "hgt:59cm ecl:zzz eyr:2038 hcl:74454a iyr:2023 pid:3556412378 byr:2007",
  ];
  const sampleValid = [
    "pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f",
    "eyr:2029 ecl:blu cid:129 byr:1989 iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm",
    "hcl:#888785 hgt:164cm byr:2001 iyr:2015 cid:88 pid:545766238 ecl:hzl eyr:2022",
    "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719",
  ];
  it("should not count invalid", () => {
    const data = day4.parse(sampleInvalid);
    expect(day4.part2(data)).toEqual(0);
  });
  it("should count valid", () => {
    const data = day4.parse(sampleValid);
    expect(day4.part2(data)).toEqual(4);
  });
  it("should solve", () => {
    const data = day4.parse(puzzleInput);
    expect(day4.part2(data)).toEqual(179);
  });
});
