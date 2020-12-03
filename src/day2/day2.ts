interface Entry {
  min: number;
  max: number;
  letter: string;
  password: string;
}

export const parseEntry = (entry: string): Entry => {
  const colon = entry.indexOf(":");
  const policy = entry.substring(0, colon);
  const password = entry.substring(colon + 2);
  const [range, letter] = policy.split(" ");
  const [min, max] = range.split("-").map((str) => parseInt(str));
  return { min, max, letter, password };
};

export const isSledValid = ({ min, max, letter, password }: Entry) => {
  let count = 0;
  for (let i = 0; i < password.length; i++) {
    if (password[i] === letter) {
      count++;
    }
  }
  return min <= count && count <= max;
};

export const countValid = (
  entryStrings: string[],
  isValid: (_: Entry) => boolean
) => {
  const entries = entryStrings.map(parseEntry);
  let validCount = 0;
  for (let i = 0; i < entries.length; i++) {
    if (isValid(entries[i])) {
      validCount++;
    }
  }
  return validCount;
};

export const isTobogganValid = ({ min, max, letter, password }: Entry) => {
  const occurrence1 = password[min - 1] === letter;
  const occurrence2 = password[max - 1] === letter;
  return occurrence1 ? !occurrence2 : occurrence2;
};
