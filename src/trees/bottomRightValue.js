// https://www.structy.net/problems/premium/bottom-right-value

/**
 * Write a function, bottomRightValue, that takes in the root of a
 * binary tree. The function should return the right-most value in the
 * bottom-most level of the tree.
 *
 * You may assume that the input tree is non-empty.
 *
 * ```js
 * const a = new Node(3);
 * const b = new Node(11);
 * const c = new Node(10);
 * const d = new Node(4);
 * const e = new Node(-2);
 * const f = new Node(1);
 *
 * a.left = b;
 * a.right = c;
 * b.left = d;
 * b.right = e;
 * c.right = f;
 *
 * //       3
 * //    /    \
 * //   11     10
 * //  / \      \
 * // 4   -2     1
 *
 * bottomRightValue(a); // -> 1
 * ```
 */
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }

const bottomRightValue = root => {
  if (root.right === null) return root.val;
  const queue = [root];
  let answer = null;
  while (queue.length) {
    const v = queue.pop();
    answer = v.val;
    if (v.left) queue.unshift(v.left);
    if (v.right) queue.unshift(v.right);
  }
  return answer;
};

module.exports = {
  bottomRightValue,
};
