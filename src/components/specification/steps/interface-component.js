import "../interface/interface.css"
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Example from "../interface/example";

import axios from "axios";

const InterfaceComponent = (props) => {
  const [frames, setFrames] = useState([]);
  const getFrames = () => {
    axios.get("http://localhost:3001/frames").then((res) => {
      setFrames(res.data);
    });
  };

  useEffect(() => {
    getFrames();
  }, []);
  const rowStyle = { overflow: "hidden", clear: "both" };
  return (
    <>
      <h3>Interface composer</h3>
      <DndProvider backend={HTML5Backend}> 
        <Example />
      </DndProvider>
      
    </>
  );
};

export default InterfaceComponent;
