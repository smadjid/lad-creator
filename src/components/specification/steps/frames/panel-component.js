import {
  AssignmentSharp,
  DeleteForever,
  KeyboardArrowDown,
  RemoveCircle,
} from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { InfoCircleFill } from "react-bootstrap-icons";
import Collapsible from "react-collapsible";
import ChartComponent from "./chart-component";

const PanelComponent = (props) => {
  const { REACT_APP_BASE_API } = process.env;
  const [indicators, setIndicators] = useState([]);
  const [visualizations, setVisualizations] = useState([]);
  const [panels, setPanels] = useState([]);
  const [cpanels, setCPanels] = useState([]);
  const [pList, setpList] = useState();

  const [currentElement, setCurrentElement] = useState({
    title: " ",
    description: " ",
    chart: null,
  });

  const getPanels = () => {
    axios.get(REACT_APP_BASE_API+"panels").then((res) => {
      setPanels(res.data);
    });
  };
  const getCPanels = () => {
    axios.get(REACT_APP_BASE_API+"cpanels").then((res) => {
      setCPanels(res.data);
    });
  };
  const getCPanelItems = (id) => {
    if (!pList) return [];
    if (!id) return [];
    let elts = pList.filter((i) => i.cpanel_id === id);
    //console.log(elts);
    return elts;
  };

  const getpList = () => {
    axios.get(REACT_APP_BASE_API+"plist").then((res) => {
      setpList(res.data);
    });
  };

  const getIndicators = () => {
    axios.get(REACT_APP_BASE_API+"indicators").then((res) => {
      setIndicators(res.data);
    });
  };

  const getVisualizations = () => {
    axios.get(REACT_APP_BASE_API+"visualizations").then((res) => {
      setVisualizations(res.data);
    });
  };

  useEffect(() => {
    getCPanels();
    getPanels();
    getpList();
    getIndicators();
    getVisualizations();
  }, []);

  const updateDisplay = () => {
    getCPanels();
    getPanels();
    getpList();
    getIndicators();
    getVisualizations();
  };

  const getPanelByID = (id) => {
    let elt = {
      title: " ",
      description: " ",
    };
    if (panels) elt = panels.find((x) => x.id === id);

    return elt;
  };

  const decodeChart = (elt) => {
    if (!elt) return;
    let blob = elt.chart;
    if (!blob) return;
    if (typeof blob === "string") return blob;
    const { data } = blob;
    const img = new Buffer.from(data).toString("ascii");

    return img;
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
  const getIndicatorByID = (id) => {
    let ind = {
      title: " ",
      description: " ",
    };
    //return ind;

    if (indicators) ind = indicators.find((x) => x.id === id);
    return ind ? ind : { title: " ", description: " " };
  };

  const fetchIndElement = (id) => {
    if (typeof id === "undefined") return;
    else {
      let elt = indicators.find((x) => x.id === id);
      if (elt) return elt.title;
    }
  };
  const displayUniquePanel = (p) => {
    let indicator = getIndicatorByID(p.indicator_id);
    let chart = getVizByID(p.visualization_id);

    return (
      <>
        {" "}
        <h6>
          <i>Indicator:</i> {indicator.title}{" "}
        </h6>
        <span>{indicator.description}</span>
        <div className="chart_box">
          <h6>{chart.title} <OverlayTrigger
          placement="bottom"
          rootCloseEvent="mousedown"
          trigger="click"
          overlay={
            <Popover>
              <Popover.Title as="h3"></Popover.Title>
              <Popover.Content>{chart.description}</Popover.Content>
            </Popover>
          }
        >
          <InfoCircleFill role="button" />
        </OverlayTrigger></h6>
          {<img alt="Chart" src={decodeChart(chart)} />}
        </div>
        
      </>
    );
  };
  const simplePanel = () => {
    let panel = getPanelByID(props.panel_id);
    if (panel) return displayUniquePanel(panel);
  };

  const compositePanel = () => {
    return (
      <table className="table table-bordered">
        {getCPanelItems(props.panel_id).map((i) => {
          let panel = getPanelByID(i.panel_id); //console.log(panel);
          if (!panel) panel = {title:' '}
          return (
            <tr
              key={i.id}
              className="cpanel-item  justify-content-between align-items-center"
            >
              <td>
                <h6>{panel.title}</h6>
              </td>
              <td>
                <Collapsible
                  className="align-item-right row"
                  trigger={
                    <span role="button" className="text-info btn-sm btn">
                      Details of the panel <KeyboardArrowDown />
                    </span>
                  }
                >
                  {displayUniquePanel(panel)}
                </Collapsible>
              </td>
              <td></td>
            </tr>
          );
        })}
      </table>
    );
  };

  return (
    <Collapsible
      trigger={
        <span role="button" className="text-info btn-sm btn">
          {props.isComposite ? "Elements that compose the panel": 
            "Details of the panel"}
            <KeyboardArrowDown />
        </span>
      }
    >
      {props.isComposite ? compositePanel() : simplePanel()}
      <h6>
        {/* <i>Indicator:</i> {getIndicatorByID(props.panel_id).title}{" "} */}
      </h6>
      {/*  <span>{getIndicatorByID(i.panel_id).description}</span>
                              <div className="chart_box">
                                <h6>{getVizByID(i.panel_id).title}</h6>
                                <img
                                  alt="Chart"
                                  src={decodeChart(getVizByID(i.panel_id))}
                                />
                              </div>
                              <span>
                                <InfoCircleFill />{" "}
                                <i>{getVizByID(i.panel_id).description}</i>
                              </span> */}
    </Collapsible>
  );
};
export default PanelComponent;
