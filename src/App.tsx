import React, { useCallback, useState } from "react";
import "./App.css";
import { BrushSvg, BucketSvg } from "./BucketSvg";
import { PaintBoard } from "./PaintBoard";
const IMAGE_LENGTH = 12;
const initialImage = Array.from({ length: IMAGE_LENGTH }, () =>
  Array.from({ length: IMAGE_LENGTH }, () => -1),
);
export const COLORS = ["#1026B5", "#108EB5", "#105AB5"];
function App() {
  const [image, setImage] = useState(initialImage);
  const [paintColor, setPaintColor] = useState(0);
  const [bucketPaint, setBucketPaint] = useState(false);
  const updateImage = useCallback(([newRow, newCol]: [number, number], color?: number) => {
      setImage((image) =>
        image.map((row, rowIdx) =>
          row.map((col, colIdx) =>
            rowIdx === newRow && colIdx === newCol
              ? color === undefined
                ? paintColor
                : color
              : col,
          ),
        ),
      );
  },[paintColor, bucketPaint, image]);
  const onPaint = (spot: [number, number]) => {
    if (image[spot[0]][spot[1]] === paintColor) {
      console.log("nop");
    } else {
    if (bucketPaint) {
      fill(spot);
    } else {
      updateImage(spot);
    }
    }
  };
  const reset = () => setImage(initialImage);
  const fill = useCallback(
    ([row, col]: [number, number]) => {
      const bfsChanges = floodFill(image, row, col);
      const timeouts = bfsChanges.map((spot, idx) => {
        return setTimeout(() => {
          updateImage(spot);
        }, idx * 20);
      });
      return () => timeouts.forEach(clearTimeout);
    },
    [paintColor, updateImage],
  );
  return (
    <div className="container">
      <div className="image">
        <PaintBoard paintColor={paintColor} image={image} onPaint={onPaint} />
      </div>
      <div className="controls">
        <BucketSvg
          fill={bucketPaint ? COLORS[paintColor] : "white"}
          onClick={() => {
            setBucketPaint(true);
          }}
        />
        <BrushSvg
          fill={!bucketPaint ? COLORS[paintColor] : "white"}
          onClick={() => {
            setBucketPaint(false);
          }}
        />
        <button onClick={reset}> Reset</button>
      </div>
      <div className="colors">
        {COLORS.map((color, idx) => (
          <div
            className={`pixel color-${idx}`}
            key={color}
            onClick={() => setPaintColor(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
function getAllOrders<T>(arr: T[]): T[][] {
  if (arr.length === 0) return [[]];

  const result: T[][] = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const prev = arr.slice(0, i);
    const after = arr.slice(i + 1);
    const permutations = getAllOrders(prev.concat(after));

    for (let perm of permutations) {
      result.push([current, ...perm]);
    }
  }
  return result;
}

function floodFill(
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
