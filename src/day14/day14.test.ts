import day14 from "./day14";
import { paragraphs } from "../util";

const sampleInput = [
  "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
  "mem[8] = 11",
  "mem[7] = 101",
  "mem[8] = 0",
];

const sampleInput2 = [
  "mask = 000000000000000000000000000000X1001X",
  "mem[42] = 100",
  "mask = 00000000000000000000000000000000X0XX",
  "mem[26] = 1",
];
const puzzleInput = paragraphs(__dirname + "/input.txt");

/**
 * --- Day 14: Docking Data ---As your ferry approaches the sea port, the captain asks for your help again. The computer system that runs this port isn't compatible with the docking program on the ferry, so the docking parameters aren't being correctly initialized in the docking program's memory.
 * After a brief inspection, you discover that the sea port's computer system uses a strange bitmask system in its initialization program. Although you don't have the correct decoder chip handy, you can emulate it in software!
 * The initialization program (your puzzle input) can either update the bitmask or write a value to memory.  Values and memory addresses are both 36-bit unsigned integers.  For example, ignoring bitmasks for a moment, a line like mem[8] = 11 would write the value 11 to memory address 8.
 * The bitmask is always given as a string of 36 bits, written with the most significant bit (representing 2^35) on the left and the least significant bit (2^0, that is, the 1s bit) on the right. The current bitmask is applied to values immediately before they are written to memory: a 0 or 1 overwrites the corresponding bit in the value, while an X leaves the bit in the value unchanged.
 * For example, consider the following program:
 * mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
 * mem[8] = 11
 * mem[7] = 101
 * mem[8] = 0
 *
 * This program starts by specifying a bitmask (mask = ....). The mask it specifies will overwrite two bits in every written value: the 2s bit is overwritten with 0, and the 64s bit is overwritten with 1.
 * The program then attempts to write the value 11 to memory address 8. By expanding everything out to individual bits, the mask is applied as follows:
 * value:  000000000000000000000000000000001011  (decimal 11)
 * mask:   XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
 * result: 000000000000000000000000000001001001  (decimal 73)
 *
 * So, because of the mask, the value 73 is written to memory address 8 instead. Then, the program tries to write 101 to address 7:
 * value:  000000000000000000000000000001100101  (decimal 101)
 * mask:   XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
 * result: 000000000000000000000000000001100101  (decimal 101)
 *
 * This time, the mask has no effect, as the bits it overwrote were already the values the mask tried to set. Finally, the program tries to write 0 to address 8:
 * value:  000000000000000000000000000000000000  (decimal 0)
 * mask:   XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
 * result: 000000000000000000000000000001000000  (decimal 64)
 *
 * 64 is written to address 8 instead, overwriting the value that was there previously.
 * To initialize your ferry's docking program, you need the sum of all values left in memory after the initialization program completes. (The entire 36-bit address space begins initialized to the value 0 at every address.) In the above example, only two values in memory are not zero - 101 (at address 7) and 64 (at address 8) - producing a sum of 165.
 * Execute the initialization program. What is the sum of all values left in memory after it completes?
 */

describe("Day 14 parse", () => {
  it("should parse", () => {
    const result = day14.parse(sampleInput);
    expect(result).toEqual([
      ["mask", "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X"],
      ["mem", 8, 11],
      ["mem", 7, 101],
      ["mem", 8, 0],
    ]);
  });
});

describe("Day 14 mask", () => {
  it("should parse", () => {
    expect(day14.applyMask("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 11)).toEqual(
      73
    );
  });
});

describe("Day 14 part1", () => {
  it("should work", () => {
    const data = day14.parse(sampleInput);
    expect(day14.part1(data)).toEqual(165);
  });
  it("should solve", () => {
    const data = day14.parse(puzzleInput[0]);
    expect(day14.part1(data)).toEqual(6559449933360);
  });
});

describe("Day 14 getMasks", () => {
  it("should parse", () => {
    expect(day14.getMasks("000000000000000000000000000000X1001X")).toEqual([
      "000000000000000000000000000000-1001-",
      "000000000000000000000000000000-10011",
      "00000000000000000000000000000011001-",
      "000000000000000000000000000000110011",
    ]);
  });
});

describe("Day 14 applyMask2", () => {
  it("should parse", () => {
    expect(
      day14
        .getMasks("000000000000000000000000000000X1001X")
        .map((m) => day14.applyMask2(m, 42))
    ).toEqual([26, 27, 58, 59]);
  });
});

describe("Day 14 part2", () => {
  it("should work", () => {
    const data = day14.parse(sampleInput2);
    expect(day14.part2(data)).toEqual(208);
  });
  it("should solve", () => {
    const data = day14.parse(puzzleInput[0]);
    expect(day14.part2(data)).toEqual(3369767240513);
  });
});
