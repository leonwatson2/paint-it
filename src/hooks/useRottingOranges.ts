import { useCallback, useState } from "react"
import { getBFSOrderOfPaintableBoxes, getRottingChanges } from "@/lib/algorithms";

const rottingOrangesInitial = [
  [2, 0, 1, 1, 1, 1, 1, 1, 1, 1], 
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1], 
  [1, 0, 1, 0, 1, 1, 1, 1, 0, 1], 
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 1], 
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 1], 
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1], 
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1], 
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1], 
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

export const useRottingOranges = (paintColor: number, paintMode: PaintMode, STEP_SPEED_MS = 400) => {

  const [orangeImage, setOrangeImage] = useState(rottingOrangesInitial)
  const [steps, setSteps] = useState(0);
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([])
  const updateImage = useCallback(
    ([newRow, newCol, step, paintColor]: [number, number, number, number], color?: number) => {
      setOrangeImage((image) =>
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
      setSteps(step)
    }, [setOrangeImage, setSteps]);

  const reset = () => {
    setOrangeImage(rottingOrangesInitial);
    setSteps(0);
    timeouts.forEach(clearTimeout);
  }

  const fill = useCallback(
    ([row, col]: [number, number]) => {
      const bfsChanges = getBFSOrderOfPaintableBoxes(orangeImage, row, col);
      const newTimeouts = bfsChanges.map((spot, idx) => {
        return setTimeout(() => {
          updateImage([spot[0], spot[1], idx, paintColor]);
        }, idx * 20);
      });
      timeouts.forEach(clearTimeout);
      setTimeouts(newTimeouts);
      return () => newTimeouts.forEach(clearTimeout);
    }, [updateImage, orangeImage, paintColor, setTimeouts, timeouts]);

  const onPaint = useCallback(
    (spot: [number, number]) => {
      if (orangeImage[spot[0]][spot[1]] === paintColor) return;
      if (paintMode === "bucket") {
        fill(spot);
      } else {
        updateImage([...spot, 0, paintColor]);
      }
    },
    [paintMode, updateImage, paintColor, fill, orangeImage],
  );

  const onRun = () => {
    const bfsChanges = getRottingChanges(orangeImage);
    const timeouts = (bfsChanges.steps as [number, number, number, number][]).map((spot, idx) => {
      return setTimeout(() => {
        updateImage(spot);
      }, idx * STEP_SPEED_MS);
    });
    setTimeouts(old => [...old, ...timeouts]);
    return () => timeouts.forEach(clearTimeout);
  }
  return { orangeImage, onRun, steps, resetOranges: reset, onPaint }

}
