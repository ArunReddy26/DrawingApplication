import React from "react";
import BrushSizeSlider from "../BrushSizeslider/Brushsizeslider";
import ColorPicker from "../ColorPicker/colorpicker";
import ShapeButtons from "../Shapes/shapes";

function Toolbar({
  changeColor,
  lineWidth,
  changeBrushSize,
  activateShape,
  activateTextMode,
  activateEraser,
  undo,
  redo,
  changeFontSize,
  changeFontColor,
}) {
  return (
    <div className="toolbar">
      <ColorPicker changeColor={changeColor} />
      <BrushSizeSlider
        lineWidth={lineWidth}
        changeBrushSize={changeBrushSize}
      />
      <div>
        <button onClick={activateEraser}>Eraser</button>
      </div>
      <ShapeButtons activateShape={activateShape} />
      <div className="text">
        <button onClick={activateTextMode}>
          <svg
            class="feather feather-type"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" x2="15" y1="20" y2="20" />
            <line x1="12" x2="12" y1="4" y2="20" />
          </svg>
        </button>
        <input
          type="number"
          onChange={(e) => changeFontSize(e.target.value)}
          placeholder="Font Size"
        />
        <input
          type="color"
          onChange={(e) => changeFontColor(e.target.value)}
          placeholder="Text Color"
        />
      </div>
      <div className="makecorrection">
        <button onClick={undo}>
          <svg
            height="24px"
            width="24px"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z" />
          </svg>
        </button>
        <button onClick={redo}>
          <svg
            height="24px"
            width="24px"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
