import { useCallback, useState } from "react";
import {
  getBFSOrderOfPaintableBoxes,
  getRottingChanges,
} from "@/lib/algorithms";

const rottingOrangesInitial = [
  [2, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 2, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
export const useRottingOranges = (
  paintColor: number,
  paintMode: PaintMode,
  STEP_SPEED_MS = 400,
) => {
  const [orangeImage, setOrangeImage] = useState(rottingOrangesInitial);
  const [steps, setSteps] = useState(0);
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);
  const [running, setRunning] = useState(false);
  const updateImage = useCallback(
    (
      [newRow, newCol, step, paintColor]: [number, number, number, number],
      color?: number,
    ) => {
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
      setSteps(step);
    },
    [setOrangeImage, setSteps],
  );

  const reset = () => {
    setOrangeImage(rottingOrangesInitial);
    setSteps(0);
    timeouts.forEach(clearTimeout);
    setRunning(false);
  };

  const fill = useCallback(
    ([row, col]: [number, number]) => {
      if (running) {
        timeouts.forEach(clearTimeout);
      }
      setRunning(true);
      const bfsChanges = getBFSOrderOfPaintableBoxes(orangeImage, row, col);
      const newTimeouts = bfsChanges.map((spot, idx) => {
        return setTimeout(() => {
          updateImage([spot[0], spot[1], idx, paintColor]);
          if (idx === bfsChanges.length - 1) {
            setRunning(false);
          }
        }, idx * 20);
      });
      setTimeouts(newTimeouts);
      return () => newTimeouts.forEach(clearTimeout);
    },
    [updateImage, orangeImage, paintColor, setTimeouts, timeouts, running],
  );

  const onPaint = useCallback(
    (spot: [number, number]) => {
      if (running) {
        timeouts.forEach(clearTimeout);
        setRunning(false);
      }
      if (orangeImage[spot[0]][spot[1]] === paintColor) return;
      if (paintMode === "bucket") {
        fill(spot);
      } else {
        updateImage([...spot, 0, paintColor]);
      }
    },
    [paintMode, updateImage, paintColor, fill, orangeImage, running, timeouts],
  );

  const onRun = () => {
    if (running) {
      timeouts.forEach(clearTimeout);
      setRunning(false);
      return;
    }

    setRunning(true);

    const bfsChanges = getRottingChanges(orangeImage);
    const newTimeouts = (
      bfsChanges.steps as [number, number, number, number][]
    ).map((spot, idx) => {
      return setTimeout(() => {
        updateImage(spot);
        if (idx === bfsChanges.steps.length - 1) {
          setRunning(false);
        }
      }, idx * STEP_SPEED_MS);
    });

    setTimeouts((old) => [...old, ...newTimeouts]);
    return () => newTimeouts.forEach(clearTimeout);
  };
  return { orangeImage, onRun, steps, resetOranges: reset, onPaint, running };
};
