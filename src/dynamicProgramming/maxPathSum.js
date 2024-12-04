/**
 * Write a function, maxPathSum, that takes in a grid as an argument.
 * The function should return the maximum sum possible by traveling a
 * path from the top-left corner to the bottom-right corner. You may
 * only travel through the grid by moving down or right.
 *
 * You can assume that all numbers are non-negative.
 *
 * ```js
 * const grid = [
 *   [1, 1, 3, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1],
 *   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 *   [1, 2, 1, 1, 6, 1, 1, 5, 1, 1, 0, 0, 1],
 *   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 *   [1, 1, 1, 5, 1, 1, 1, 1, 0, 1, 1, 1, 1],
 *   [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 *   [2, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1],
 *   [2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 *   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 *   [1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 1],
 *   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 *   [1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 *   [1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1],
 *   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 *   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 *   [1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 *   [1, 42, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1],
 *   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 *   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 * ];
 * maxPathSum(grid); // -> 82
 * ```
 */
// The `sum` variable isn't necessary. It's an artifact from the
// unmemoized version only. But I'm keeping it in so when/if I review
// this it helps jog my memory.
const maxPathSum = (grid, r = 0, c = 0, sum = 0, memo = {}) => {
  const pos = JSON.stringify([r, c]);
  if (pos in memo) return memo[pos];
  if (r === grid.length - 1 && c === grid[0].length - 1) return grid[r][c];
  if (r === grid.length || c === grid[0].length) return sum;

  const maxSum = sum + grid[r][c];
  const down = maxPathSum(grid, r + 1, c, sum, memo);
  const right = maxPathSum(grid, r, c + 1, sum, memo);
  memo[pos] = maxSum + Math.max(down, right);
  return memo[pos];
};

module.exports = {
  maxPathSum,
};

/** Given answer
 * ```js
 * const maxPathSum = (grid, r = 0, c = 0, memo = {}) => {
 *   const pos = r + ',' + c;
 *   if (pos in memo) return memo[pos];
 *
 *   if (r === grid.length || c === grid[0].length) return -Infinity;
 *
 *   if (r === grid.length - 1 && c === grid[0].length - 1) return grid[r][c];
 *
 *   const down = maxPathSum(grid, r + 1, c, memo);
 *   const right = maxPathSum(grid, r, c + 1, memo);
 *
 *   memo[pos] = grid[r][c] + Math.max(down, right);
 *   return memo[pos];
 * };
 * ```
 */
