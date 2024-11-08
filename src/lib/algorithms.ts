export function getBFSOrderOfPaintableBoxes(
  image: number[][],
  sr: number,
  sc: number,
): [number, number][] {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const [ROWS, COLS] = [image.length, image[0].length];

  const visited = new Set();
  const result: [number, number][] = [];
  const isValidSquare = (row: number, col: number, paintColor: number) =>
    row > -1 &&
    col > -1 &&
    row < ROWS &&
    col < COLS &&
    image[row][col] === paintColor &&
    !visited.has(`${row},${col}`);

  const que: number[][] = [[sr, sc]];
  const paintColor = image[sr][sc];
  while (que.length) {
    const len = que.length;
    for (let i = 0; i < len; i++) {
      const [row, col] = que.shift()!;
      result.push([row, col]);
      for (let i = 0; i < directions.length; i++) {
        let [dx, dy] = directions[i];
        const nR = row + dx;
        const nC = col + dy;
        if (isValidSquare(nR, nC, paintColor)) {
          que.push([nR, nC, paintColor]);
          visited.add(`${nR},${nC}`);
        }
      }
    }
  }
  return result;
}
