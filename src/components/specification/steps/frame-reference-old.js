import React, { useState, useContext } from "react";
import IndicatorChooser from "./indicator-chooser";
import Chart from "./frames/chart-component";
import Select from "react-select";
import "./frame-reference.css";
import FrameComprehension from "./frames/frame-comprehension";
import { AppContext } from "../specification-wizard";

const FrameReferenceOld = (props) => {
  const [ladContext, setLadContext] = useContext(AppContext);

  const updateContext = (type, value) => {
    
    
    if (type === "ref_graph")
      setLadContext((prevState) => {
        return { ...prevState, mainFrame:{ ...prevState.mainFrame, graphic: value} };
      });
    if (type === "ref_indicator")
      setLadContext((prevState) => {
        return { ...prevState, mainFrame:{ ...prevState.mainFrame, indicator: value} };
      });
  };
  return (
    <div class="row">
      <div class="form-group row">
        <div class="row">
          <h3>Screen of reference for situation perception</h3>
          <panel>
            Decsribe what main indicators that allow you to perform your
            analysis and take the appropriate decision
          </panel>
          <hr className="my-1" />
        </div>
        <div className="col-md-6 mt-2">
          <IndicatorChooser onUpdate={(v) => updateContext('ref_indicator',v)} />
        </div>
        <div className="col-md-6 mt-2 px-4">
          <Chart onUpdate={(v) => updateContext('ref_graph',v)} />
        </div>
      </div>
      {/* <FrameComprehension /> */}
    </div>
  );
};
export default FrameReferenceOld;
