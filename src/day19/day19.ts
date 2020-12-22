import * as _ from "lodash";
import { num } from "../util";

interface Rule {
  index: number;
  rule: number[][] | string;
  regex?: string;
}

export const parse = (lines: string[]): Rule[] =>
  lines.map((line) => {
    let [index, rule] = line.split(": ");
    if (rule === '"a"' || rule === '"b"') {
      return {
        index: num(index),
        rule: rule[1],
      };
    } else {
      let branches = rule.split(" | ");
      return {
        index: num(index),
        rule: branches.map((str) => str.split(" ").map(num)),
      };
    }
  });

export const part1 = (rules: Rule[], messages: string[]) => {
  const rulebook: Map<number, Rule> = new Map();
  rules.forEach((rule) => {
    rulebook.set(rule.index, rule);
  });
  const regex = (ruleNum: number): string => {
    let rule = rulebook.get(ruleNum);
    if (!rule) {
      throw new Error(`no rule ${ruleNum}`);
    }
    if (rule?.regex) {
      return rule.regex;
    }
    if (typeof rule?.rule === "string") {
      rule.regex = rule.rule;
      return rule.regex;
    }
    const allSeq = (ruleNums: number[]): string => ruleNums.map(regex).join("");

    rule.regex = `(${rule.rule.map(allSeq).join("|")})`;
    return rule.regex;
  };
  let count = 0;
  const r = new RegExp(`^${regex(0)}$`);
  messages.forEach((msg) => {
    if (msg.match(r)) {
      count++;
    }
  });
  return count;
};

export const part2 = (rules: Rule[], messages: string[]) => {};

export default { parse, part1, part2 };
