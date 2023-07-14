// I made this script to scaffold each new day's code.
// Need to get a cookie value from your browser, then run, e.g.
// to scaffold day 1:
// `AOCDAY=1 session=[cookie value] node src/build.js`

const fs = require("fs");
const https = require("https");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const hoy = new Date();
const year = 2020 // hoy.getFullYear();
const day = process.env.AOCDAY || hoy.getDate();

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
    const samples = [...dom.window.document.querySelectorAll("pre")].map((pre) =>
        pre.textContent?.trim()
    );
    samples.forEach((s, i) =>
        fs.writeFile(`${daydir}/pre${i}.txt`, s, {}, () => { })
    );

    const sample = samples.length && samples[0];
    const article = dom.window.document
        .querySelector("article.day-desc")
        ?.textContent.trim();
    fs.writeFileSync(
        `${daydir}/day${day}.test.ts`,
        `import day${day} from "./day${day}";
import { paragraphs } from "../util";

const sampleInput = paragraphs(__dirname + "/pre0.txt");
const puzzleInput = paragraphs(__dirname + "/input.txt");

/**
 * ${article.split("\n").join("\n * ")}
 */

describe("Day ${day} parse", () => {
  it("should parse", () => {
      const result = day${day}.parse(sampleInput[0]);
      expect(result).toEqual(sampleInput[0]);
  });
});

describe("Day ${day} part1", () => {
  it("should work", () => {
    const data = day${day}.parse(sampleInput[0]);
    expect(day${day}.part1(data)).toEqual(-1);
  });
  it("should solve", () => {
    const data = day${day}.parse(puzzleInput[0]);
    expect(day${day}.part1(data)).toEqual(-2);
  });
});

describe("Day ${day} part2", () => {
  it("should work", () => {
    const data = day${day}.parse(sampleInput[0]);
    expect(day${day}.part2(data)).toEqual(-1);
  });
  it("should solve", () => {
    const data = day${day}.parse(puzzleInput[0]);
    expect(day${day}.part2(data)).toEqual(-2);
  });
});`
    );
});

fs.writeFileSync(
    `${daydir}/day${day}.ts`,
    `import * as _ from "lodash";

export const parse = (lines: string[]) =>
  lines.map((line) => {
    return line;
});

export const part1 = (data: any[]) => {
  return data.length;
};

export const part2 = (data: any[]) => {
  return part1(data);
};

export default { parse, part1, part2 };
    `
);
