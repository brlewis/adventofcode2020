import * as fs from "fs";

export const lines = (filename: string) => {
  return fs
    .readFileSync(filename, "utf-8")
    .split(/\r?\n/)
    .filter((x) => x);
};
