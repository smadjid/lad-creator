import React, { useState, useContext, useEffect } from "react";
import "./frame-comprehension.css";
import FrameComponent from "./frame-component";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import uniqid from "uniqid";

import { AppContext } from "../../specification-wizard";
import axios from "axios";
import { DoubleArrow, PlayForWorkRounded, Warning } from "@material-ui/icons";
import { CMainContext } from "../../../main-dash";
import { PlusCircle } from "react-bootstrap-icons";

const FramePerception = (props) => {
  const { REACT_APP_BASE_API } = process.env;
  const [ladContext, setLadContext] = useContext(AppContext);
  const [workspace, setWorkspace] = useContext(CMainContext);
  const [frames, setFrames] = useState([]);

  const [frameComponents, setFrameComponents] = useState([]);
  const [showNewFrame, setShowNewFrame] = useState(false);
  const [showLoadFrame, setShowLoadFrame] = useState(false);
  const [newFrameData, setNewFrameData] = useState({
    title: "New Screen",
    type: "Elaboration",
    level: 0,
    description: "",
  });

  const handleCloseNew = () => setShowNewFrame(false);
  const handleCloseLoad = () => {setShowLoadFrame(false); setHoverElement(0)};
  const showExistingFrames = () => setShowLoadFrame(true);

  const [hoverElement, setHoverElement]=useState(0);

  const createNewFrame = () => setShowNewFrame(true);

  const getFrames = () => {
    axios.get(REACT_APP_BASE_API+"frames").then((res) => {
      let results = res.data;
      results = results.filter((r) => r.ws_id === workspace);
      setFrames(results);
      /* let existingframes = ladContext.frames;
      results = existingframes.filter(cf => {
        let arr = frames.filter(f => f.id === cf.id)
        return !(arr.length === 0)
      }); */
    });
  };
  useEffect(() => {
    getFrames();
  }, []);
  const handleLoadFrame = (id) => {
    const elt = frames.filter((f) => f.id === id);
    setLadContext((prevState) => {
      return { ...prevState, mainFrame: elt[0] };
    });
    console.log(ladContext.mainFrame);
  };
  const handleSaveNew = (e) => {
    const lev = newFrameData.level + 1;
    setNewFrameData((prevState) => {
      return { ...prevState, ["level"]: lev };
    });
    const element = {
      level: props.level + 1,
      class: newFrameData.type,
      title: newFrameData.title,
      sample: ladContext.Sample,
      ws_id: workspace,
    };

    axios.post(REACT_APP_BASE_API+"frames", element).then((res) => {
      let results = res.data;
      let eltId = Object.values(results[0])[0];
      results = results.filter((r) => r.ws_id === workspace);
      setFrames(results);
      element.id = eltId;

      setLadContext((prevState) => {
        return { ...prevState, mainFrame: element };
      });
      //setDashFrames(dashFrames.concat(element));
    });

    setShowNewFrame(false);
  };

  const updateDialogData = (type, ev) => {
    setNewFrameData((prevState) => {
      return { ...prevState, [type]: ev.target.value };
    });
  };

  const updateDialogDataDescription = (ev) => {
    let description = "";
    switch (ev.target.value) {
      case "Elaboration":
        description =
          "Adding data and new relationships to better elaborate the current interpretation of the situation";
        break;
      case "Inquiry":
        description =
          "Questioning data that is incompatible with the current interpretation of the situation";
        break;
      case "Preservation":
        description =
          "Seeking if an explication of the situation is consistent despite apparent incompatibility";
        break;
      case "Comparison":
        description =
          "Comparing multiple interpretations that can explain the situation";
        break;
      case "Reframing":
        description = "Looking for a reason that explains the situation";
        break;
      case "Seeking":
        description = "Seeking a new interpretation of the situation";
        break;
      default:
        description = "Other activity.";
    }

    setNewFrameData((prevState) => {
      return { ...prevState, ["description"]: description };
    });
  };

  const removeFrame = (id) => {
    //console.log(ladContext.mainFrame);return;
    setLadContext((prevState) => {
      return {
        ...prevState,
        mainFrame: null,
      };
    });
  };

  return (
    <form className="needs-validation" novalidate>
      <div className="align-middle f_buttons">
        <span className="btn btn-secondary" onClick={showExistingFrames}>
          <PlayForWorkRounded /> Import a screen from Library
        </span>
        {"    "}
        <span className="btn btn-secondary" onClick={createNewFrame}>
          <PlusCircle /> Create a new screen
        </span>
        {"    "}
        {ladContext.mainFrame?
        <span className="text-warning" >
          <Warning /> This will overwrite the current screen 
        </span>: <span/>}
        <div>
          <Modal
            show={showNewFrame}
            onHide={handleCloseNew}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="modal-style"
            scrollable
            centered
          >
            <Modal.Header>
              <Modal.Title>Configure the screen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <strong for="frameTitle">Screen name</strong>
                  <input
                    type="text"
                    className="form-control"
                    id="frameTitle"
                    placeholder="Enter a title for the new screen"
                    value={newFrameData.title}
                    onChange={(e) => updateDialogData("title", e)}
                    required
                  />
                  <small className="form-text text-muted">
                    Please make it unique and keep it concise
                  </small>
                </div>

                <div className="form-group">
                  <strong for="select_relation">
                    Relation to the original screen
                  </strong>
                  <select
                    className="form-control"
                    id="select_relation"
                    value={newFrameData.type}
                    onChange={(e) => {
                      updateDialogData("type", e);
                      updateDialogDataDescription(e);
                    }}
                  >
                    <option>Elaboration</option>
                    <option>Inquiry</option>
                    <option>Preservation</option>
                    <option>Comparison</option>
                    <option>Reframing</option>
                    <option>Seeking</option>
                    <option>(Other)</option>
                  </select>
                  <small className="form-text text-muted">
                    Short description of the selected item
                  </small>
                  <div>
                    <panel>{newFrameData.description}</panel>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCloseNew} size="sm" variant="secondary">
                Close
              </Button>
              <Button
                type="submit"
                size="sm"
                variant="secondary"
                onClick={handleSaveNew}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showLoadFrame}
            onHide={handleCloseLoad}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="modal-style"
            scrollable
            centered
          >
            <Modal.Header>
              <Modal.Title>Select and load a screen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-hover table-dark table-striped text-md-start">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {frames.map((f) => {                   
                    return (
                      <tr key={f.id} onMouseOver={()=>{setHoverElement(f.id)}}>
                        <td>{f.title}</td>
                        <td>{f.description}</td>
                        <td style={{textAlign:'right'}}>
                          {(hoverElement==f.id)?
                            <Button
                              type="submit"
                              size="sm"
                              variant="primary"
                              onClick={() => {
                                return handleLoadFrame(f.id);
                              }}
                            >
                              Select
                            </Button>:''}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCloseLoad} size="sm" variant="secondary">
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div className=" div_new_frame">
        <div className="float-right">
        {ladContext.mainFrame? 
        <FrameComponent
                  id={ladContext.mainFrame.id}
                  level={ladContext.mainFrame.level}
                  class={ladContext.mainFrame.class}
                  title={ladContext.mainFrame.title}
                  sample={ladContext.Sample}
                  onUpdate={getFrames}
                  onRemove={() => removeFrame(ladContext.mainFrame.id)}
                />:
                <h5>No perception screen defined</h5>}
        </div>
      </div>
    </form>
  );
};
export default FramePerception;


