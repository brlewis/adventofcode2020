import * as _ from "lodash";

interface Tile {
  id: number;
  pixels: string[][];
  cw?: string[];
  ccw?: string[];
}

export const parse = (paragraphs: string[][]): Tile[] =>
  paragraphs.map((para) => {
    const match = para[0].match(/Tile (\d*):/);
    if (!match) {
      throw new Error(`Expected tile id, got ${para[0]}`);
    }
    const id = parseInt(match[1]);
    const pixels: string[][] = [];
    for (let i = 1; i < para.length; i++) {
      pixels.push(para[i].split(""));
    }
    return { id, pixels };
  });

export const edgify = (tile: Tile) => {
  const top = tile.pixels[0];
  const right = tile.pixels.map((row) => row[row.length - 1]);
  const bottom = tile.pixels[tile.pixels.length - 1];
  const left = tile.pixels.map((row) => row[0]);
  const topReverse = [...top].reverse();
  const rightReverse = [...right].reverse();
  const bottomReverse = [...bottom].reverse();
  const leftReverse = [...left].reverse();
  const clockwise = [
    top.join(""),
    right.join(""),
    bottomReverse.join(""),
    leftReverse.join(""),
  ];
  const ccw = [
    topReverse.join(""),
    rightReverse.join(""),
    bottom.join(""),
    left.join(""),
  ];
  tile.cw = clockwise;
  tile.ccw = ccw;
};

export const part1 = (data: Tile[]) => {
  const cwEdges: Map<string, Tile[]> = new Map();
  const ccwEdges: Map<string, Tile[]> = new Map();
  data.forEach((tile) => {
    edgify(tile);
    tile.cw?.forEach((edge) => {
      const tiles = cwEdges.get(edge);
      if (!tiles) {
        cwEdges.set(edge, [tile]);
      } else if (!tiles.includes(tile)) {
        tiles.push(tile);
      }
    });
    tile.ccw?.forEach((edge) => {
      const tiles = ccwEdges.get(edge);
      if (!tiles) {
        ccwEdges.set(edge, [tile]);
      } else if (!tiles.includes(tile)) {
        tiles.push(tile);
      }
    });
  });

  const corners: Tile[] = [];
  data.forEach((tile) => {
    let possibleDirectionCount = 0;
    tile.cw?.forEach((edge) => {
      const matches = ccwEdges.get(edge);
      const flippedMatches = cwEdges.get(edge);
      let candidateCount =
        (matches?.length || 0) + (flippedMatches?.length || 0);
      if (matches?.includes(tile)) {
        candidateCount--;
      }
      if (flippedMatches?.includes(tile)) {
        candidateCount--;
      }
      if (candidateCount) {
        possibleDirectionCount++;
      }
    });
    if (possibleDirectionCount === 2) {
      corners.push(tile);
    }
  });
  if (corners.length !== 4) {
    throw new Error(`corners: ${corners.length}`);
  }
  return corners[0].id * corners[1].id * corners[2].id * corners[3].id;
};

export const part2 = (data: any[]) => {
  return part1(data);
};

export default { parse, edgify, part1, part2 };
