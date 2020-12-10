const fs = require("fs");
const https = require("https");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const hoy = new Date();
const year = hoy.getFullYear();
const day = hoy.getDate();

const getContents = (path, callback) => {
  let contents = "";

  const options = {
    hostname: "adventofcode.com",
    path,
    port: 443,
    headers: {
      Cookie: `session=${process.env.session}`,
    },
  };

  const req = https.get(options, (res) => {
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      contents += chunk;
    });
    res.on("end", () => callback(contents));
    req.on("error", (e) => {
      console.error(`problem with request: ${e.message}`);
    });
  });
};

const daydir = `src/day${day}`;
fs.mkdirSync(daydir, { recursive: true });

// Save input for reading
getContents(`/${year}/day/${day}/input`, (contents) => {
  fs.writeFileSync(`${daydir}/input.txt`, contents);
});

// Save description
getContents(`/${year}/day/${day}`, (contents) => {
  const dom = new JSDOM(contents);
  const sample = dom.window.document.querySelector("pre")?.textContent?.trim();
  const article = dom.window.document
    .querySelector("article.day-desc")
    ?.textContent.trim();
  fs.writeFileSync(
    `${daydir}/day${day}.test.ts`,
    `import day${day} from "./day${day}";
import { paragraphs } from "../util";

const sampleInput = ${JSON.stringify(sample?.split("\n"), null, 2)};
const puzzleInput = paragraphs(__dirname + "/input.txt");

/**
 * ${article.split("\n").join("\n * ")}
 */

describe("Day ${day} parse", () => {
  it("should parse", () => {
      const result = day${day}.parse(sampleInput);
      expect(result).toEqual(sampleInput);
  });
});

describe("Day ${day} part1", () => {
  it("should work", () => {
    const data = day${day}.parse(sampleInput);
    expect(day${day}.part1(data)).toEqual(-1);
  });
  it("should solve", () => {
    const data = day${day}.parse(puzzleInput);
    expect(day${day}.part1(data)).toEqual(-2);
  });
});

describe("Day ${day} part2", () => {
  it("should work", () => {
    const data = day${day}.parse(sampleInput);
    expect(day${day}.part2(data)).toEqual(-1);
  });
  it("should solve", () => {
    const data = day${day}.parse(puzzleInput);
    expect(day${day}.part2(data)).toEqual(-2);
  });
});`
  );
});

fs.writeFileSync(
  `${daydir}/day${day}.ts`,
  `export const parse = (lines: string[]) =>
  lines.map((line) => {
    return line;
});

export const part1 = (data) => {
  return data.length;
};

export const part2 = (data) => {
  return part1(data);
};

export default { parse, part1, part2 };
`
);
