import { COLORS } from "@/lib/constants";
import { useEffect, useState } from "react";

type usePaintControlsProps = {
  (): {
    setPaintMode: (mode: PaintMode) => void;
    setPaintColor: (color: number) => void;
    paintColor: PaintColor;
    paintMode: PaintMode;
  };
};
export const usePaintControls: usePaintControlsProps = () => {

  const [paintColor, setPaintColor] = useState<PaintColor>(0);
  const [paintMode, setPaintMode] = useState<PaintMode>("brush");

  useEffect(() => {
    window.document.documentElement.style.setProperty("--active-color", COLORS[paintColor]);
  }, [paintColor]);

  return {
    setPaintMode,
    setPaintColor,
    paintColor,
    paintMode
  }

}
