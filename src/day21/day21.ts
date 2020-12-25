import * as _ from "lodash";

interface Food {
  ingredients: string[];
  allergens: string[];
}

export const parse = (lines: string[]): Food[] =>
  lines.map((line) => {
    const matches = line.match(/^(.*) \(contains (.*)\)/);
    if (!matches) {
      throw new Error(`couldn't parse ${line}`);
    }
    const [, ingredients, allergens] = matches;
    return {
      ingredients: ingredients.split(" "),
      allergens: allergens.split(", "),
    };
  });

export const part1 = (data: Food[]) => {
  const possibleIngredients: Map<string, Set<string>> = new Map();
  const hypoalergenic: Set<string> = new Set();

  data.forEach((food) => {
    food.ingredients.forEach((ingredient) => hypoalergenic.add(ingredient));
    food.allergens.forEach((allergen) => {
      const poss = possibleIngredients.get(allergen);
      if (!poss) {
        possibleIngredients.set(allergen, new Set(food.ingredients));
      } else {
        poss.forEach((ingredient) => {
          if (!food.ingredients.includes(ingredient)) {
            poss.delete(ingredient);
          }
        });
      }
    });
  });

  let reduced = true;
  while (reduced) {
    reduced = false;
    for (let allergen of possibleIngredients.keys()) {
      const size = possibleIngredients.get(allergen)?.size;
      if (size === 1) {
        for (let ingredient of possibleIngredients.get(allergen)) {
          data.forEach((food) => {
            if (
              food.ingredients.includes(ingredient) &&
              food.allergens.includes(allergen)
            ) {
              food.allergens.forEach((otherAllergen) => {
                if (otherAllergen !== allergen) {
                  reduced =
                    reduced ||
                    !!possibleIngredients
                      .get(otherAllergen)
                      ?.delete(ingredient);
                }
              });
            }
          });
        }
      }
    }
  }

  for (let allergen of possibleIngredients.keys()) {
    for (let ingredient of possibleIngredients.get(allergen)) {
      hypoalergenic.delete(ingredient);
    }
  }
  let count = 0;
  data.forEach((food) =>
    food.ingredients.forEach((ingredient) => {
      if (hypoalergenic.has(ingredient)) {
        count++;
      }
    })
  );
  return count;
};

export const part2 = (data: Food[]) => {
  const possibleIngredients: Map<string, Set<string>> = new Map();
  const hypoalergenic: Set<string> = new Set();

  data.forEach((food) => {
    food.ingredients.forEach((ingredient) => hypoalergenic.add(ingredient));
    food.allergens.forEach((allergen) => {
      const poss = possibleIngredients.get(allergen);
      if (!poss) {
        possibleIngredients.set(allergen, new Set(food.ingredients));
      } else {
        poss.forEach((ingredient) => {
          if (!food.ingredients.includes(ingredient)) {
            poss.delete(ingredient);
          }
        });
      }
    });
  });

  let reduced = true;
  while (reduced) {
    reduced = false;
    for (let allergen of possibleIngredients.keys()) {
      const size = possibleIngredients.get(allergen)?.size;
      if (size === 1) {
        for (let ingredient of possibleIngredients.get(allergen)) {
          for (let allergen2 of possibleIngredients.keys()) {
            if (allergen2 !== allergen) {
              reduced =
                reduced ||
                !!possibleIngredients.get(allergen2)?.delete(ingredient);
            }
          }
        }
      }
    }
  }

  const alphabetizedAllergens = Array.from(possibleIngredients.keys());
  alphabetizedAllergens.sort();
  return alphabetizedAllergens
    .map((allergen) => {
      for (let ingredient of possibleIngredients.get(allergen)) {
        return ingredient;
      }
    })
    .join();
};

export default { parse, part1, part2 };
