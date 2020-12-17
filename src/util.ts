import * as fs from "fs";

export const lines = (filename: string) => {
  return fs
    .readFileSync(filename, "utf-8")
    .split(/\r?\n/)
    .filter((x) => x);
};

export const paragraphs = (filename: string) => {
  return fs
    .readFileSync(filename, "utf-8")
    .split(/\r?\n\r?\n/)
    .filter((x) => x)
    .map((paragraph) => paragraph.split(/\r?\n/).filter((x) => x));
};

export const num = (str: string) => {
  let n = parseInt(str);
  return isNaN(n) ? str : n;
};
