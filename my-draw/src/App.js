
import './App.css';
import { ToastContainer } from 'react-toastify';
import DrawingApp from './Drawing/drawingapp';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">

      <ToastContainer/>
      <DrawingApp/>
      
    </div>
  );
}

export default App;
