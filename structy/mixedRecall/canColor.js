// https://www.structy.net/problems/premium/can-color

/**
 * Write a function, canColor, that takes in an object representing the
 * adjacency list of an undirected graph. The function should return a
 * boolean indicating whether or not it is possible to color nodes of
 * the graph using two colors in such a way that adjacent nodes are
 * always different colors.
 *
 * For example, given this graph:
 *
 * x-y-z
 *
 * It is possible to color the nodes by using red for x and z,
 * then use blue for y. So the answer is true.
 *
 * For example, given this graph:
 *
 *     q
 *    / \
 *   s - r
 *
 * It is not possible to color the nodes without making two
 * adjacent nodes the same color. So the answer is false.
 *
 * ```js
 * canColor({
 *   x: ["y"],
 *   y: ["x","z"],
 *   z: ["y"]
 * }); // -> true
 *
 * canColor({
 *   q: ["r", "s"],
 *   r: ["q", "s"],
 *   s: ["r", "q"]
 * }); // -> false
 * ```
 */

// This is the given solution. This one stumped me unfortunately.
const canColor = graph => {
  const colors = {};

  for (const node in graph) {
    if (!(node in colors) && !validate(graph, node, colors, false))
      return false;
  }
  return true;
};

const validate = (graph, src, colors, currColor) => {
  if (src in colors) return colors[src] === currColor;
  colors[src] = currColor;

  for (const adj of graph[src]) {
    if (!validate(graph, adj, colors, !currColor)) return false;
  }
  return true;
};

module.exports = {
  canColor,
};
