function Canvas({ startDrawing, finishDrawing, draw, canvasRef }) {
    return (
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    );
  }
  
  export default Canvas;
  