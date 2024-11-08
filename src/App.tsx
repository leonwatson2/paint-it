import { usePaintableImage } from "@/hooks/usePaintableImage";
import "./App.css";
import { BrushSvg, BucketSvg } from "./BucketSvg";
import { Button } from "./components/ui/button";
import { PaintBoard } from "./PaintBoard";
import { COLORS } from "@/lib/constants";

const IMAGE_LENGTH = 12;

const initialImage = Array.from({ length: IMAGE_LENGTH }, () =>
  Array.from({ length: IMAGE_LENGTH }, () => -1),
);

function App() {
  const { image, paintMode, paintColor, onPaint, reset, setPaintColor, setPaintMode } = usePaintableImage(
    initialImage,
  );
  return (
    <div className="container">
      <div className="image">
        <PaintBoard image={image} onPaint={onPaint} />
      </div>
      <div className="controls">
        <BucketSvg
          fill={paintMode === 'bucket' ? COLORS[paintColor] : "white"}
          onClick={() => {
            setPaintMode("bucket");
          }}
        />
        <BrushSvg
          fill={paintMode === 'bucket' ? COLORS[paintColor] : "white"}
          onClick={() => {
            setPaintMode("brush");
          }}
        />
        <Button variant={"default"} onClick={reset}>
          {" "}
          Reset
        </Button>
      </div>
      <div className="colors">
        {COLORS.map((color, idx) => (
          <div
            className={`pixel color-${idx}`}
            key={color}
            onClick={() => setPaintColor(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
}
export default App;
