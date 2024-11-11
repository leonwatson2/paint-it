export function getBFSOrderOfPaintableBoxes(
  image: number[][],
  sr: number,
  sc: number,
): [number, number, number, number][] {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const [ROWS, COLS] = [image.length, image[0].length];

  const visited = new Set();
  const result: [number, number, number, number][] = [];
  const isValidSquare = (row: number, col: number, paintColor: number) =>
    row > -1 &&
    col > -1 &&
    row < ROWS &&
    col < COLS &&
    image[row][col] === paintColor &&
    !visited.has(`${row},${col}`);

  const que: number[][] = [[sr, sc, 0]];
  const paintColor = image[sr][sc];
  while (que.length) {
    const len = que.length;
    for (let i = 0; i < len; i++) {
      const [row, col, step] = que.shift()!;
      result.push([row, col, step, paintColor]);
      for (let i = 0; i < directions.length; i++) {
        const [dx, dy] = directions[i];
        const nR = row + dx;
        const nC = col + dy;
        if (isValidSquare(nR, nC, paintColor)) {
          que.push([nR, nC, step+1, paintColor]);
          visited.add(`${nR},${nC}`);
        }
      }
    }
  }
  return result;
}

const ORANGE = 1;
const ROTTED = 2;
type OrangeQueue = [number, number, number | undefined]
export function getRottingChanges(grid: number[][]) {

  const oranges = []
  const rotting = []
  for (let row = 0; row < grid.length; row++)
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === ORANGE)
        oranges.push([row, col])
      if (grid[row][col] === ROTTED) {
        rotting.push([row, col])
      }
    }
  if (oranges.length === 0) return { steps: [], minCount: 0 }

  const visited = new Set();
  const directions = [
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
  ]
  let minCount = Infinity;
  visited.clear()
  let count = 0;
  const que: OrangeQueue[] = rotting.map(o => [o[0], o[1], undefined] as OrangeQueue);
  const result = []
  while (que.length) {
    const len = que.length
    for (let i = 0; i < len; i++) {
      const [row, col, step] = que.shift()
      visited.add(`${row},${col}`)
      count = step;
      for (let [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (
          newRow >= 0 && newCol >= 0 &&
          newRow < grid.length && newCol < grid[0].length &&
          grid[newRow][newCol] !== ROTTED && !visited.has(`${newRow},${newCol}`)
        ) {
          visited.add(`${newRow},${newCol}`)
          result.push([newRow, newCol, step ? step + 1 : 1, ROTTED])
          que.push([newRow, newCol, step ? step + 1 : 1])
        }
      }
    }
  }
  minCount = Math.min(count, minCount);
  return { steps: result, minCount };
  // return minCount !== Infinity && visited.size === (oranges.length + rotting.length) ? minCount : -1
};
