import { encounters, parseForest, part2 } from "./day3";
import { lines } from "../util";

const sampleForest = lines(__dirname + "/sample.txt");
const myForest = lines(__dirname + "/my.txt");

describe("parseForest", () => {
  it("should parse", () => {
    const forest = parseForest(sampleForest);
    expect(forest[0][0]).toEqual(0);
    expect(forest[0][2]).toEqual(1);
    expect(forest[1][0]).toEqual(1);
  });
});

describe("encounters", () => {
  it("should work", () => {
    const forest = parseForest(sampleForest);
    expect(encounters(forest, 3, 1)).toEqual(7);
  });
  it("should solve", () => {
    const forest = parseForest(myForest);
    expect(encounters(forest, 3, 1)).toEqual(7);
  });
});

describe("part2", () => {
  it("should work", () => {
    const forest = parseForest(sampleForest);
    expect(part2(forest)).toEqual(336);
  });
  it("should solve", () => {
    const forest = parseForest(myForest);
    expect(part2(forest)).toEqual(7);
  });
});
