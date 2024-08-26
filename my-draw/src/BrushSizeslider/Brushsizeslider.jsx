function BrushSizeSlider({ lineWidth, changeBrushSize }) {
    return (
      <div className="brush-size">
        <input
          type="range"
          min="1"
          max="50"
          value={lineWidth}
          onChange={(e) => changeBrushSize(e.target.value)}
        />
      </div>
    );
  }
  export default BrushSizeSlider;
  