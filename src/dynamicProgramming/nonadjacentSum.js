// https://www.structy.net/problems/non-adjacent-sum

/**
 * Write a function, nonAdjacentSum, that takes in an array of numbers
 * as an argument. The function should return the maximum sum of
 * non-adjacent elements in the array. There is no limit on how many
 * elements can be taken into the sum as long as they are not adjacent.
 *
 * For example, given:
 *
 * [2, 4, 5, 12, 7]
 *
 * The maximum non-adjacent sum is 16, because 4 + 12.
 * 4 and 12 are not adjacent in the array.
 *
 * ```js
 * const nums = [
 *   72, 62, 10,  6, 20, 19, 42, 46, 24, 78,
 *   30, 41, 75, 38, 23, 28, 66, 55, 12, 17,
 *   83, 80, 56, 68,  6, 22, 56, 96, 77, 98,
 *   61, 20,  0, 76, 53, 74,  8, 22, 92, 37,
 *   30, 41, 75, 38, 23, 28, 66, 55, 12, 17,
 *   72, 62, 10,  6, 20, 19, 42, 46, 24, 78,
 *   42
 * ];
 * nonAdjacentSum(nums); // -> 1465
 * ```
 */
const nonAdjacentSum = (nums, i = 0, memo = {}) => {
  if (i > nums.length - 1) return 0;
  if (i in memo) return memo[i];
  const a = nonAdjacentSum(nums, i + 1, memo),
    b = nums[i] + nonAdjacentSum(nums, i + 2, memo);
  memo[i] = Math.max(a, b);
  return memo[i];
};

module.exports = {
  nonAdjacentSum,
};

/** Given solution
 * ```js
 * const nonAdjacentSum = (nums, i = 0, memo = {}) => {
 *   if (i in memo) return memo[i];
 *
 *   if (i >= nums.length) return 0;
 *
 *   const include = nums[i] + nonAdjacentSum(nums, i + 2, memo);
 *   const exclude = nonAdjacentSum(nums, i + 1, memo);
 *   memo[i] = Math.max(include, exclude);
 *   return memo[i]
 * };
 * ```
 */
