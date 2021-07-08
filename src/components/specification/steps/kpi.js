import React, { useState } from "react";
import IndicatorChooser from "./indicator-chooser";
import Chart from "./chart";
import Select from "react-select";
import "./kpi.css";

const KPI = (props) => {
  
  return (
    <div class="row">
      <div class="form-group row">
      <div class="row">
        <h3>
          Main indicator (<i>anchor</i>) for situation perception
        </h3>
        <panel>
          Decsribe what main indicators that allow you to perform your analysis
          and take the appropriate decision
        </panel>
        <hr className="my-1" />
      </div>
      <div className="col-md-6 mt-2">
      <IndicatorChooser />
      </div>
      <div className="col-md-6 mt-2 px-4">
        <Chart />
      </div>
    </div>
    </div>
  );
};
export default KPI;
