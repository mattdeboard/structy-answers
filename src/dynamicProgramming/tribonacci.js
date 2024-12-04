// https://www.structy.net/problems/tribonacci

/**
 * Write a function tribonacci that takes in a number argument, n, and returns the n-th number of the Tribonacci sequence.
 *
 * The 0-th and 1-st numbers of the sequence are both 0.
 *
 * The 2-nd number of the sequence is 1.
 *
 * To generate further numbers of the sequence, calculate the sum of previous three numbers.
 *
 * Solve this recursively.
 *
 * ```js
 * tribonacci(37); // -> 1132436852
 * ```
 */
const tribonacci = (n, memo = {}) => {
  if (n === 0 || n === 1) return 0;
  if (n === 2) return 1;
  if (n in memo) return memo[n];
  memo[n] =
    tribonacci(n - 3, memo) +
    tribonacci(n - 2, memo) +
    tribonacci(n - 1, memo);
  return memo[n];
};

module.exports = {
  tribonacci,
};

// My solution is same as given
