import { usePaintableImage } from "@/hooks/usePaintableImage";
import "./App.css";
import { BrushSvg, BucketSvg } from "./BucketSvg";
import { Button } from "./components/ui/button";
import { PaintBoard } from "./PaintBoard";
import { COLORS, initialImage } from "@/lib/constants";
import { useRottingOranges } from "./hooks/useRottingOranges";
import { cn } from "./lib/utils";
import { usePaintControls } from "./hooks/usePaintControls";

function App() {
  const { setPaintMode, setPaintColor, paintMode, paintColor } = usePaintControls();
  const { image, onPaint, reset } = usePaintableImage(
    initialImage,
    { paintMode, paintColor },
  );
  const { orangeImage, onRun, steps, resetOranges, onPaint: onOrangePaint } = useRottingOranges(paintColor, paintMode);

  return (
    <>
      <div className="container block">
        <div className="image">
          <PaintBoard image={orangeImage} onPaint={onOrangePaint} />
        </div>
        <div className="text-6xl flex flex-col justify-center items-center">
          <h2 onClick={resetOranges} className="text-6xl cursor-pointer">{steps}</h2>
          <div className="space-y-4 flex items-center justify-center flex-col">
            <Button onClick={onRun} >Run the thing </Button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="image">
          <PaintBoard image={image} onPaint={onPaint} />
        </div>
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
        <ColorPalette setPaintColor={setPaintColor} paintColor={paintColor} />
      </div>
    </>
  );
}
export default App;
