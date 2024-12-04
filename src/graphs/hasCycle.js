// https://www.structy.net/problems/premium/has-cycle

// Implementation of white-gray-black cycle-detection algorithm
const hasCycle = graph => {
  const visiting = new Set(),
    visited = new Set();
  for (const node in graph) {
    if (detect(graph, node, visiting, visited)) return true;
  }
  return false;
};

const detect = (graph, src, visiting, visited) => {
  if (visited.has(src)) return false;
  if (visiting.has(src)) return true;
  visiting.add(src);

  for (const adj of graph[src]) {
    if (detect(graph, adj, visiting, visited)) return true;
  }
  visiting.delete(src);
  visited.add(src);
  return false;
};

module.exports = {
  hasCycle,
};
