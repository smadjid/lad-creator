import React, { useState, useContext } from "react";
import ReactJson from "react-json-view";
import jsonfile from "jsonfile";
import dash from "../../../data/template_dash.json";
import { AppContext } from "../specification-wizard";

import "./generate-component.css";
const GenerateComponent = () => {
  const [ladContext, setLadContext] = useContext(AppContext);

  const filename = "generated_dashboard";
  const fileData = JSON.stringify(dash);
  const blob = new Blob([fileData], { type: "text/plain" });

  const [mainPanel, setMainPanel] = useState();
  const [comprehensionFrames, setComprehensionFrames] = useState([]);
  const [dashMeta, setDashMeta] = useState();

  const [file, setFile] = useState();

  const generateMeta = () => {
    setDashMeta({
      id: null,
      uid: "cLV5GDCkz",
      title: ladContext.Title,
      tags: [],
      style: "dark",
      timezone: "browser",
      editable: true,
      hideControls: false,
      graphTooltip: 1,
    });
  };

  const generateMainFrame = () => {
    setMainPanel({
      type: ladContext.mainFrame.graphic,
      title: ladContext.mainFrame.indicator,
      gridPos: {
        x: 0,
        y: 0,
        w: 12,
        h: 9,
      },
      id: 4,
      mode: "markdown",
      content: "# title",
    });
  };

  const generateOneFrame = (data) => {
    return {
      type: data.graphic,
      title: data.framename,
      gridPos: {
        x: 0,
        y: 0,
        w: 12,
        h: 9,
      },
      id: data.id,
      mode: "markdown",
      content: "# title",
    };
  };
  const generateComprehensionFrames = () => {
    
    ladContext.comprehensionFrames.map((f) => {
      setComprehensionFrames(comprehensionFrames.concat(generateOneFrame(f)));
    });
  };

  const generateJsonStructure = () => {
    generateMainFrame();
    generateMeta();
    generateComprehensionFrames();
    console.log(comprehensionFrames);
    //  setFile(dashMeta);
    let p = [];
    p = p.concat(mainPanel);
    p = p.concat(comprehensionFrames);
    const f = { ...file, ...dashMeta };
    setFile({ ...file, ...dashMeta, panels: p });
    return;

    setFile({
      time: {
        from: "now-6h",
        to: "now",
      },
      timepicker: {
        time_options: [],
        refresh_intervals: [],
      },
      templating: {
        list: [],
      },
      annotations: {
        list: [],
      },
      refresh: "5s",
      schemaVersion: 17,
      version: 0,
      links: [],
    });
  };
  const saveJSonFile = () => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${filename}.json`;
    link.href = url;
    link.click();

    var file = new File(["Hello, world!"], " ");
    //FileSaver.saveAs(file);
  };
  return (
    <div className="  row">
      <div class="bg-secondary card-header d-flex flex-row">
        <div class="p-2 col-sm-6">Dashboard JSon structure</div>
        <div class="p-2 text-right col-sm-3">
          <span
            className="btn btn-primary btn-sm "
            onClick={generateJsonStructure}
          >
            Generate the structure
          </span>
        </div>
        <div class="p-2 text-right col-sm-3">
          <span className="btn btn-success btn-sm " onClick={saveJSonFile}>
            Save the dashboard
          </span>
        </div>
      </div>
      <div className="card-body bg-light">
        <ReactJson src={file} collapsible view="dual" />
      </div>
    </div>
  );
};

export default GenerateComponent;
