import day16, { invalidForFields } from "./day16";
import { paragraphs } from "../util";

const sampleInput = paragraphs(__dirname + "/pre1.txt");
const puzzleInput = paragraphs(__dirname + "/input.txt");

/**
 * --- Day 16: Ticket Translation ---As you're walking to yet another connecting flight, you realize that one of the legs of your re-routed trip coming up is on a high-speed train. However, the train ticket you were given is in a language you don't understand. You should probably figure out what it says before you get to the train station after the next flight.
 * Unfortunately, you can't actually read the words on the ticket. You can, however, read the numbers, and so you figure out the fields these tickets must have and the valid ranges for values in those fields.
 * You collect the rules for ticket fields, the numbers on your ticket, and the numbers on other nearby tickets for the same train service (via the airport security cameras) together into a single document you can reference (your puzzle input).
 * The rules for ticket fields specify a list of fields that exist somewhere on the ticket and the valid ranges of values for each field. For example, a rule like class: 1-3 or 5-7 means that one of the fields in every ticket is named class and can be any value in the ranges 1-3 or 5-7 (inclusive, such that 3 and 5 are both valid in this field, but 4 is not).
 * Each ticket is represented by a single line of comma-separated values. The values are the numbers on the ticket in the order they appear; every ticket has the same format. For example, consider this ticket:
 * .--------------------------------------------------------.
 * | ????: 101    ?????: 102   ??????????: 103     ???: 104 |
 * |                                                        |
 * | ??: 301  ??: 302             ???????: 303      ??????? |
 * | ??: 401  ??: 402           ???? ????: 403    ????????? |
 * '--------------------------------------------------------'
 *
 * Here, ? represents text in a language you don't understand. This ticket might be represented as 101,102,103,104,301,302,303,401,402,403; of course, the actual train tickets you're looking at are much more complicated. In any case, you've extracted just the numbers in such a way that the first number is always the same specific field, the second number is always a different specific field, and so on - you just don't know what each position actually means!
 * Start by determining which tickets are completely invalid; these are tickets that contain values which aren't valid for any field. Ignore your ticket for now.
 * For example, suppose you have the following notes:
 * class: 1-3 or 5-7
 * row: 6-11 or 33-44
 * seat: 13-40 or 45-50
 *
 * your ticket:
 * 7,1,14
 *
 * nearby tickets:
 * 7,3,47
 * 40,4,50
 * 55,2,20
 * 38,6,12
 *
 * It doesn't matter which position corresponds to which field; you can identify invalid nearby tickets by considering only whether tickets contain values that are not valid for any field. In this example, the values on the first nearby ticket are all valid for at least one field. This is not true of the other three nearby tickets: the values 4, 55, and 12 are are not valid for any field. Adding together all of the invalid values produces your ticket scanning error rate: 4 + 55 + 12 = 71.
 * Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?
 */

describe("Day 16 parse", () => {
  it("should parse", () => {
    const result = day16.parse(sampleInput);
    expect(result.fields[0].name).toEqual("class");
    expect(result.yours).toEqual([7, 1, 14]);
    expect(result.nearby.length).toEqual(4);
    expect(result.nearby[1]).toEqual([40, 4, 50]);
    expect(result.nearby[3]).toEqual([38, 6, 12]);
  });
});

describe("Day 16 validate", () => {
  it("should validate", () => {
    const result = day16.parse(sampleInput);
    expect(result.nearby.length).toEqual(4);
    const f = result.fields;
    expect(day16.validForFields(f, 3)).toEqual(["class"]);
    expect(day16.validForFields(f, 4)).toEqual([]);
  });
});

describe("Day 16 part1", () => {
  it("should work", () => {
    const data = day16.parse(sampleInput);
    expect(day16.part1(data)).toEqual(71);
  });
  it("should solve", () => {
    const data = day16.parse(puzzleInput);
    expect(day16.part1(data)).toEqual(25788);
  });
});

describe("Day 16 part2", () => {
  it("should work", () => {
    const data = day16.parse([
      ["class: 0-1 or 4-19", "row: 0-5 or 8-19", "seat: 0-13 or 16-19"],
      ["your ticket:", "11,12,13"],
      ["nearby tickets:", "3,9,18", "15,1,5", "5,14,9"],
    ]);
    console.log(invalidForFields(data.fields, 3));
    expect(data.fields.map((f) => f.name)).toEqual(["class", "row", "seat"]);
    expect(day16.fieldOrder(data)).toEqual(["row", "class", "seat"]);
  });
  it("should solve", () => {
    const data = day16.parse(puzzleInput);
    expect(day16.part2(data)).toEqual(-2);
  });
});
