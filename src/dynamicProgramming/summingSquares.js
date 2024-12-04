//

/**
 * Write a function, summingSquares, that takes a target number as an
 * argument. The function should return the minimum number of perfect
 * squares that sum to the target. A perfect square is a number of the
 * form (i*i) where i >= 1.
 *
 * For example: 1, 4, 9, 16 are perfect squares, but 8 is not perfect
 * square.
 * ```js
 * ```
 */
const summingSquares = (n, memo = {}) => {
  if (n === 0) return 0;
  if (n in memo) return memo[n];
  // if (isPerfectSquare(n)) return 1;

  let minVal = Infinity;
  for (i = 1; i < Math.sqrt(n); i *= 2) {
    // if (isPerfectSquare(n - i)) {
    const square = i * i;
    minVal = Math.min(minVal, 1 + summingSquares(n - square, memo));
    // }
  }

  memo[n] = minVal;
  return memo[n];
};

const isPerfectSquare = n => {
  return Math.floor(Math.sqrt(n)) === Math.sqrt(n);
};

module.exports = {
  summingSquares,
};

console.log(summingSquares(87));
/** Given solution
 * ```js
 * const summingSquares = (n, memo = {}) => {
 *   if (n in memo) return memo[n];
 *
 *   if (n === 0) return 0;
 *
 *   let minSquares = Infinity;
 *   for (let i = 1; i <= Math.sqrt(n); i += 1) {
 *     const square = i * i;
 *     const numSquares = 1 + summingSquares(n - square, memo);
 *     minSquares = Math.min(minSquares, numSquares);
 *   }
 *
 *   memo[n] = minSquares;
 *   return minSquares;
 * };
 * ```
 */
