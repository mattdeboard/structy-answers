// https://www.structy.net/problems/premium/closest-carrot

/**
 * Write a function, closestCarrot, that takes in a grid, a starting
 * row, and a starting column. In the grid, 'X's are walls, 'O's are
 * open spaces, and 'C's are carrots. The function should return a
 * number representing the length of the shortest path from the starting
 * position to a carrot. You may move up, down, left, or right, but
 * cannot pass through walls (X). If there is no possible path to a
 * carrot, then return -1.
 */
const closestCarrot = (grid, startRow, startCol) => {
  const queue = [[startRow, startCol, 0]];
  const visited = new Set();

  while (queue.length) {
    const [r, c, d] = queue.shift();
    if (grid[r][c] === 'C') return d;

    const deltas = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (const [dr, dc] of deltas) {
      const nextRow = dr + r;
      const nextCol = dc + c;
      const rowInBounds = 0 <= nextRow && nextRow < grid.length;
      const colInBounds = 0 <= nextCol && nextCol < grid[0].length;
      const nextPos = [nextRow, nextCol].join(',');
      if (
        !visited.has(nextPos) &&
        rowInBounds &&
        colInBounds &&
        grid[nextRow][nextCol] !== 'X'
      ) {
        visited.add(nextPos);
        queue.push([nextRow, nextCol, d + 1]);
      }
    }
  }

  return -1;
};

{
  const grid = [
    ['O', 'O', 'O', 'O', 'O'],
    ['O', 'X', 'O', 'O', 'O'],
    ['O', 'X', 'X', 'O', 'O'],
    ['O', 'X', 'C', 'O', 'O'],
    ['O', 'X', 'X', 'O', 'O'],
    ['C', 'O', 'O', 'O', 'O'],
  ];

  const result = closestCarrot(grid, 1, 2); // -> 4
  console.log(result);
}

{
  const grid = [
    ['O', 'O', 'O', 'O', 'O'],
    ['O', 'X', 'O', 'O', 'O'],
    ['O', 'X', 'X', 'O', 'O'],
    ['O', 'X', 'C', 'O', 'O'],
    ['O', 'X', 'X', 'O', 'O'],
    ['C', 'O', 'O', 'O', 'O'],
  ];

  const result = closestCarrot(grid, 0, 0); // -> 5
  console.log(result);
}
