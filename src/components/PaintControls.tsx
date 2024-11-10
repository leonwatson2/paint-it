import { BrushSvg, BucketSvg } from "@/BucketSvg";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type PaintControlsProps = {
  setPaintMode: (mode: "brush" | "bucket") => void;
  paintMode: "brush" | "bucket";
  reset: () => void;
};
export const PaintControls = ({ setPaintMode, paintMode, reset }: PaintControlsProps) => {
  return (
    <div className="controls">
      <BucketSvg
        className={cn("bucket cursor-pointer", { active: paintMode === "bucket" })}
        onClick={() => {
          setPaintMode("bucket");
        }}
      />
      <BrushSvg
        className={cn("brush cursor-pointer", { active: paintMode === "brush" })}
        onClick={() => {
          setPaintMode("brush");
        }}
      />
      <Button variant={"default"} onClick={reset}>
        Reset
      </Button>
    </div>
  );
}
