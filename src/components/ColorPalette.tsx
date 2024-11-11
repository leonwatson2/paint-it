import { COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils";
type ColorPaletteProps = {
  setPaintColor: (color: number) => void;
  paintColor: number;
};

export const ColorPalette = ({ setPaintColor, paintColor }: ColorPaletteProps) => {

  return (
    <div className="color-palette">
      {COLORS.map((color, idx) => (
        <div
          className={cn("color-picker", `color-${idx}`, "cursor-pointer", { active: paintColor === idx })}
          key={color}
          onClick={() => setPaintColor(idx)}
        ></div>
      ))}
    </div>

  )
}
