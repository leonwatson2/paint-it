import { useCallback } from "react";

type PaintBoardProps = {
  image: number[][];
  onPaint: (spot: [number, number]) => void;
};

export const PaintBoard = ({ image, onPaint }: PaintBoardProps) => {
  const onMouseOver = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      if (e.buttons === 1) {
        const dataSpot = e.currentTarget.dataset.spot;
        if (dataSpot) {
          const [row, col] = dataSpot.split(",").map((d) => +d);
          if (row !== undefined && col !== undefined) onPaint([row, col]);
        }
      }
    },
    [onPaint],
  );
  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const dataSpot = e.currentTarget.dataset.spot;
    if (dataSpot) {
      const [row, col] = dataSpot.split(",").map((d) => +d);
      if (row !== undefined && col !== undefined) onPaint([row, col]);
    }
  };

  return (
    <div className="paint-board">
      {image.map((row, rowIdx) => (
        <div key={rowIdx} className="pixel-row" data-row={rowIdx}>
          {row.map((col, colIdx) => (
            <div
              draggable={false}
              onDragStart={e=>e.preventDefault()}
              onDrop={e=>e.preventDefault()}
              onDrag={e=>e.preventDefault()}
              onMouseDown={e=>e.preventDefault()}
              onMouseOver={onMouseOver}
              onDragEnterCapture={e=>e.preventDefault()}
              key={`${rowIdx},${colIdx},${col}`}
              data-spot={`${rowIdx},${colIdx}`}
              className={`pixel color-${col}`}
              onClick={onClick}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};
