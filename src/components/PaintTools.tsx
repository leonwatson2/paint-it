import { BrushSvg, BucketSvg } from "@/BucketSvg";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type PaintToolsProps = {
  setPaintMode: (mode: "brush" | "bucket") => void;
  paintMode: "brush" | "bucket";
  reset: () => void;
};

export const PaintTools = ({ setPaintMode, paintMode, reset }: PaintToolsProps) => {
  return (
    <div className="tools">
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
        Reset Main
      </Button>
    </div>
  );
}
