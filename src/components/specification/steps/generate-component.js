import React, { useState } from "react";
import ReactJson from "react-json-view";
import jsonfile from "jsonfile";
import dash from "../../../data/template_dash.json";
import FileSaver from "file-saver";

import "./generate-component.css";
const GenerateComponent = () => {
  const file = "../../../data/template_dash.json";
  const readJSonFile = () => {
    const filename = "f";
    const fileData = JSON.stringify(dash);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${filename}.json`;
    link.href = url;
    //link.click();

    var file = new File(["Hello, world!"], " ");
    FileSaver.saveAs(file);
  };
  return (
    <div className="row">
      <div className="  row">  
      <div class="bg-secondary card-header d-flex flex-row">
  <div class="p-2 col-sm-9">Dashboard JSon structure</div>
  <div class="p-2 text-right col-sm-3"><span className="btn btn-success btn-sm " onClick={readJSonFile}>
            Save the dashboard
          </span></div>
</div>
       <div className="card-body bg-light">
          <ReactJson src={dash} collapsible view="dual" />
        </div>
      </div>
    </div>
  );
};

export default GenerateComponent;
