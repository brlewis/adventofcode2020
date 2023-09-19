# Interview practice day 1, part 1

## Have fun with this

Getting better at things is fun. You're reading this because you want to get better as the interviewee in coding interviews. Why don't you skip down to the next section and just get started? The only reason to keep reading this section is if you're feeling a little nervous and unconfident.

Nervousness is usually about the unknown. What if I fail? What will that look like? OK, let's look failure in the face and figure out what's the worst it can be. Worst case, you'll go through all the steps in here and nothing will click. You'll go back through again, and still nothing clicks. You won't get any better at coding; you'll just have learned something about yourself.

That's the extreme worst-case scenario, and it isn't so bad. More likely failure scenarios are where some things click and others don't. You won't leave ready to pass a coding interview, but you'll get some practice looking at problems and making them more manageable.

I was setting myself up for failure doing Advent of Code in 2020. Each day's problem was released at midnight in my time zone, and I don't do well on low sleep. What possessed me to even participate? It was a weird time, 2020, with a global pandemic and social unrest. But largely I did it because I'm not afraid of failure. I like to test my limits. If you do too, you're taking the right approach.

Looking back at my solutions today, I certainly seem room for improvement. But overall, midnight me did OK back in 2020. If I were interviewing midnight me, I would have been happy to see some of these solutions, and gently prompted for better ones. Most interviewers are the same. You can start out by finding any working solution at all to the problem presented, and then follow up with any optimizations you can think of. Often these optimizations are simplifications that become obvious to you as you internalize what the problem is that you're solving.

So just have fun. Failure isn't that bad, and success is likely.

## Restating the problem, simply

When you look at [2020 day 1](https://adventofcode.com/2020/day/1), you see a lot of words. Take your time and read through them, but do so for the purpose of slimming them down to a manageable problem, in this form:

>Given X, find Y.

The first few paragraphs are just introducing Advent of Code in general, not specific to this problem. Then there are paragraphs describing the problem and giving an example.

Distilling down to just the problem, you get

>Given a list of numbers, find a * b where a and b are in the list, and a + b = 2020.

The example they give is not just extra words; it's useful for confirming that this restatement is right. But having done that, we work with just the problem.

## Solving the problem

If you're confident, skip this section and go straight to the "Now try coding" section below.

The direct translation of the problem into a solution would look like this:

```typescript
for (const a of entries) {
  for (const b of entries) {
    if (a + b === desiredSum) {
      return a * b;
    }
  }
}
```

Intuitively, though, this seems inefficient. If the expense report has `n` numbers in it, we'll have `n<sup>2</sup>` loop iterations, also known as O(n<sup>2</sup>). (Definitely learn big O notation before interviewing.) Once we've picked an `a`, we know what `b` we want, right? Since `a + b = 2020` we know from Algebra that `b = 2020 - a`.

This optimization occurred to me when I was doing this problem just after midnight, December 2, 2020. You can see the result in [day1.ts](day1.ts). I sorted the input and used a binary search utility to find the right `b`. As I look at this solution in hindsight and in normal daytime hours, there's a significantly more efficient solution using [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#instance_methods).

```typescript
const set = new Set(entries);
for (const a of entries) {
  const b = desiredSum - a;
  if (set.has(b)) {
    return a * b;
  }
}
```

This solution is O(n). It makes two passes through the `entries` array: one to construct the set, and another to find `a` and `b`. There's another solution with only 1 pass through the array, left as an exercise for the reader.

## Code it yourself.

Follow the instructions in the [top-level README](../../README.md) and start the test runner. Try deleting the `expenseReport` function body in [day1.ts](day1.ts) and coding it yourself. Check if the tests still pass.

* Don't delete the `return false` at the end, because that's needed for part 2 of day 1.
* Use `desiredSum` rather than hard-coding `2020`, because that's also needed for part 2 of day 1.
* After you're comfortable coding solutions in your IDE, try coding them on a whiteboard. (Interviewers don't expect your syntax to be perfect, just that you have an idea how to solve the problem.)
* If it would help to watch me type the solutions, watch https://youtu.be/sMuvF9x99lE

# Interview practice day 1, part 2

One day of Advent of Code parallels how coding interviews often go. Often there's a followup question, somewhat harder than the initial question, to test the limits of people who quickly answer the initial question. Front-end interviews don't always work this way. Sometimes the initial question is all the interviewer needs to see if the candidate can code well enough for the position.

If you're going to interview at a company that expects strong coding and algorithms skills, you should do the "part 2" challenges in Advent of Code. Stop here and go back to [2020 day 1](https://adventofcode.com/2020/day/1) to see if you can solve the first one yourself. (You have to input your answer to part 1 before it will show you part 2.)
