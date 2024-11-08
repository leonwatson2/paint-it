import { useCallback, useState } from "react";
import { Button } from "./components/ui/button";
import "./App.css";
import { BrushSvg, BucketSvg } from "./BucketSvg";
import { PaintBoard } from "./PaintBoard";
import { floodFill } from "./utils";

const IMAGE_LENGTH = 12;

const initialImage = Array.from({ length: IMAGE_LENGTH }, () =>
  Array.from({ length: IMAGE_LENGTH }, () => -1),
);
export const COLORS = ["#1026B5", "#108EB5", "#105AB5"];

function App() {
  const [image, setImage] = useState(initialImage);
  const [paintColor, setPaintColor] = useState(0);
  const [bucketPaint, setBucketPaint] = useState(false);
  const updateImage = useCallback(
    ([newRow, newCol]: [number, number], color?: number) => {
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
    },
    [paintColor],
  );

  const onPaint = (spot: [number, number]) => {
    if (image[spot[0]][spot[1]] === paintColor) return;

    if (bucketPaint) {
      fill(spot);
    } else {
      updateImage(spot);
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
    [updateImage, image],
  );
  return (
    <div className="container">
      <div className="image">
        <PaintBoard image={image} onPaint={onPaint} />
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
        <Button variant={"default"} onClick={reset}> Reset</Button>
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
