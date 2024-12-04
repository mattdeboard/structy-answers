// https://www.structy.net/problems/premium/longest-path

/**
 * Write a function, longestPath, that takes in an adjacency list for a
 * directed acyclic graph. The function should return the length of the
 * longest path within the graph. A path may start and end at any two
 * nodes. The length of a path is considered the number of edges in the
 * path, not the number of nodes.
 *
 * ```js
 * const graph = {
 * a: ['c', 'b'],
 * b: ['c'],
 * c: [],
 * q: ['r'],
 * r: ['s', 'u', 't'],
 * s: ['t'],
 * t: ['u'],
 * u: []
 * };
 *
 * longestPath(graph); // -> 4
 * ```
 */

/** "Longest path" can also be understood as "distance from a terminal
node."
 *
 * If we think about it in those terms, we can understand the
 * `longestPath` base case as a graph comprising a single node. The
 * distance there would, of course, be 0.
 *
 * Then, if we think about a graph like (A) -> (B):
 * 1. (B) has a distance of zero.
 * 2. (A) has a distance of 1
 *
 * So, instead of building up a value over time, we want to track each
 * node's distance from a terminal node, then get the maximum of those
 * values.
 */
const longestPath = graph => {
  // `distance` is an index of the graph that maps each node to its
  // distance from a terminal node.
  const distance = {};
  for (const node in graph) {
    // no children means this is a terminal node. Therefore its distance
    // is 0.
    if (graph[node].length === 0) {
      distance[node] = 0;
    }
  }

  for (const node in graph) {
    traverseDistance(graph, node, distance);
  }
  return Math.max(...Object.values(distance));
};

/**
 * The recursion-limiting factor for `traverseDistance` is when the
 * `src` node has already been added to the index.
 */
const traverseDistance = (graph, src, distance) => {
  if (src in distance) return distance[src];

  let maxLength = 0;
  for (const neighbor of graph[src]) {
    const attempt = traverseDistance(graph, neighbor, distance);
    if (attempt > maxLength) {
      maxLength = attempt;
    }
  }

  distance[src] = 1 + maxLength;
  return distance[src];
};

module.exports = {
  longestPath,
};
