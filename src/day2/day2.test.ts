import { countValid, isSledValid, isTobogganValid, parseEntry } from "./day2";
import { sampleInput, puzzleInput } from "./input";
import { lines } from "../util";

describe("parseEntry", () => {
  it("should parse", () => {
    expect(parseEntry("1-3 a: abcde")).toEqual({
      min: 1,
      max: 3,
      letter: "a",
      password: "abcde",
    });
  });
});

describe("validCount", () => {
  it("should find 2 sled-valid passwords in the sample", () => {
    expect(countValid(sampleInput, isSledValid)).toEqual(2);
  });
  it("solve my part 1 puzzle", () => {
    expect(countValid(puzzleInput, isSledValid)).toEqual(643);
  });
  it("should find 1 toboggan-valid password in the sample", () => {
    expect(countValid(sampleInput, isTobogganValid)).toEqual(1);
  });
  it("solve my part 2 puzzle", () => {
    expect(countValid(puzzleInput, isTobogganValid)).toEqual(388);
  });
});

describe("isTobogganValid", () => {
  it("should be true for 1 match occurrence", () => {
    expect(
      isTobogganValid({ min: 1, max: 3, letter: "a", password: "abcde" })
    ).toBeTruthy();
  });
  it("should be false for 0 match occurrences", () => {
    expect(
      isTobogganValid({ min: 1, max: 3, letter: "b", password: "cdefg" })
    ).toBeFalsy();
  });
  it("should be false for 2 match occurrences", () => {
    expect(
      isTobogganValid({ min: 2, max: 9, letter: "c", password: "ccccccccc" })
    ).toBeFalsy();
  });
});
