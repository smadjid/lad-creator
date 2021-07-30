import { KeyboardArrowDown, RemoveCircle } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { InfoCircleFill } from "react-bootstrap-icons";
import Collapsible from "react-collapsible";
import ChartComponent from "./chart-component";

const PanelComponent = (props) => {
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
    axios.get("http://localhost:3001/panels").then((res) => {
      setPanels(res.data);
    });
  };
  const getCPanels = () => {
    axios.get("http://localhost:3001/cpanels").then((res) => {
      setCPanels(res.data);
    });
  };
  const getCPanelItems = (id) => {
    if (!pList) return [];
    if (!id) return [];
    let elts = pList.filter((i) => i.cpanel_id === id);
    return elts;
  };

  const getpList = () => {
    axios.get("http://localhost:3001/plist").then((res) => {
      setpList(res.data);
    });
  };

  const getIndicators = () => {
    axios.get("http://localhost:3001/indicators").then((res) => {
      setIndicators(res.data);
    });
  };

  const getVisualizations = () => {
    axios.get("http://localhost:3001/visualizations").then((res) => {
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
    //console.log(id)
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
    let pan = {
      title: " ",
      description: " ",
    };
    let viz = {
      title: " ",
      description: " ",
      chart: null,
    };
    return viz;

    if (panels) pan = panels.find((x) => x.id === id);
    if (visualizations)
      viz = visualizations.find((x) => x.id === pan.visualization_id);

    return viz;
  };
  const getIndicatorByID = (id) => {
    let pan = {
      title: " ",
      description: " ",
    };
    let ind = {
      title: " ",
      description: " ",
    };
    return ind;

    if (panels) pan = panels.find((x) => x.id === id);
    if (indicators) ind = indicators.find((x) => x.id === pan.indicator_id);

    return ind;
  };

  const fetchIndElement = (id) => {
    if (typeof id === "undefined") return;
    else {
      let elt = indicators.find((x) => x.id === id);
      if (elt) return elt.title;
    }
  };
  const displayUniquePanel = (p) => {
    return (
      <>
        {" "}
        <h6>
          <i>Indicator:</i> {getIndicatorByID(p.panel_id).title}{" "}
        </h6>
        <span>{getIndicatorByID(p.panel_id).description}</span>
        <div className="chart_box">
          <h6>{getVizByID(p.panel_id).title}</h6>
          <img alt="Chart" src={decodeChart(getVizByID(p.panel_id))} />
        </div>
        <span>
          <InfoCircleFill /> <i>{getVizByID(p.panel_id).description}</i>
        </span>
      </>
    );
  };
  const simplePanel = () => {return displayUniquePanel(props.panel_id)};


  const compositePanel = () => {
    return (
      <table className="table table-bordered">
        {getCPanelItems(props.panel_id).map((i) => {
          return (
            <tr
              key={i.id}
              className="cpanel-item  justify-content-between align-items-center"
            >
              <td>
                <h6>{getPanelByID(i.panel_id).title}</h6>
              </td>
              <td>
                <Collapsible
                  className="align-item-right row"
                  trigger={
                    <span role="button" className="text-info btn-sm btn">
                      Details <KeyboardArrowDown />
                    </span>
                  }
                >
                  {displayUniquePanel(i.panel_id)}
                  
                </Collapsible>
              </td>
              
            </tr>
          );
        })}
      </table>
    );
  };


  const tmpCompositePanel = () => {
    return (
      <table className="table table-bordered">
        {getCPanelItems(props.panel_id).map((i) => {
          return (
            <tr
              key={i.id}
              className="cpanel-item  justify-content-between align-items-center"
            >
              <td>
                <h6>{getPanelByID(i.panel_id).title}</h6>
              </td>
              <td>
                <Collapsible
                  className="align-item-right row"
                  trigger={
                    <span role="button" className="text-info btn-sm btn">
                      Details <KeyboardArrowDown />
                    </span>
                  }
                >
                  <h6>
                    <i>Indicator:</i> {getIndicatorByID(i.panel_id).title}{" "}
                  </h6>
                  <span>{getIndicatorByID(i.panel_id).description}</span>
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
                  </span>
                </Collapsible>
              </td>
              <td>
                <span
                  role="button"
                  className="text-danger btn-sm"
                  //  onClick={() => dropCPanItem(i.id)}
                >
                  <RemoveCircle />
                </span>
              </td>
            </tr>
          );
        })}
      </table>
    );
  };
  const tmpPanel = (is) => {
    return <div>TMP Panel</div>;
  };
  return (
    <Collapsible
      trigger={
        <span role="button" className="text-info btn-sm btn">
          Details of the panel <KeyboardArrowDown />
        </span>
      }
    >
      {props.isComposite
        ? compositePanel()
        : simplePanel()}
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
