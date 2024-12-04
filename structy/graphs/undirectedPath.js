// https://www.structy.net/problems/undirected-path

/**
 * Write a function, undirectedPath, that takes in an array of edges for
 * an undirected graph and two nodes (nodeA, nodeB). The function should
 * return a boolean indicating whether or not there exists a path
 * between nodeA and nodeB.
 */
const undirectedPath = (edges, nodeA, nodeB) => {
  const graph = buildGraph(edges);
  return hasPath(graph, nodeA, nodeB);
};

const hasPath = (graph, src, dest, visited = new Set()) => {
  if (src === dest) return true;
  if (graph[src].length === 0 || visited.has(src)) return false;
  visited.add(src);
  for (const n of graph[src]) {
    if (hasPath(graph, n, dest, visited)) return true;
  }
  return false;
};

const buildGraph = edges => {
  const graph = {};

  for (const [l, r] of edges) {
    if (!(l in graph)) graph[l] = [];
    if (!(r in graph)) graph[r] = [];
    graph[l].push(r);
    graph[r].push(l);
  }

  return graph;
};

{
  const edges = [
    ['i', 'j'],
    ['k', 'i'],
    ['m', 'k'],
    ['k', 'l'],
    ['o', 'n'],
  ];

  const result = undirectedPath(edges, 'j', 'm'); // -> true
  console.log(result);
}

{
  const edges = [
    ['i', 'j'],
    ['k', 'i'],
    ['m', 'k'],
    ['k', 'l'],
    ['o', 'n'],
  ];

  const result = undirectedPath(edges, 'k', 'o'); // -> false
  console.log(result);
}
