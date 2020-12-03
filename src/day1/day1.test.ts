import { expenseReport2, expenseReport3 } from "./day1";
import { puzzleInput } from "./input";

describe("expenseReport2", () => {
  it("should find the product of two numbers that sum to 2020", () => {
    expect(expenseReport2([1721, 979, 366, 299, 675, 1456], 2020)).toEqual(
      514579
    );
  });
  it("should handle long lists of numbers", () => {
    expect(expenseReport2(puzzleInput, 2020)).toEqual(1016131);
  });
});

describe("expenseReport3", () => {
  it("should find the product of three numbers that sum to 2020", () => {
    expect(expenseReport3([1721, 979, 366, 299, 675, 1456], 2020)).toEqual(
      241861950
    );
  });
  it("should handle long lists of numbers", () => {
    expect(expenseReport3(puzzleInput, 2020)).toEqual(276432018);
  });
});
