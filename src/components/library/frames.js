import "./library-view.css";
import React, { useState, useEffect } from "react";
import Actions from "./frames_lib/frame_actions";
import axios from "axios";
import {
  AddBoxRounded,
  EditRounded,
  HighlightOffRounded,
  Loupe,
  RemoveCircle,
} from "@material-ui/icons";
import FrameItem from "./frames_lib/frame_items";

export const FrameContext = React.createContext();

function Frames() {
  const [frames, setFrames] = useState([]);
  const [panels, setPanels] = useState([]);
  const [cpanels, setCPanels] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  const [currentFrame, setCurrentFrame] = useState();
  const [currentPanel, setCurrentPanel] = useState();
  const [fList, setfList] = useState();

  const [currentElement, setCurrentElement] = useState({
    title: "initi",
    description: "to be provided",
    chart: null,
  });

  const [compositeMode, setCompositeMode] = useState(false);

  const frameContext = [
    currentFrame,
    setCurrentFrame,
    currentPanel,
    setCurrentPanel,
    fList,
    setfList,
    panels,
    cpanels,
  ];

  const [creationMode, setCreationMode] = useState(true);

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleItemModalClose = () => {
    setShowItemModal(false);
  };

  const handleItemModalSave = () => {
    let element = currentFrame;
    let flist = {
      isComposite: compositeMode,
      frame_id: currentFrame.id,
      panel_id: currentPanel.id,
    };
    axios.post("http://localhost:3001/flist", flist).then(() => {
      updateDisplay();
    });

    setShowItemModal(false);
    updateDisplay();
  };

  const handleModalSave = () => {
    let element = currentFrame;
    //return;
    if (creationMode)
      axios.post("http://localhost:3001/frames", element).then(() => {
        setFrames([
          ...frames,
          {
            data: element,
            headers: { "Content-Type": "multipart/form-data" },
          },
        ]);

        updateDisplay();
      });
    else
      axios.put("http://localhost:3001/frames", element).then((res) => {
        setFrames(
          frames.map((item) => {
            return item.id === element.id
              ? {
                  id: item.id,
                  title: item.title,
                  description: item.description,
                  class: "",
                }
              : item;
          })
        );
        updateDisplay();
      });

    setShowModal(false);
    updateDisplay();
  };

  const deleteFrame = (id) => {
    window.confirm("Are you sure you want to delete this type of frame?")
      ? axios.delete(`http://localhost:3001/frames/${id}`).then((res) => {
          setFrames(
            frames.filter((item) => {
              return item.id !== id;
            })
          );
        })
      : (id = id);
    updateDisplay();
  };

  const getFrames = () => {
    axios.get("http://localhost:3001/frames").then((res) => {
      setFrames(res.data);
    });
  };
  const getFrameItems = (item) => {
    if (!fList) return [];
    if (!item) return [];
    let elts = fList.filter((i) => i.frame_id === item.id);
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

  const dropCPanItem = (id) => {
    let i = 0;
    window.confirm("Are you sure you want to delete this panel?")
      ? axios.delete(`http://localhost:3001/flist/${id}`).then((res) => {
          setfList(
            fList.filter((item) => {
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

  const getCPanels = () => {
    axios.get("http://localhost:3001/cpanels").then((res) => {
      setCPanels(res.data);
    });
  };

  const getfList = () => {
    axios.get("http://localhost:3001/flist").then((res) => {
      setfList(res.data);
    });
  };

  useEffect(() => {
    getFrames();
    getPanels();
    getCPanels();
    getfList();
  }, []);

  const updateDisplay = () => {
    getFrames();
    getPanels();
    getCPanels();
    getfList();
  };

  const fetchPanelElement = (id) => {
    if (typeof id === "undefined") return { title: null, chart: null };
    else {
      let elt = panels.find((x) => x.id === id);
      if (elt) return elt;
      else return { title: null, description: null };
    }
  };

  const AddSimplePanel = (item) => {
    setCompositeMode(false);
    let elt = fList.find((x) => x.frame_id === item.id);

    setCurrentFrame(item);
    setCurrentPanel(panels[0]);
    setShowItemModal(true);
  };

  const AddCompositePanel = (item) => {
    setCompositeMode(true);
    let elt = fList.find((x) => x.frame_id === item.id);

    setCurrentFrame(item);
    setCurrentPanel(cpanels[0]);
    setShowItemModal(true);
  };

  const CreateNewFrame = () => {
    const item = {
      title: "NewFrame",
      description: "Description",
    };
    setCurrentFrame(item);
    setCreationMode(true);
    setShowModal(true);

    return;
  };

  const EditFrame = (item) => {
    setCurrentFrame(item);
    setCreationMode(false);
    setShowModal(true);
    return;
  };
  return (
    <FrameContext.Provider value={frameContext}>
      <Actions
        title="un titre"
        show={showModal}
        mode="Creation"
        frames={frames}
        setFrames={setFrames}
        updateDisplay={updateDisplay}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
      <FrameItem
        title="un titre"
        show={showItemModal}
        mode="Creation"
        frames={frames}
        isComposite={compositeMode}
        setFrames={setFrames}
        updateDisplay={updateDisplay}
        onClose={handleItemModalClose}
        onSave={handleItemModalSave}
      />

      <div>
        <button className="btn btn-success" onClick={CreateNewFrame}>
          <AddBoxRounded /> &nbsp; New Frame Type
        </button>
      </div>
      <table className="table table-bordered table-hover table-dark table-striped text-md-start">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Class</th>
            <th scope="col">Description</th>
            <th scope="col">Panels</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {frames.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>
                  <h6>{item.title}</h6>
                </td>
                <td>
                  <i>{item.class}</i>
                </td>
                <td>{item.description}</td>
                <td>
                  <span
                    className="btn-sm btn-outline-info"
                    role="button"
                    onClick={() => AddSimplePanel(item)}
                  >
                    <Loupe /> Simple Panel
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span
                    className="btn-sm btn-outline-info"
                    role="button"
                    onClick={() => AddCompositePanel(item)}
                  >
                    <Loupe /> Composite Panel
                  </span>
                  <br />
                  <br />
                  <ol className="list-group-flush">
                    {getFrameItems(item).map((i) => {
                      return (
                        <li
                          key={i.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6>{getPanByID(i.panel_id, i.isComposite).title}</h6>
                          <div>
                            <i>{i.isComposite ? "Composite" : "Simple"}</i>
                            <span
                              role="button"
                              className="text-danger btn-sm"
                              onClick={() => dropCPanItem(i.id)}
                            >
                              <RemoveCircle />
                            </span>{" "}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                  <i>{fetchPanelElement(item.id).title}</i>
                  {/*  <div className="chart_box">                  
                    <img alt="Chart" src={decodeChart(fetchPanelElement(item.visualization_id).chart)} /> </div>*/}
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => EditFrame(item)}
                  >
                    <EditRounded />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteFrame(item.id)}
                  >
                    <HighlightOffRounded />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </FrameContext.Provider>
  );
}

export default Frames;
