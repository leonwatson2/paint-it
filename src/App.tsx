import { usePaintableImage } from "@/hooks/usePaintableImage";
import "./App.css";
import { Button } from "./components/ui/button";
import { PaintBoard } from "./PaintBoard";
import { initialImage } from "@/lib/constants";
import { useRottingOranges } from "./hooks/useRottingOranges";
import { usePaintControls } from "./hooks/usePaintControls";
import { ColorPalette } from "./components/ColorPalette";
import { PaintTools } from "./components/PaintTools";

function App() {
  const { setPaintMode, setPaintColor, paintMode, paintColor } =
    usePaintControls();
  const { image, onPaint, reset } = usePaintableImage(initialImage, {
    paintMode,
    paintColor,
  });
  const {
    orangeImage,
    onRun,
    steps,
    resetOranges,
    onPaint: onOrangePaint,
    running,
  } = useRottingOranges(paintColor, paintMode);

  return (
    <>
      <div className="controls">
        <PaintTools
          setPaintMode={setPaintMode}
          paintMode={paintMode}
          reset={reset}
        />
        <ColorPalette setPaintColor={setPaintColor} paintColor={paintColor} />
      </div>
      <h1 className="text-6xl text-center mb-12">Algo tester</h1>
      <section>
        <h2 className="algo-header">994: Rotting Oranges</h2>
        <PaintBoard image={orangeImage} onPaint={onOrangePaint} running={running}/>
        <div className="text-6xl flex flex-col justify-center items-center">
          <h2
            onClick={resetOranges}
            title="Reset"
            className="text-6xl cursor-pointer"
          >
            {steps}
          </h2>
          <div className="space-y-4 flex items-center justify-center flex-col">
            <Button onClick={onRun}>
              {running ? "Running" : "Run the thing"}
            </Button>
          </div>
        </div>
      </section>
      <section>
        <h2 className="algo-header">Painting (BFS)</h2>
        <PaintBoard image={image} onPaint={onPaint} />
      </section>
    </>
  );
}
export default App;
