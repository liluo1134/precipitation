// https://leetcode.cn/problems/check-if-matrix-is-x-matrix/

function checkXMatrix(grid: number[][]): boolean {
  const width = grid[0].length;
  const height = grid.length;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (i === j || (i + j === width - 1)) {
        if (grid[i][j] === 0) return false
      } else {
        if (grid[i][j] !== 0) return false
      }
    }
  }
  return true;
};