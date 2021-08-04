import React, { useEffect, useState } from "react";
import "./frame-component.css";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import PanelComponent from "./panel-component";
import axios from "axios";
import {
  ArrowForwardIos,
  DeleteForever,
  DoubleArrow,
  ExpandLess,
  ExpandMore,
  PostAdd,
  RemoveCircle,
} from "@material-ui/icons";
import FrameItemDlg from "./frame_item_dlg";
import { FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";

export const FrameContext = React.createContext();

const FrameComponent = (props) => {
  const [frames, setFrames] = useState([]);
  const [panels, setPanels] = useState([]);
  const [cpanels, setCPanels] = useState([]);
  const [pList, setpList] = useState();
  const [currentFrame, setCurrentFrame] = useState();
  const [currentPanel, setCurrentPanel] = useState();
  const [fList, setfList] = useState();

  const [currentElement, setCurrentElement] = useState({
    title: "initi",
    description: "to be provided",
    chart: null,
  });

  const frameContext = [
    currentPanel,
    setCurrentPanel,
    fList,
    setfList,
    panels,
    cpanels,
  ];

  const [creationMode, setCreationMode] = useState(true);
  const [compositeMode, setCompositeMode] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  const handleChange = (ev) => {
    setCurrentElement(ev);
    console.log(currentElement);
  };

  const [position, setPosition] = useState("");

  const getFrames = () => {
    axios.get("http://localhost:3001/frames").then((res) => {
      setFrames(res.data);
    });
  };
  const getFrameItems = (item) => {
    if (!fList) return [];
    if (!item) return [];

    let elts = fList.filter((i) => i.frame_id === item);

    //console.log(elts);
    return elts;
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
  const getCPanelItems = (item) => {
    if (!pList) return [];
    if (!item) return [];
    let elts = pList.filter((i) => i.cpanel_id === item.id);
    return elts;
  };

  const getpList = () => {
    axios.get("http://localhost:3001/plist").then((res) => {
      setpList(res.data);
    });
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
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

  const getfList = () => {
    axios.get("http://localhost:3001/flist").then((res) => {
      setfList(res.data);
    });
  };

  useEffect(() => {
    getFrames();
    getfList();
    getCPanels();
    getPanels();
    getpList();
  }, []);

  const updateDisplay = () => {
    getFrames();
    getfList();
    getCPanels();
    getPanels();
    getpList();
  };

  const AddSimplePanel = () => {
    setCompositeMode(false);
    let elt = fList.find((x) => x.frame_id === props.id);

    //  setCurrentFrame(item);
    setCurrentPanel(panels[0]);

    setShowItemModal(true);
  };

  const AddCompositePanel = (item) => {
    setCompositeMode(true);
    let elt = fList.find((x) => x.frame_id === props.id);

    setCurrentPanel(cpanels[0]);
    setShowItemModal(true);
  };

  const EditFrame = (item) => {
    //  setCurrentFrame(item);
    // setCreationMode(false);
    // setShowModal(true);
    return;
  };
  const deleteFrame = () => {
    let i = 0;
    window.confirm("Are you sure you want to delete this frame?")
      ? axios.delete(`http://localhost:3001/frames/${props.id}`).then((res) => {
          props.onUpdate();
          i = 0;
        })
      : (i = 1);
    updateDisplay();
  };
  const handleItemModalClose = () => {
    setShowItemModal(false);
  };

  const [frameCollapsed, setFrameCollapsed] = useState(true);

  const handleItemModalSave = () => {
    let element = currentFrame;
    let flist = {
      isComposite: compositeMode,
      frame_id: props.id,
      panel_id: currentPanel.id,
    };
    axios.post("http://localhost:3001/flist", flist).then(() => {
      updateDisplay();
    });

    setShowItemModal(false);
    updateDisplay();
  };

  return (
    <FrameContext.Provider value={frameContext}>
      <FrameItemDlg
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

      <div className="row card text-dark ">
        <div class="frame_header">
          <div>
            {" "}
            <span class="badge bg-success">
              <i>{props.class} Frame</i>
            </span>
            <b> {props.title}</b>
          </div>
          <div>
            <span
              className="btn btn-sm btn-outline-light "
              onClick={() => setFrameCollapsed(!frameCollapsed)}
            >
              {frameCollapsed ? <ExpandMore /> : <ExpandLess />}
              {`${frameCollapsed ? "Show" : "Hide"} `}
            </span>
            &nbsp;
            <span
              className="btn btn-sm btn-outline-light"
              onClick={deleteFrame}
            >
              <DeleteForever /> Delete
            </span>
          </div>
        </div>
        <div className={`${frameCollapsed ? "collapse" : ""} row`}>
          <div className="col-md-12 card-body">
            <div className="row">
            
              <div className="card col-md-7">
              
                <Card className="transition-config">
                  <Card.Header className="dark-white d-flex justify-content-between">
                    <h6>Panels that compose the frame support</h6>
                    <DropdownButton
                      variant="secondary"
                      menuVariant="dark"
                      title={<PostAdd />}
                      size="sm"
                    >
                      <Dropdown.Item href="#" onClick={() => AddSimplePanel()}>
                        <ArrowForwardIos />
                        Simple panel
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="#"
                        onClick={() => AddCompositePanel()}
                      >
                        <DoubleArrow /> Composite panel
                      </Dropdown.Item>
                    </DropdownButton>
                  </Card.Header>
                  <Card.Body>
                    <div>
                      {getFrameItems(props.id).map((i) => {
                        return (
                          <div
                            key={i.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <h6>
                                {getPanByID(i.panel_id, i.isComposite).title}
                              </h6>
                              <i>{i.isComposite ? "Composite" : "Simple"}</i>
                              <span
                                role="button"
                                className="text-danger btn-sm"
                                onClick={() => dropCPanItem(i.id)}
                              >
                                <DeleteForever />
                              </span>
                            </div>

                            <PanelComponent
                              panel_id={i.panel_id}
                              isComposite={i.isComposite}
                              data={currentElement}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <Card className="col-md-5 bg-light transition-config">
              
                <Card.Header className="dark-white">
                  <h6>Transition into this frame support </h6>
                </Card.Header>
                <Card.Body className="col-md-12">
                  <div className="row">
                  
                    <div className="col-md-6">
                    
                      <Card className=" text-dark bg-light mb-3">
                        <Card.Header>
                          Activation from the reference frame
                        </Card.Header>
                        <Card.Body>
                          <FormControl>
                            <InputLabel id="activation_action">
                              Activation action
                            </InputLabel>
                            <Select
                              labelId="activation_action"
                              id="demo-controlled-open-select"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value='click'>Click</MenuItem>
                              <MenuItem value='hover'>Hover</MenuItem>
                              <MenuItem value='select'>Select</MenuItem>
                            </Select>
                          </FormControl>
                          

                          {/*  <small className="form-text text-muted">
                          Short description of the slected item
                        </small> */}
                        </Card.Body>
                      </Card>
                      <Card className=" text-dark bg-light mb-3">
                        <Card.Header>
                          Display of the this frame
                        </Card.Header>
                        <Card.Body>
                          <FormControl>
                            <InputLabel id="activation_action">
                              Display setting
                            </InputLabel>
                            <Select
                              labelId="activation_action"
                              id="demo-controlled-open-select"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value='overlap'>Side to side</MenuItem>
                              <MenuItem value='new'>New windows</MenuItem>
                              <MenuItem value='replace'>Replacement</MenuItem>
                              <MenuItem value='overlap'>Overlap</MenuItem>
                            </Select>
                          </FormControl>
                          

                          {/*  <small className="form-text text-muted">
                          Short description of the slected item
                        </small> */}
                        </Card.Body>
                      </Card> 
                    </div>
                    <div className="col-md-6">
                      <Card className="text-dark bg-light mb-3">
                        <Card.Header>Position relative to the reference frame</Card.Header>

                        <Card.Body>
                        <FormControl>
                            <InputLabel id="position_action">
                              Placement 
                            </InputLabel>
                            <Select
                              labelId="position_action"
                              id="select_relation"
                              onChange={handlePositionChange}
                            value={position}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value="right">
                              On the right
                            </MenuItem>
                            <MenuItem value="left">
                              On the left
                            </MenuItem>
                            <MenuItem value="above">
                              Above
                            </MenuItem>
                            <MenuItem value="below">
                              Below
                            </MenuItem>
                            <MenuItem value="on">
                              At place (replace)
                            </MenuItem>
                            </Select>
                          </FormControl>

                          
                          {/*  <small className="form-text text-muted">
                          Short description of the slected item
                        </small> */}
                          <img
                            className="chart_box-image"
                            src={
                              process.env.PUBLIC_URL +
                              "/charts/position_" +
                              position +
                              ".png"
                            }
                          />
                        </Card.Body>
                      </Card>
                    </div>{" "}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          {/* <FrameComprehension /> */}
        </div>
      </div>
    </FrameContext.Provider>
  );
};
export default FrameComponent;
