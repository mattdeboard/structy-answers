// https://www.structy.net/problems/premium/permutations

/**
 * Write a function, permutations, that takes in an array an argument.
 * The function should return a 2D array where each subarray represents
 * one of the possible permutations of the array.
 *
 * The subarrays may be returned in any order.
 *
 * You may assume that the input array contains unique elements.
 */
const permutations = items => {
  if (items.length === 0) return [[]];
  const [head, ...tail] = items;
  const collector = [];

  for (const perm of permutations(tail)) {
    for (i = 0; i < items.length; i++) {
      collector.push([...perm.slice(0, i), head, ...perm.slice(i)]);
    }
  }
  return collector;
};

console.log(permutations(['a', 'b', 'c'])); // ->
// [
//   [ 'a', 'b', 'c' ],
//   [ 'b', 'a', 'c' ],
//   [ 'b', 'c', 'a' ],
//   [ 'a', 'c', 'b' ],
//   [ 'c', 'a', 'b' ],
//   [ 'c', 'b', 'a' ]
// ]

// Given solution:
{
  const permutations = items => {
    if (items.length === 0) return [[]];

    const first = items[0];
    const perms = permutations(items.slice(1));

    const fullPermutations = [];
    for (let perm of perms) {
      for (let i = 0; i <= perm.length; i += 1) {
        fullPermutations.push([...perm.slice(0, i), first, ...perm.slice(i)]);
      }
    }
    return fullPermutations;
  };
}
