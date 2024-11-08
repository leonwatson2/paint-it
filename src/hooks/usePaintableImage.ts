import { getBFSOrderOfPaintableBoxes } from "@/lib/algorithms";
import { useCallback, useState } from "react";

type PaintMode = "brush" | "bucket";

export const usePaintableImage = (initialImage: number[][]) => {
  const [image, setImage] = useState(initialImage);
  const [paintColor, setPaintColor] = useState(0);
  const [paintMode, setPaintMode] = useState<PaintMode>("brush");

  const reset = () => setImage(initialImage);

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

  const fill = useCallback(
    ([row, col]: [number, number]) => {
      const bfsChanges = getBFSOrderOfPaintableBoxes(image, row, col);
      const timeouts = bfsChanges.map((spot, idx) => {
        return setTimeout(() => {
          updateImage(spot);
        }, idx * 20);
      });
      return () => timeouts.forEach(clearTimeout);
    },
    [updateImage, image],
  );

  const onPaint = useCallback(
    (spot: [number, number]) => {
      if (image[spot[0]][spot[1]] === paintColor) return;

      if (paintMode === "bucket") {
        fill(spot);
      } else {
        updateImage(spot);
      }
    },
    [paintMode, updateImage, image, paintColor, fill],
  );
  return {
    image,
    paintMode,
    paintColor,
    onPaint,
    reset,
    setPaintColor,
    setPaintMode,
  };
};
