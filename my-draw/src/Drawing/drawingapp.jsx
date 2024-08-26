import React, { useRef, useState, useEffect } from "react";
import "./drawingapp.css";
import Toolbar from "../Toolbar/toolbar";
import Canvas from "../Canvas/canvas";
import RegisterModal from "../Modal/register";
import SigninModal from "../Modal/signin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DrawingApp = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const [shape, setShape] = useState(null); 
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [history, setHistory] = useState([]); 
  const [redoStack, setRedoStack] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [signinmodal, setsigninmodal] = useState(false);
  const [RegisterData, setRegisterdata] = useState({
    email: "",
    password: "",
    appType: "music",
  });
  const [isTextMode, setIsTextMode] = useState(false); 
  const [fontSize, setFontSize] = useState(16); 
  const [fontColor, setFontColor] = useState("#000000"); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateddata = { ...RegisterData };
    updateddata[e.target.name] = e.target.value;
    setRegisterdata(updateddata);
  };

  const Registerin = () => {
    if (RegisterData.email && RegisterData.password) {
      userLogin(RegisterData);
    }
  };

  async function userLogin(userData) {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            projectID: "l9d091vgjltf",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const jsonData = await response.json();
      if (jsonData.status === "success") {
        localStorage.setItem("token", jsonData.token);
        delete jsonData["token"];
        setModalOpen(false);
        toast.success("Registered Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function signinhandle() {
    setsigninmodal(true);
  }

  function Signinbtn() {
    if (RegisterData.email && RegisterData.password) {
      userSignin(RegisterData);
    }
  }

  async function userSignin(signData) {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            projectID: "l9d091vgjltf",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signData),
        }
      );
      const jsonData = await response.json();
      if (jsonData.status === "success") {
        localStorage.setItem("token", jsonData.token);
        delete jsonData["token"];
        setModalOpen(false);
        toast.success("Logged in Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    contextRef.current = context;
  }, []);

  useEffect(() => {
    redrawCanvas(); 
  }, [history]);

  const startDrawing = ({ nativeEvent }) => {
    if (localStorage.getItem("token")) {
      const { offsetX, offsetY } = nativeEvent;
      setStartX(offsetX);
      setStartY(offsetY);
      setIsDrawing(true);
      if (isTextMode) {
        const inputText = prompt("Enter the text:");

        // Check if the user entered text
        if (inputText) {
          const context = contextRef.current;
          context.fillStyle = fontColor;
          context.font = `${fontSize}px Arial`;
          context.fillText(inputText, offsetX, offsetY);
          saveToHistory({
            tool: "text",
            color: fontColor,
            fontSize: fontSize,
            textValue: inputText,
            startX: offsetX,
            startY: offsetY,
          });
        }

        setIsTextMode(false);
      } else {
        setIsDrawing(true);
      }
    } else {
      setModalOpen(true);
    }
  };

  const finishDrawing = ({ nativeEvent }) => {
    if (!isDrawing || isTextMode) return;

    const { offsetX, offsetY } = nativeEvent;
    const action = {
      tool: shape || "freehand",
      color: isEraser ? "white" : color,
      lineWidth: lineWidth,
      startX,
      startY,
      endX: offsetX,
      endY: offsetY,
    };

    saveToHistory(action);
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || shape || isTextMode) return;

    const { offsetX, offsetY } = nativeEvent;
    const context = contextRef.current;

    context.strokeStyle = isEraser ? "white" : color;
    context.lineWidth = lineWidth;
    context.lineTo(offsetX, offsetY);
    context.stroke();
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };
  const activateTextMode = () => {
    setIsTextMode(true);
  };

  const changeFontSize = (size) => {
    setFontSize(size);
  };

  const changeFontColor = (color) => {
    setFontColor(color);
  };
  const saveToHistory = (action) => {
    const newHistory = history.slice();
    newHistory.push(action);
    setHistory(newHistory);
    setRedoStack([]);
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    context.clearRect(0, 0, canvas.width, canvas.height);

    history.forEach((action) => {
      context.strokeStyle = action.color;
      context.lineWidth = action.lineWidth;

      switch (action.tool) {
        case "text":
          context.fillStyle = action.color;
          context.font = `${action.fontSize}px Arial`;
          context.fillText(action.textValue, action.startX, action.startY);
          break;
        case "freehand":
          context.beginPath();
          context.moveTo(action.startX, action.startY);
          context.lineTo(action.endX, action.endY);
          context.stroke();
          context.closePath();
          break;
        case "rectangle":
          context.strokeRect(
            action.startX,
            action.startY,
            action.endX - action.startX,
            action.endY - action.startY
          );
          break;
        case "circle":
          const radius = Math.sqrt(
            Math.pow(action.endX - action.startX, 2) +
              Math.pow(action.endY - action.startY, 2)
          );
          context.beginPath();
          context.arc(action.startX, action.startY, radius, 0, 2 * Math.PI);
          context.stroke();
          break;
        case "line":
          context.beginPath();
          context.moveTo(action.startX, action.startY);
          context.lineTo(action.endX, action.endY);
          context.stroke();
          context.closePath();
          break;
        case "polygon":
          drawPolygon(
            context,
            action.startX,
            action.startY,
            action.endX,
            action.endY,
            5
          ); 
          break;
        default:
          break;
      }
    });
  };

  const drawPolygon = (context, x1, y1, x2, y2, sides) => {
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = (2 * Math.PI) / sides;

    context.beginPath();
    for (let i = 0; i < sides; i++) {
      const x = x1 + radius * Math.cos(i * angle);
      const y = y1 + radius * Math.sin(i * angle);
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.closePath();
    context.stroke();
  };

  const undo = () => {
    if (history.length === 0) return;

    const newHistory = history.slice(0, -1);
    setRedoStack([...redoStack, history[history.length - 1]]);
    setHistory(newHistory);
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    const newHistory = [...history, redoStack[redoStack.length - 1]];
    setRedoStack(redoStack.slice(0, -1));
    setHistory(newHistory);
  };

  return (
    <div className="drawing-app">
      <Toolbar
        changeColor={(newColor) => {
          setColor(newColor);
          setIsEraser(false); // Reset eraser when color is selected
        }}
        lineWidth={lineWidth}
        changeBrushSize={setLineWidth}
        activateEraser={() => setIsEraser(true)}
        activateShape={setShape}
        undo={undo}
        redo={redo}
        changeFontSize={setFontSize}
        changeFontColor={setFontColor}
        activateTextMode={() => setIsTextMode(true)}
      />
      <div className="canvas-container">
        <Canvas
          startDrawing={startDrawing}
          finishDrawing={finishDrawing}
          draw={draw}
          canvasRef={canvasRef}
        />
      </div>
      {!signinmodal && (
        <RegisterModal
          modalOpen={modalOpen}
          handleCloseModal={() => setModalOpen(false)}
          handleSubmit={handleSubmit}
          Registerin={Registerin}
          signinhandle={signinhandle}
        />
      )}
      {signinmodal && (
        <SigninModal
          modalOpen={modalOpen}
          handleCloseModal={() => setModalOpen(false)}
          handleSubmit={handleSubmit}
          Signinbtn={Signinbtn}
        />
      )}
    </div>
  );
};

export default DrawingApp;
