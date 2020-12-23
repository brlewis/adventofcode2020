import day20, { edgify } from "./day20";
import { paragraphs } from "../util";

const sampleInput = paragraphs(__dirname + "/pre0.txt");
const puzzleInput = paragraphs(__dirname + "/input.txt");

/**
 * --- Day 20: Jurassic Jigsaw ---The high-speed train leaves the forest and quickly carries you south. You can even see a desert in the distance! Since you have some spare time, you might as well see if there was anything interesting in the image the Mythical Information Bureau satellite captured.
 * After decoding the satellite messages, you discover that the data actually contains many small images created by the satellite's camera array. The camera array consists of many cameras; rather than produce a single square image, they produce many smaller square image tiles that need to be reassembled back into a single image.
 * Each camera in the camera array returns a single monochrome image tile with a random unique ID number.  The tiles (your puzzle input) arrived in a random order.
 * Worse yet, the camera array appears to be malfunctioning: each image tile has been rotated and flipped to a random orientation. Your first task is to reassemble the original image by orienting the tiles so they fit together.
 * To show how the tiles should be reassembled, each tile's image data includes a border that should line up exactly with its adjacent tiles. All tiles have this border, and the border lines up exactly when the tiles are both oriented correctly. Tiles at the edge of the image also have this border, but the outermost edges won't line up with any other tiles.
 * For example, suppose you have the following nine tiles:
 * Tile 2311:
 * ..##.#..#.
 * ##..#.....
 * #...##..#.
 * ####.#...#
 * ##.##.###.
 * ##...#.###
 * .#.#.#..##
 * ..#....#..
 * ###...#.#.
 * ..###..###
 *
 * Tile 1951:
 * #.##...##.
 * #.####...#
 * .....#..##
 * #...######
 * .##.#....#
 * .###.#####
 * ###.##.##.
 * .###....#.
 * ..#.#..#.#
 * #...##.#..
 *
 * Tile 1171:
 * ####...##.
 * #..##.#..#
 * ##.#..#.#.
 * .###.####.
 * ..###.####
 * .##....##.
 * .#...####.
 * #.##.####.
 * ####..#...
 * .....##...
 *
 * Tile 1427:
 * ###.##.#..
 * .#..#.##..
 * .#.##.#..#
 * #.#.#.##.#
 * ....#...##
 * ...##..##.
 * ...#.#####
 * .#.####.#.
 * ..#..###.#
 * ..##.#..#.
 *
 * Tile 1489:
 * ##.#.#....
 * ..##...#..
 * .##..##...
 * ..#...#...
 * #####...#.
 * #..#.#.#.#
 * ...#.#.#..
 * ##.#...##.
 * ..##.##.##
 * ###.##.#..
 *
 * Tile 2473:
 * #....####.
 * #..#.##...
 * #.##..#...
 * ######.#.#
 * .#...#.#.#
 * .#########
 * .###.#..#.
 * ########.#
 * ##...##.#.
 * ..###.#.#.
 *
 * Tile 2971:
 * ..#.#....#
 * #...###...
 * #.#.###...
 * ##.##..#..
 * .#####..##
 * .#..####.#
 * #..#.#..#.
 * ..####.###
 * ..#.#.###.
 * ...#.#.#.#
 *
 * Tile 2729:
 * ...#.#.#.#
 * ####.#....
 * ..#.#.....
 * ....#..#.#
 * .##..##.#.
 * .#.####...
 * ####.#.#..
 * ##.####...
 * ##..#.##..
 * #.##...##.
 *
 * Tile 3079:
 * #.#.#####.
 * .#..######
 * ..#.......
 * ######....
 * ####.#..#.
 * .#...#.##.
 * #.#####.##
 * ..#.###...
 * ..#.......
 * ..#.###...
 *
 * By rotating, flipping, and rearranging them, you can find a square arrangement that causes all adjacent borders to line up:
 * #...##.#.. ..###..### #.#.#####.
 * ..#.#..#.# ###...#.#. .#..######
 * .###....#. ..#....#.. ..#.......
 * ###.##.##. .#.#.#..## ######....
 * .###.##### ##...#.### ####.#..#.
 * .##.#....# ##.##.###. .#...#.##.
 * #...###### ####.#...# #.#####.##
 * .....#..## #...##..#. ..#.###...
 * #.####...# ##..#..... ..#.......
 * #.##...##. ..##.#..#. ..#.###...
 *
 * #.##...##. ..##.#..#. ..#.###...
 * ##..#.##.. ..#..###.# ##.##....#
 * ##.####... .#.####.#. ..#.###..#
 * ####.#.#.. ...#.##### ###.#..###
 * .#.####... ...##..##. .######.##
 * .##..##.#. ....#...## #.#.#.#...
 * ....#..#.# #.#.#.##.# #.###.###.
 * ..#.#..... .#.##.#..# #.###.##..
 * ####.#.... .#..#.##.. .######...
 * ...#.#.#.# ###.##.#.. .##...####
 *
 * ...#.#.#.# ###.##.#.. .##...####
 * ..#.#.###. ..##.##.## #..#.##..#
 * ..####.### ##.#...##. .#.#..#.##
 * #..#.#..#. ...#.#.#.. .####.###.
 * .#..####.# #..#.#.#.# ####.###..
 * .#####..## #####...#. .##....##.
 * ##.##..#.. ..#...#... .####...#.
 * #.#.###... .##..##... .####.##.#
 * #...###... ..##...#.. ...#..####
 * ..#.#....# ##.#.#.... ...##.....
 *
 * For reference, the IDs of the above tiles are:
 * 1951    2311    3079
 * 2729    1427    2473
 * 2971    1489    1171
 *
 * To check that you've assembled the image correctly, multiply the IDs of the four corner tiles together. If you do this with the assembled tiles from the example above, you get 1951 * 3079 * 2971 * 1171 = 20899048083289.
 * Assemble the tiles into an image. What do you get if you multiply together the IDs of the four corner tiles?
 */

