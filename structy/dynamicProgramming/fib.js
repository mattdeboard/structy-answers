// https://www.structy.net/problems/fib

/**
 * ```js
 * fib(46); // -> 1836311903
 * ```
 */
const fib = (n, memo = {}) => {
  if ([0, 1].includes(n)) return n;
  if (n in memo) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
};

module.exports = {
  fib,
};

// My answer is the same as the provided
