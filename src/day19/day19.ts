import * as _ from "lodash";
import { num } from "../util";

interface Rule {
  index: number;
  rule: number[][] | string;
  all?: Set<string>;
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
  const all = (ruleNum: number): Set<string> => {
    let rule = rulebook.get(ruleNum);
    if (!rule) {
      throw new Error(`no rule ${ruleNum}`);
    }
    if (rule?.all) {
      return rule.all;
    }
    if (typeof rule?.rule === "string") {
      rule.all = new Set([rule.rule]);
      return rule.all;
    }
    const allSeq = (ruleNums: number[]): Set<string> => {
      if (!ruleNums.length) {
        return new Set([""]);
      } else {
        let set: Set<string> = new Set();
        for (let str1 of all(ruleNums[0]).values()) {
          for (let str2 of allSeq(ruleNums.slice(1)).values()) {
            set.add(str1 + str2);
          }
        }
        return set;
      }
    };
    rule.all = new Set();
    rule.rule.forEach((seq: number[]) => {
      for (let str of allSeq(seq)) {
        rule.all.add(str);
      }
    });
    return rule.all;
  };
  let count = 0;
  messages.forEach((msg) => {
    if (all(0).has(msg)) {
      count++;
    }
  });
  return count;
};

export const part2 = (data: any[]) => {
  return part1(data);
};

export default { parse, part1, part2 };
