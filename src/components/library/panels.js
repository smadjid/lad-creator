import "./library-view.css";
import React, { useState, useEffect } from "react";
import Actions from "./panels_lib/panel_actions";
import axios from "axios";
import {
  AddBoxRounded,
  EditRounded,
  HighlightOffRounded,
} from "@material-ui/icons";

export const PanelContext = React.createContext();

function Panels(props) {
  const { REACT_APP_BASE_API } = process.env;
  const [panels, setPanels] = useState([]);
  const [visualizations, setVisualizations] = useState([]);
  const [indicators, setIndicators] = useState([]);

  const ws = props.workspace;
  const handleSetSample = (e) => {
    //setSample(e.target.value);
  };

  const [showModal, setShowModal] = useState(false);

  const [currentPanel, setCurrentPanel] = useState();
  const [currentIndicator, setCurrentIndicator] = useState();
  const [currentVisualization, setCurrentVisualization] = useState();

  const panelContext = [
    currentPanel,
    setCurrentPanel,
    currentIndicator,
    setCurrentIndicator,
    currentVisualization,
    setCurrentVisualization,
    indicators,
    visualizations,
  ];

  const [creationMode, setCreationMode] = useState(true);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSave = () => {
    setCurrentPanel({
      ...currentPanel,
      visualization_id: currentVisualization.id,
    });

    let element = currentPanel;
    element.visualization_id = currentVisualization.id;
    element.indicator_id = currentIndicator.id;

    if (creationMode)
      axios.post(REACT_APP_BASE_API+"panels", element).then(() => {
        setPanels([
          ...panels,
          {
            data: element,
            headers: { "Content-Type": "multipart/form-data" },
          },
        ]);
        updateDisplay();
      });
    else
      axios.put(REACT_APP_BASE_API+"panels", element).then((res) => {
        setPanels(
          panels.map((item) => {
            return item.id === element.id
              ? {
                  id: item.id,
                  title: item.title,
                  description: item.description,
                  visualization_id: item.visualization_id,
                  indicator_id: item.indicator_id,
                  request: item.request,
                  ws_id: ws,
                }
              : item;
          })
        );
        updateDisplay();
      });

    setShowModal(false);
    updateDisplay();
  };

  const deletePanel = (id) => {
    window.confirm("Are you sure you want to delete this type of panel?")
      ? axios.delete(`${REACT_APP_BASE_API}panels/${id}`).then((res) => {
          setPanels(
            panels.filter((item) => {
              return item.id !== id;
            })
          );
        })
      : (id = id);
    updateDisplay();
  };

  const getPanels = () => {
    axios.get(REACT_APP_BASE_API+"panels").then((res) => {
      setPanels(res.data);
    });
  };

  const getVisualizations = () => {
    axios.get(REACT_APP_BASE_API+"visualizations").then((res) => {
      setVisualizations(res.data);
    });
  };
  const getIndicators = () => {
    axios.get(REACT_APP_BASE_API+"indicators").then((res) => {
      setIndicators(res.data);
    });
  };

  useEffect(() => {
    getPanels();
    getVisualizations();
    getIndicators();
  }, []);

  const updateDisplay = () => {
    getPanels();
    getVisualizations();
    getIndicators();
  };

  const decodeChart = (blob) => {
    if (!blob) return;
    if (typeof blob === "string") return blob;
    const { data } = blob;
    const img = new Buffer.from(data).toString("ascii");

    return img;
  };

  const fetchVizElement = (id) => {
    if (typeof id === "undefined") return { title: null, chart: null };
    else {
      let elt = visualizations.find((x) => x.id === id);
      if (elt) return elt;
      else return { title: null, chart: null };
    }
  };

  const fetchIndElement = (id) => {
    if (typeof id === "undefined") return;
    else {
      let elt = indicators.find((x) => x.id === id);
      if (elt) return elt.title;
    }
  };

  const CreateNewPanel = () => {
    const item = {
      title: "New",
      description: "Description",
      visualization_id: null,
      indicator_id: null,
      request: null,
      ws_id: ws,
    };
    setCurrentIndicator(indicators[0]);
    setCurrentVisualization(visualizations[0]);

    setCurrentPanel(item);
    setCreationMode(true);
    setShowModal(true);

    return;
  };
  const EditPanel = (item) => {
    indicators.map((elt) => {
      if (elt.id == item.indicator_id) setCurrentIndicator(elt);
    });

    visualizations.map((elt) => {
      if (elt.id == item.visualization_id) setCurrentVisualization(elt);
    });

    setCurrentPanel(item);

    setCreationMode(false);
    setShowModal(true);
  };
  return (
    <PanelContext.Provider value={panelContext}>
      <Actions
        title="un titre"
        show={showModal}
        mode="Creation"
        panels={panels}
        setPanels={setPanels}
        updateDisplay={updateDisplay}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />

      <div>
        <table className="table table-striped ">
          <thead>
            <tr>
             {/* <td>
                 <FormControl>
                  <InputLabel id="activation_action" style={{ color: "white" }}>
                    Use case data
                  </InputLabel>
                  <Select
                    style={{ color: "white" }}
                    labelId="usecase_data"
                    id="demo-controlled-open-select"
                    value={sample}
                    onChange={handleSetSample}
                  >
                    <MenuItem value="at41">AT 41</MenuItem>
                    <MenuItem value="lada">LADA</MenuItem>
                  </Select>
                </FormControl> 
              </td>*/}
              <td>
                <button className="btn btn-success" onClick={CreateNewPanel}>
                  <AddBoxRounded /> &nbsp; New simple panel
                </button>
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <table className="table table-bordered table-hover table-dark table-striped text-md-start">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Title</th>
            <th scope="col">Indicator</th>
            <th scope="col">Representation</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {panels
            .filter((i) => i.ws_id == ws)
            .map((item) => {
              return (
                <tr key={item.id}>
                  {/* <th scope="row">{item.id}</th> */}
                  <td>{item.title}</td>
                  <td>{fetchIndElement(item.indicator_id)}</td>
                  <td>
                    {" "}
                    <i>{fetchVizElement(item.visualization_id).title}</i>
                    <div className="chart_box">
                      <img
                        alt="Chart"
                        src={decodeChart(
                          fetchVizElement(item.visualization_id).chart
                        )}
                      />
                    </div>
                  </td>
                  <td>{item.description}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => EditPanel(item)}
                    >
                      <EditRounded />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deletePanel(item.id)}
                    >
                      <HighlightOffRounded />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </PanelContext.Provider>
  );
}

export default Panels;
