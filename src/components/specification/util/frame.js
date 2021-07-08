import React, { useState } from "react";
import Chart from "../steps/chart";
import Select from "react-select";
import "./frame.css";
import FrameIndicator from "./frame-indicator";

const Frame = (props) => {
  const [frames, setFrames] = useState([]);
  const frameAdd = () => {
    const enteredName = prompt(
      "Please enter a name for this frame",
      "NewFrame" + (frames.length + 1)
    );
    setFrames(
      frames.concat(
        <FrameIndicator position={frames.length + 1} framename={enteredName} />
      )
    );
  };


  const deleteFrame = (e) =>{
    let a=frames.filter(item=>item.position!==e);
    console.log(a);
      }
  return (
    <div class="row ">
      {frames}
      <div className="col-md-4 f_buttons">
        <span className="btn btn-light" onClick={() => frameAdd()}>
          Creat a new frame
        </span>
      </div>
    </div>
  );
};
export default Frame;
