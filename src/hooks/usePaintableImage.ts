import { getBFSOrderOfPaintableBoxes } from "@/lib/algorithms";
import { COLORS } from "@/lib/constants";
import { useCallback, useEffect, useState } from "react";


type usePaintableImageProps = {
  (initialImage: number[][], controls: { paintMode: PaintMode, paintColor: PaintColor }): {
    image: number[][];
    paintMode: PaintMode;
    paintColor: PaintColor;
    onPaint: (spot: [number, number]) => void;
    reset: () => void;
  };
};


export const usePaintableImage: usePaintableImageProps = (initialImage: number[][], { paintMode, paintColor }) => {
  const [image, setImage] = useState(initialImage);

  const reset = () => setImage(initialImage);

  const updateImage = useCallback(
    ([newRow, newCol]: [number, number, number, number], color?: number) => {
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
        updateImage([...spot, 0, paintColor]);
      }
    },
    [paintMode, updateImage, image, paintColor, fill],
  );

  useEffect(() => {
    window.document.getElementById("root")?.style.setProperty("--active-color", COLORS[paintColor]);
  }, [paintColor]);

  return {
    image,
    paintMode,
    paintColor,
    onPaint,
    reset,
  };
};
