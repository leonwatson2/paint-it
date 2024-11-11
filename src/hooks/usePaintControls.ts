import { useState } from "react";

type usePaintControlsProps = {
  (): {
    setPaintMode: (mode: PaintMode) => void;
    setPaintColor: (color: number) => void;
    paintColor: PaintColor;
    paintMode: PaintMode;
  };
};
export const usePaintControls:usePaintControlsProps = () => {

  const [paintColor, setPaintColor] = useState<PaintColor>(0);
  const [paintMode, setPaintMode] = useState<PaintMode>("brush");

return {
    setPaintMode,
    setPaintColor, 
    paintColor,
    paintMode
  }

}
