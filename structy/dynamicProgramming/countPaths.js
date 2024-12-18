// https://www.structy.net/problems/count-paths

/**
 * Write a function, countPaths, that takes in a grid as an argument. In
 * the grid, 'X' represents walls and 'O' represents open spaces. You
 * may only move down or to the right and cannot pass through walls. The
 * function should return the number of ways possible to travel from the
 * top-left corner of the grid to the bottom-right corner.
 *
 * ```js
 * const grid = [
 *   ["O", "O"],
 *   ["O", "O"],
 * ];
 * countPaths(grid); // -> 2
 * ```
 */
const countPaths = (grid, r = 0, c = 0, memo = {}) => {
  const pos = JSON.stringify([r, c]);
  if (pos in memo) return memo[pos];
  if (r === grid.length || c === grid[0].length || grid[r][c] === 'X')
    return 0;
  if (r === grid.length - 1 && c === grid[0].length - 1) return 1;
  memo[pos] =
    countPaths(grid, r + 1, c, memo) + countPaths(grid, r, c + 1, memo);
  return memo[pos];
};

module.exports = {
  countPaths,
};
