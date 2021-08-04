import React, { useState, useContext, useEffect } from "react";
import ReactJson from "react-json-view";
import jsonfile from "jsonfile";
import dash from "../../../data/template_dash.json";
import { AppContext } from "../specification-wizard";

import "./generate-component.css";
import { Button } from "react-bootstrap";
import { BarChartPanel, HBarChartPanel,lineChart,tableChart,pieChart } from "./export/dashcharts";
import shortid from "shortid";
import axios from "axios";

const GenerateComponent = () => {
  const [ladContext, setLadContext] = useContext(AppContext);
  const [currentFrame, setCurrentFrame] = useState();
  const [frames, setFrames] = useState([]);
  const [structure, setStructure] = useState([]);

  const [panels, setPanels] = useState([]);
  const [cpanels, setCPanels] = useState([]);
  const [pList, setpList] = useState();
  const [currentPanel, setCurrentPanel] = useState();
  const [fList, setfList] = useState();
  const [visualizations, setVisualizations] = useState([]);

  const getFrames = () => {
    axios.get("http://localhost:3001/frames").then((res) => {
      setFrames(res.data);
    });
  };
  const getPanels = () => {
    axios.get("http://localhost:3001/panels").then((res) => {
      setPanels(res.data);
    });
  };
  const getCPanels = () => {
    axios.get("http://localhost:3001/cpanels").then((res) => {
      setCPanels(res.data);
    });
  };
  const getpList = () => {
    axios.get("http://localhost:3001/plist").then((res) => {
      setpList(res.data);
    });
  };
  const getfList = () => {
    axios.get("http://localhost:3001/flist").then((res) => {
      setfList(res.data);
    });
  };
  const getVisualizations = () => {
    axios.get("http://localhost:3001/visualizations").then((res) => {
      setVisualizations(res.data);
    });
  };

  const getFrameItems = (item) => {
    if (!fList) return [];
    if (!item) return [];

    let elts = fList.filter((i) => i.frame_id === item);

    return elts;
  };
  const getPanByID = (id, isComposite) => {
    let elt = {
      title: " ",
      description: " ",
    };
    if (isComposite) {
      if (cpanels) elt = cpanels.find((x) => x.id === id);
    } else {
      if (panels) elt = panels.find((x) => x.id === id);
    }

    if (!elt)
      elt = {
        title: " ",
        description: " ",
      };

    return elt;
  };

  const getVizByID = (id) => {
    let viz = {
      title: " ",
      description: " ",
      chart: null,
    };

    let f_viz = null;
    if (visualizations) f_viz = visualizations.find((x) => x.id === id);
    return f_viz ? f_viz : viz;
  };

  const generateRow = (frame) => {
    const framePanels = getFrameItems(frame.id);

    const width = parseInt(24 / framePanels.length);
    let posX = 0;
    let x = 0;
    let panels = [];
    framePanels.map((panel) => {
      let viz = getVizByID(getPanByID(panel.panel_id).visualization_id).title;
      let gridPos = {
        h: 10,
        w: width - 1,
        x: posX,
        y: 0,
      };
      posX = posX + width;
      let panRes = charting({
        id: panel.panel_id + 70,
        title: getPanByID(panel.panel_id).title,
        gridPos: gridPos,
        type: viz,
      });
      panels = panels.concat(panRes);
    });
    let row = [
      {
        collapsed: true,
        datasource: null,
        /*  "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 0
      }, */
        id: frame.id,
        panels: panels,
        title: frame.title,
        type: "row",
      },
    ];
    //  const chart = BarChartPanel({id:frame.id+20});
    //setComprehensionFrames(comprehensionFrames.concat(row));
    return row;
  };
  const generateTitle = (title, description) => {
    return {
      id: 4,
      type: "text",
      title: title,
      targets: [
        {
          refId: "A",
          format: "time_series",
          timeColumn: "time",
          metricColumn: "none",
          group: [],
          where: [
            {
              type: "macro",
              name: "$__timeFilter",
              params: [],
            },
          ],
          select: [
            [
              {
                type: "column",
                params: ["id"],
              },
            ],
          ],
          rawQuery: false,
          rawSql:
            'SELECT\n  time AS "time",\n  id\nFROM devices\nWHERE\n  $__timeFilter(time)\nORDER BY time',
          table: "devices",
          timeColumnType: "timestamp",
        },
      ],
      options: {
        mode: "markdown",
        content: description,
      },
      pluginVersion: "8.0.5",
      description: "",
      datasource: null,
    };
  };

  const generateDashStructure = () => {
    // const frame = frames[0];
    // const title = generateTitle(frame.title);
    //  const struct = generateRow(frame);
    let dash = [];
    frames.map((frame) => {
      dash = dash.concat(generateRow(frame));
    });
    setComprehensionFrames(dash);
    return dash;
  };

  useEffect(() => {
    getFrames();
    getCPanels();
    getPanels();
    getpList();
    getfList();
    getVisualizations();
  }, []);

  const filename = "generated_dashboard";
  const fileData = JSON.stringify(dash);
  const blob = new Blob([fileData], { type: "text/plain" });

  const [mainPanel, setMainPanel] = useState();
  const [comprehensionFrames, setComprehensionFrames] = useState([]);
  const [dashMeta, setDashMeta] = useState({
    annotations: {
      list: [
        {
          builtIn: 1,
          datasource: "-- Grafana --",
          enable: true,
          hide: true,
          iconColor: "rgba(0, 211, 255, 1)",
          name: "Annotations & Alerts",
          type: "dashboard",
        },
      ],
    },
    editable: true,
    gnetId: null,
    graphTooltip: 0,
    links: [],
    panels: [],
    schemaVersion: 30,
    style: "dark",
    tags: [],
    templating: {
      list: [],
    },
    time: {
      from: "now-6h",
      to: "now",
    },
    timepicker: {},
    timezone: "",
    title: "LAD Studio",
    uid: shortid.generate(),
    version: 2,
  });

  const [file, setFile] = useState();

  const generateMeta = () => {
    setDashMeta({
      annotations: {
        list: [
          {
            builtIn: 1,
            datasource: "-- Grafana --",
            enable: true,
            hide: true,
            iconColor: "rgba(0, 211, 255, 1)",
            name: "Annotations & Alerts",
            type: "dashboard",
          },
        ],
      },
      editable: true,
      gnetId: null,
      graphTooltip: 0,
      links: [],
      panels: [],
      schemaVersion: 30,
      style: "dark",
      tags: [],
      templating: {
        list: [],
      },
      time: {
        from: "now-6h",
        to: "now",
      },
      timepicker: {},
      timezone: "",
      title: "LAD Studio",
      uid: shortid.generate(),
      version: 2,
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
  const generateBarChart = () => {
    const l = comprehensionFrames.length + 1;
    const frame = BarChartPanel({ id: l });
    setComprehensionFrames(comprehensionFrames.concat(frame));
  };

  const charting = (params) => {
    let res = [];
   /*  BarChartPanel
HBarChartPanel
lineChart
tableChart
pieChart */
    switch (params.type) {
      case "Heatmap": {
        res = tableChart({
          id: params.id,
          title: params.title,
          gridPos: params.gridPos,
        });
        break;
      }
      case "Barchart": {
        res = BarChartPanel({
          id: params.id,
          title: params.title,
          gridPos: params.gridPos,
        });
        break;
      }
      case "Histogram": {
        res = lineChart({
          id: params.id,
          title: params.title,
          gridPos: params.gridPos,
        });
        break;
      }
      case "Pie chart": {
        res = pieChart({
          id: params.id,
          title: params.title,
          gridPos: params.gridPos,
        });
        break;
      }
    }
    return res;
  };

  const generateJsonStructure = () => {
    //   generateMainFrame();
    let dash = generateDashStructure();
    generateMeta();
    // generateComprehensionFrames();
    //generateBarChart();
    // console.log(comprehensionFrames);
    //  setFile(dashMeta);
    let p = [];
    //p = p.concat(mainPanel);
    p = p.concat(dash);
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
      <div className="col-md-4 card-header ">
        <h6>
          Current frames{" "}
          <button
            role="button"
            onClick={() => {
              return setComprehensionFrames([]);
            }}
          >
            reset
          </button>
        </h6>
        <ol>
          {comprehensionFrames.map((f) => {
            return <li>{f.type}</li>;
          })}
        </ol>
        <h6>Add</h6>
        <Button onClick={generateBarChart}>sample barchart</Button>
        <Button onClick={generateBarChart}>sample barchart</Button>
      </div>
      <div className="col-md-8">
        <div className="bg-secondary card-header d-flex flex-row ">
          <div className="p-2 col-sm-6">Dashboard JSon structure</div>
          <div className="p-2 text-right col-sm-3">
            <span
              className="btn btn-primary btn-sm "
              onClick={generateJsonStructure}
            >
              Generate the structure
            </span>
          </div>
          <div className="p-2 text-right col-sm-3">
            <span className="btn btn-success btn-sm " onClick={saveJSonFile}>
              Save the dashboard
            </span>
          </div>
        </div>
        <div className="card-body bg-light">
          <ReactJson src={file} collapsible view="dual" enableClipboard />
        </div>
      </div>
    </div>
  );
};

export default GenerateComponent;
