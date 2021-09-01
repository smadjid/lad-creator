import "./library-view.css";
import React, { useState, useEffect } from "react";
import Actions from "./panels_lib/cpanel_actions";
import axios from "axios";
import Collapsible from "react-collapsible";
import {
  AddBoxRounded,
  DeleteForever,
  EditRounded,
  HighlightOffRounded,
  KeyboardArrowDown,
  Loupe,
} from "@material-ui/icons";
import CPanelItem from "./panels_lib/cpanel_items";
import { InfoCircleFill } from "react-bootstrap-icons";
import { FormControl, MenuItem, InputLabel, Select } from "@material-ui/core";

export const CPanelContext = React.createContext();

function CPanels(props) {
  const [cpanels, setCPanels] = useState([]);
  const [panels, setPanels] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  const [currentCPanel, setCurrentCPanel] = useState();
  const [currentPanel, setCurrentPanel] = useState();
  const [pList, setpList] = useState();
  const [visualizations, setVisualizations] = useState();
  const [indicators, setIndicators] = useState();
  
  const ws = props.workspace;
  //const [sample, setSample] = useState('at41');
  const handleSetSample = (e) =>{
  //  setSample(e.target.value);
  }
  const cpanelContext = [
    currentCPanel,
    setCurrentCPanel,
    currentPanel,
    setCurrentPanel,
    pList,
    setpList,
    panels,
    visualizations,
    indicators,
  ];

  const [creationMode, setCreationMode] = useState(true);

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleItemModalClose = () => {
    setShowItemModal(false);
  };

  const handleItemModalSave = () => {
    let element = currentCPanel;
    let plist = {
      cpanel_id: currentCPanel.id,
      panel_id: currentPanel.id,
    };
    axios.post("http://localhost:3001/plist", plist).then(() => {
      updateDisplay();
    });

    setShowItemModal(false);
    updateDisplay();
  };

  const handleModalSave = () => {
    let element = currentCPanel;

    //return;
    if (creationMode)
      axios.post("http://localhost:3001/cpanels", element).then(() => {
        setCPanels([
          ...cpanels,
          {
            data: element,
            headers: { "Content-Type": "multipart/form-data" },
          },
        ]);

        updateDisplay();
      });
    else
      axios.put("http://localhost:3001/cpanels", element).then((res) => {
        setCPanels(
          cpanels.map((item) => {
            return item.id === element.id
              ? {
                  id: item.id,
                  title: item.title,
                  description: item.description,
                  ws_id: ws
                }
              : item;
          })
        );
        updateDisplay();
      });

    setShowModal(false);
    updateDisplay();
  };

  const deleteCPanel = (id) => {
    window.confirm("Are you sure you want to delete this type of cpanel?")
      ? axios.delete(`http://localhost:3001/cpanels/${id}`).then((res) => {
          setCPanels(
            cpanels.filter((item) => {
              return item.id !== id;
            })
          );
        })
      : (id = id);
    updateDisplay();
  };

  const getCPanels = () => {
    axios.get("http://localhost:3001/cpanels").then((res) => {
      setCPanels(res.data);
    });
  };
  const getCPanelItems = (item) => {
    if (!pList) return [];
    if (!item) return [];
    let elts = pList.filter((i) => i.cpanel_id === item.id);
    return elts;
  };

  const getPanByID = (id) => {
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
    if (panels) pan = panels.find((x) => x.id === id);
    if (visualizations)
      viz = visualizations.find((x) => x.id === pan.visualization_id);

    return viz;
  };
  const getIndByID = (id) => {
    let pan = {
      title: " ",
      description: " ",
    };
    let ind = {
      title: " ",
      description: " ",
    };
    if (panels) pan = panels.find((x) => x.id === id);
    if (indicators) ind = indicators.find((x) => x.id === pan.indicator_id);

    return ind;
  };

  const displayCPanItem = (id) => {
    alert("TODO");
  };
  const dropCPanItem = (id) => {
    let i = 0;
    window.confirm("Are you sure you want to delete this simple panel?")
      ? axios.delete(`http://localhost:3001/plist/${id}`).then((res) => {
          setpList(
            pList.filter((item) => {
              return item.id !== id;
            })
          );
        })
      : (i = 1);
  };

  const getPanels = () => {
    axios.get("http://localhost:3001/panels").then((res) => {
      setPanels(res.data);
    });
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

  const fetchPanelElement = (id) => {
    if (typeof id === "undefined") return { title: null, chart: null };
    else {
      let elt = panels.find((x) => x.id === id);
      if (elt) return elt;
      else return { title: null, description: null };
    }
  };

  const AddCPanelItems = (item) => {
    let elt = pList.find((x) => x.cpanel_id === item.id);

    setCurrentCPanel(item);
    setCurrentPanel(panels[0]);
    setShowItemModal(true);
  };
  const DeleteCPanelItems = (item) => {
    let elt = pList.find((x) => x.cpanel_id === item.id);
    console.log(pList);
  };

  const CreateNewCPanel = () => {
    const item = {
      title: "NewPanel",
      description: "Description",
      ws_id: ws
    };
    setCurrentCPanel(item);
    setCreationMode(true);
    setShowModal(true);

    return;
  };

  const EditCPanel = (item) => {
    console.log(item);
    setCurrentCPanel(item);
    setCreationMode(false);
    setShowModal(true);
    return;
    /* indicators.map((elt)=>{
        if(elt.id == item.indicator_id) setCurrentIndicator(elt)
    });


    visualizations.map((elt)=>{
        if(elt.id == item.visualization_id) setCurrentVisualization(elt)
    }); */
  };
  return (
    <CPanelContext.Provider value={cpanelContext}>
      <Actions
        title="un titre"
        show={showModal}
        mode="Creation"
        cpanels={cpanels}
        setCPanels={setCPanels}
        updateDisplay={updateDisplay}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
      <CPanelItem
        title="un titre"
        show={showItemModal}
        mode="Creation"
        cpanels={cpanels}
        setCPanels={setCPanels}
        ws_id={ws}
        updateDisplay={updateDisplay}
        onClose={handleItemModalClose}
        onSave={handleItemModalSave}
      />

      <div>
      <table className="table table-striped ">
          <thead>
            <tr>
              
              <td>
                <button className="btn btn-success" onClick={CreateNewCPanel}>
                  <AddBoxRounded /> &nbsp; New composite panel
                </button>
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <table className="table table-bordered table-hover table-dark table-striped text-md-start">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Panels</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            cpanels
            .filter((i) => i.ws_id == ws)
            .map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>
                  <h6>{item.title}</h6>
                </td>
                <td>{item.description}</td>
                <td>
                  <span
                    className="btn-sm btn-outline-info"
                    role="button"
                    onClick={() => AddCPanelItems(item)}
                  >
                    <Loupe /> Simple panel
                  </span>
                  <br />
                  <br />
                  <table className="table table-bordered">
                    {getCPanelItems(item).map((i) => {
                      let pan = getPanByID(i.panel_id);
                      if(pan)
                      return (
                        <tr
                          key={i.id}
                          className="cpanel-item  justify-content-between align-items-center"
                        >
                          <td>
                            {" "}
                            <h6>{getPanByID(i.panel_id).title}</h6>
                          </td>
                          <td>
                            <Collapsible
                              className="align-item-right row"
                              trigger={
                                <span
                                  role="button"
                                  className="text-info btn-sm btn"
                                >
                                  Details of the panel <KeyboardArrowDown />
                                </span>
                              }
                            >
                              <h6>
                                <i>Indicator:</i> {getIndByID(i.panel_id).title}{" "}
                              </h6>
                              <span>{getIndByID(i.panel_id).description}</span>
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
                              onClick={() => dropCPanItem(i.id)}
                            >
                              <DeleteForever />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                  <i>{fetchPanelElement(item.id).title}</i>
                  {/*  <div className="chart_box">                  
                    <img alt="Chart" src={decodeChart(fetchPanelElement(item.visualization_id).chart)} /> </div>*/}
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => EditCPanel(item)}
                  >
                    <EditRounded />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteCPanel(item.id)}
                  >
                    <HighlightOffRounded />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </CPanelContext.Provider>
  );
}

export default CPanels;
