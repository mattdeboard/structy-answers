// https://www.structy.net/problems/premium/best-bridge

/**
 * Write a function, bestBridge, that takes in a grid as an argument.
 * The grid contains water (W) and land (L). There are exactly two
 * islands in the grid. An island is a vertically or horizontally
 * connected region of land. Return the minimum length bridge needed to
 * connect the two islands. A bridge does not need to form a straight
 * line.
 *
 * ```js
 * const grid = [
 *   ["W", "W", "W", "L", "L"],
 *   ["L", "L", "W", "W", "L"],
 *   ["L", "L", "L", "W", "L"],
 *   ["W", "L", "W", "W", "W"],
 *   ["W", "W", "W", "W", "W"],
 *   ["W", "W", "W", "W", "W"],
 * ];
 * bestBridge(grid); // -> 1
 * ```
 */
const bestBridge = grid => {
  const visited = new Set();
  let found = false;
  for (r = 0; r < grid.length; r++) {
    if (found) break;

    for (c = 0; c < grid[0].length; c++) {
      if (found) break;
      found = explore(grid, r, c, visited);
    }
  }

  const queue = [];

  for (const n of visited) {
    queue.push([...JSON.parse(n), 0]);
  }

  while (queue.length) {
    const curr = queue.shift();
    const [currRow, currCol, dist] = curr;

    if (
      !visited.has(JSON.stringify([currRow, currCol])) &&
      grid[currRow][currCol] === 'L'
    ) {
      return dist;
    }
    const deltas = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    for (const [r, c] of deltas) {
      const nRow = r + currRow;
      const nCol = c + currCol;
      const rowInbounds = 0 <= nRow && nRow < grid.length;
      const colInbounds = 0 <= nCol && nCol < grid[0].length;
      const nPos = JSON.stringify([nRow, nCol]);
      if (rowInbounds && colInbounds && !visited.has(nPos)) {
        if (grid[nRow][nCol] === 'W') {
          queue.push([nRow, nCol, dist + 1]);
        } else {
          return dist;
        }
      }
      visited.add(nPos);
    }
  }

  return -1;
};

const explore = (grid, r, c, visited) => {
  const rowInbounds = 0 <= r && r < grid.length;
  const colInbounds = 0 <= c && c < grid[0].length;

  if (!rowInbounds || !colInbounds || grid[r][c] === 'W') return false;
  const pos = JSON.stringify([r, c]);
  if (visited.has(pos)) return false;
  visited.add(pos);
  explore(grid, r, c + 1, visited);
  explore(grid, r, c - 1, visited);
  explore(grid, r + 1, c, visited);
  explore(grid, r - 1, c, visited);
  return true;
};

module.exports = {
  bestBridge,
};

/** Provided solution: */
{
  const bestBridge = grid => {
    let mainIsland;
    for (let r = 0; r < grid.length; r += 1) {
      for (let c = 0; c < grid[0].length; c += 1) {
        const possibleIsland = traverseIsland(grid, r, c, new Set());
        if (possibleIsland.size > 0) {
          mainIsland = possibleIsland;
        }
      }
    }
    const visited = new Set(mainIsland);
    const queue = [];
    for (let pos of mainIsland) {
      const [row, col] = pos.split(',').map(Number);
      queue.push([row, col, 0]);
    }

    while (queue.length > 0) {
      const [row, col, distance] = queue.shift();

      const pos = row + ',' + col;
      if (grid[row][col] === 'L' && !mainIsland.has(pos)) return distance - 1;

      const deltas = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      for (let delta of deltas) {
        const [deltaRow, deltaCol] = delta;
        const neighborRow = row + deltaRow;
        const neighborCol = col + deltaCol;
        const neighborPos = neighborRow + ',' + neighborCol;
        if (
          isInbounds(grid, neighborRow, neighborCol) &&
          !visited.has(neighborPos)
        ) {
          visited.add(neighborPos);
          queue.push([neighborRow, neighborCol, distance + 1]);
        }
      }
    }
  };

  const isInbounds = (grid, row, col) => {
    const rowInbounds = 0 <= row && row < grid.length;
    const colInbounds = 0 <= col && col < grid[0].length;
    return rowInbounds && colInbounds;
  };

  const traverseIsland = (grid, row, col, visited) => {
    if (!isInbounds(grid, row, col) || grid[row][col] === 'W') return visited;

    const pos = row + ',' + col;
    if (visited.has(pos)) return visited;

    visited.add(pos);

    traverseIsland(grid, row - 1, col, visited);
    traverseIsland(grid, row + 1, col, visited);
    traverseIsland(grid, row, col - 1, visited);
    traverseIsland(grid, row, col + 1, visited);

    return visited;
  };
}
