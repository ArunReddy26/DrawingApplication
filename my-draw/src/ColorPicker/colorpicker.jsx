function ColorPicker({ changeColor }) {
    return (
      <div className="color-options">
        <button
          onClick={() => changeColor("black")}
          style={{ backgroundColor: "black" }}
        ></button>
        <button
          onClick={() => changeColor("red")}
          style={{ backgroundColor: "red" }}
        ></button>
        <button
          onClick={() => changeColor("green")}
          style={{ backgroundColor: "green" }}
        ></button>
        <button
          onClick={() => changeColor("blue")}
          style={{ backgroundColor: "blue" }}
        ></button>
      </div>
    );
  }
  
  export default ColorPicker;
  