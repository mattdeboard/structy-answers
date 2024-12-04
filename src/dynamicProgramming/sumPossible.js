// https://www.structy.net/problems/sum-possible

/**
 * Write a function sumPossible that takes in an amount and an array of
 * positive numbers. The function should return a boolean indicating
 * whether or not it is possible to create the amount by summing numbers
 * of the array. You may reuse numbers of the array as many times as
 * necessary.
 *
 * You may assume that the target amount is non-negative.
 *
 * ```js
 * sumPossible(8, [5, 12, 4]) // -> true, 4 + 4
 * ```
 */

const sumPossible = (amount, numbers, memo = {}) => {
  if (amount === 0) return true;
  if (amount < 0) return false;
  if (amount in memo) return memo[amount];

  for (const n of numbers) {
    if (sumPossible(amount - n, numbers, memo)) {
      memo[amount] = true;
      return true;
    }
  }
  memo[amount] = false;
  return false;
};

module.exports = {
  sumPossible,
};

// I didn't come up with my own solution. The above is given.
