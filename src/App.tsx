import { useRef } from "react";
import "./App.css";
import Draggable from "./components/Draggable";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="App" style={{ margin: 120 }}>
      <Draggable
        style={{
          height: 200,
          width: 200,
          position: "relative",
          background: "red",
        }}
      >

        <img src={}
        <div
          ref={ref}
          style={{
            position: "relative",
            height: 30,
            width: 30,
            background: "blue",
          }}
        />
      </Draggable>
    </div>
  );
}

export default App;