describe("Day 20 parse/edgify", () => {
  const result = day20.parse(sampleInput);
  it("should parse", () => {
    expect(result[0].id).toEqual(2311);
    expect(result[1].id).toEqual(1951);
    expect(result[0].pixels[0].join("")).toEqual("..##.#..#.");
    expect(result[0].pixels[9].join("")).toEqual("..###..###");
    expect(result[8].id).toEqual(3079);
    expect(result[8].pixels[0].join("")).toEqual("#.#.#####.");
  });
  it("should edgify", () => {
    result.forEach(edgify);
    expect(result[0].cw).toEqual([
      "..##.#..#.",
      "...#.##..#",
      "###..###..",
      ".#..#####.",
    ]);
    expect(result[0].ccw).toEqual([
      ".#..#.##..",
      "#..##.#...",
      "..###..###",
      ".#####..#.",
    ]);
    expect(result[8].cw).toEqual([
      "#.#.#####.",
      ".#....#...",
      "...###.#..",
      "...#.##..#",
    ]);
    expect(result[8].ccw).toEqual([
      ".#####.#.#",
      "...#....#.",
      "..#.###...",
      "#..##.#...",
    ]);
  });
});

describe("Day 20 part1", () => {
  it("should work", () => {
    const data = day20.parse(sampleInput);
    expect(day20.part1(data)).toEqual(20899048083289);
  });
  it("should solve", () => {
    const data = day20.parse(puzzleInput);
    expect(day20.part1(data)).toEqual(79412832860579);
  });
});

describe("Day 20 part2", () => {
  it.skip("should work", () => {
    const data = day20.parse(sampleInput);
    expect(day20.part2(data)).toEqual(-1);
  });
  it.skip("should solve", () => {
    const data = day20.parse(puzzleInput);
    expect(day20.part2(data)).toEqual(-2);
  });
});
