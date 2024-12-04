// https://www.structy.net/problems/premium/lefty-nodes

/**
 * Write a function, leftyNodes, that takes in the root of a binary
 * tree. The function should return an array containing the left-most
 * value on every level of the tree. The array must be ordered in a
 * top-down fashion where the root is the first element.
 *
 * Note that the left-most node on a level may not necessarily be a left
 * child.
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
 * leftyNodes(a); // [ 'a', 'b', 'd', 'g' ]
 * ```
 */
const leftyNodes = root => {
  if (root === null) return [];

  const queue = [[root, 0]],
    values = [];

  while (queue.length) {
    const [node, level] = queue.shift();
    if (values[level] === undefined) values.push(node.val);
    if (node.left) queue.push([node.left, level + 1]);
    if (node.right) queue.push([node.right, level + 1]);
  }

  return values;
};

/** Given solution
 * ```js
 * const leftyNodes = (root) => {
 *   const values = [];
 *
 *   const traverse = (node, level) => {
 *     if (node === null) return;
 *
 *     if (values[level] === undefined) values.push(node.val);
 *
 *     traverse(node.left, level + 1);
 *     traverse(node.right, level + 1);
 *   };
 *
 *   traverse(root, 0);
 *   return values;
 * };
 * ```
 */
