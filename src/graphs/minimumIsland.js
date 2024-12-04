// https://www.structy.net/problems/minimum-island

/**
 * Write a function, minimumIsland, that takes in a grid containing Ws
 * and Ls. W represents water and L represents land. The function should
 * return the size of the smallest island. An island is a vertically or
 * horizontally connected region of land.
 *
 * You may assume that the grid contains at least one island.
 *
 * ```js
 * const grid = [
 *   ['W', 'L', 'W', 'W', 'W'],
 *   ['W', 'L', 'W', 'W', 'W'],
 *   ['W', 'W', 'W', 'L', 'W'],
 *   ['W', 'W', 'L', 'L', 'W'],
 *   ['L', 'W', 'W', 'L', 'L'],
 *   ['L', 'L', 'W', 'W', 'W'],
 * ];
 *
 * minimumIsland(grid); // -> 2
 * ```
 */

const minimumIsland = grid => {
  const graph = buildGraph(grid),
    visited = new Set();
  let smallest = Infinity;

  for (const node in graph) {
    if (visited.has(node)) continue;
    const [r, c] = JSON.parse(node);

    if (grid[r][c] === 'L') {
      visited.add(node);
      const size = exploreIsland(grid, graph, node, visited);
      if (size < smallest) {
        smallest = size;
      }
    }
  }
  return smallest;
};

const exploreIsland = (grid, graph, src, visited) => {
  let size = 1;
  const queue = [src];

  while (queue.length) {
    const node = queue.pop();

    for (const neighbor of graph[node]) {
      const nNode = JSON.stringify(neighbor);
      if (grid[neighbor[0]][neighbor[1]] === 'L' && !visited.has(nNode)) {
        visited.add(nNode);
        queue.push(nNode);
        size++;
      }
    }
  }
  return size;
};

const buildGraph = grid => {
  let rowCount = 0;
  const graph = {},
    height = grid.length;

  for (const row of grid) {
    let colCount = 0;
    const width = row.length;
    while (colCount <= width) {
      const node = JSON.stringify([rowCount, colCount]);
      graph[node] = [];

      if (colCount < width - 1) {
        graph[node].push([rowCount, colCount + 1]);
      }

      if (rowCount < height - 1) {
        graph[node].push([rowCount + 1, colCount]);
      }

      if (colCount > 0) {
        graph[node].push([rowCount, colCount - 1]);
      }

      if (rowCount > 0) {
        graph[node].push([rowCount - 1, colCount]);
      }
      colCount++;
    }
    colCount = 0;
    rowCount++;
  }
  return graph;
};

module.exports = {
  minimumIsland,
};

// Provided solution:
const _minimumIsland = grid => {
  const visited = new Set();

  let minSize = Infinity;
  for (let r = 0; r < grid.length; r += 1) {
    for (let c = 0; c < grid[0].length; c += 1) {
      const size = exploreSize(grid, r, c, visited);
      if (size > 0 && size < minSize) {
        minSize = size;
      }
    }
  }

  return minSize;
};

const exploreSize = (grid, r, c, visited) => {
  const rowInbounds = 0 <= r && r < grid.length;
  const colInbounds = 0 <= c && c < grid[0].length;
  if (!rowInbounds || !colInbounds) return 0;

  if (grid[r][c] === 'W') return 0;

  const pos = r + ',' + c;
  if (visited.has(pos)) return 0;
  visited.add(pos);

  let size = 1;
  size += exploreSize(grid, r - 1, c, visited);
  size += exploreSize(grid, r + 1, c, visited);
  size += exploreSize(grid, r, c - 1, visited);
  size += exploreSize(grid, r, c + 1, visited);
  return size;
};
