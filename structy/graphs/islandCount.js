// https://www.structy.net/problems/island-count

/**
 * Write a function, islandCount, that takes in a grid containing Ws and
 * Ls. W represents water and L represents land. The function should
 * return the number of islands on the grid. An island is a vertically
 * or horizontally connected region of land.
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
 * islandCount(grid); // -> 3
 * ```
 */

const islandCount = grid => {
  const graph = buildGraph(grid);
  let count = 0,
    visited = new Set();

  for (const src in graph) {
    if (visited.has(src)) continue;
    const node = JSON.parse(src);

    if (grid[node[0]][node[1]] === 'L') {
      visited.add(src);
      count++;
      exploreIsland(grid, graph, src, visited);
    }
  }
  return count;
};

const exploreIsland = (grid, graph, src, visited) => {
  const queue = [src];

  while (queue.length) {
    const curr = queue.pop();

    for (const neighbor of graph[curr]) {
      const node = JSON.stringify(neighbor);
      if (grid[neighbor[0]][neighbor[1]] === 'L' && !visited.has(node)) {
        visited.add(node);
        queue.push(node);
      }
    }
  }
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
  islandCount,
};

// The provided solution:
const _islandCount = grid => {
  const visited = new Set();

  let count = 0;
  for (let r = 0; r < grid.length; r += 1) {
    for (let c = 0; c < grid[0].length; c += 1) {
      if (explore(grid, r, c, visited) === true) {
        count += 1;
      }
    }
  }

  return count;
};

const explore = (grid, r, c, visited) => {
  const rowInbounds = 0 <= r && r < grid.length;
  const colInbounds = 0 <= c && c < grid[0].length;
  if (!rowInbounds || !colInbounds) return false;

  if (grid[r][c] === 'W') return false;

  const pos = r + ',' + c;
  if (visited.has(pos)) return false;
  visited.add(pos);

  explore(grid, r - 1, c, visited);
  explore(grid, r + 1, c, visited);
  explore(grid, r, c - 1, visited);
  explore(grid, r, c + 1, visited);
  return true;
};
