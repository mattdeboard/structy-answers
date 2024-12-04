// https://www.structy.net/problems/premium/lowest-common-ancestor

/**
 * Write a function, lowestCommonAncestor, that takes in the root of a binary tree and two values. The function should return the value of the lowest common ancestor of the two values in the tree.
 *
 * You may assume that the tree values are unique and the tree is non-empty.
 *
 * Note that a node may be considered an ancestor of itself.
 *
 * ```js
 * const a = new Node('a');
 * const b = new Node('b');
 * const c = new Node('c');
 * const d = new Node('d');
 * const e = new Node('e');
 * const f = new Node('f');
 * const g = new Node('g');
 * const h = new Node('h');
 *
 * a.left = b;
 * a.right = c;
 * b.left = d;
 * b.right = e;
 * c.right = f;
 * e.left = g;
 * e.right = h;
 *
 * //      a
 * //    /    \
 * //   b      c
 * //  / \      \
 * // d   e      f
 * //    / \
 * //    g  h
 *
 * lowestCommonAncestor(a, 'd', 'h'); // b
 * ```
 */
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }

const lowestCommonAncestor = (root, val1, val2) => {
  const path1 = getPath(root, val1);
  const path2 = getPath(root, val2);
  const set2 = new Set(path2);
  for (let val of path1) {
    if (set2.has(val)) return val;
  }
};

const getPath = (root, targetVal) => {
  if (root === null) return null;
  if (root.val === targetVal) return [root.val];

  const leftPath = getPath(root.left, targetVal);

  if (leftPath !== null) {
    leftPath.push(root.val);
    return leftPath;
  }

  const rightPath = getPath(root.right, targetVal);
  if (rightPath !== null) {
    rightPath.push(root.val);
    return rightPath;
  }

  return null;
};

module.exports = {
  lowestCommonAncestor,
};

// Iterative DFS version
const _lowestCommonAncestor = (root, val1, val2) => {
  const stack = [
    [root, val1, []],
    [root, val2, []],
  ];
  const paths = [];

  while (stack.length) {
    const [curr, val, path] = stack.pop();
    if (curr.val === val) {
      paths.push([val, ...path]);
    }
    if (curr.left) stack.push([curr.left, val, [curr.val, ...path]]);
    if (curr.right) stack.push([curr.right, val, [curr.val, ...path]]);
  }

  const [path1, path2] = paths;
  const set = new Set(path2);

  for (const p of path1) {
    if (set.has(p)) return p;
  }
};
