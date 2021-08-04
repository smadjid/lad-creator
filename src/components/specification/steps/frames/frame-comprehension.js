import React, { useState, useContext, useEffect } from "react";
import "./frame-comprehension.css";
import FrameComponent from "./frame-component";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import uniqid from "uniqid";

import { AppContext } from "../../specification-wizard";
import axios from "axios";
import { DoubleArrow } from "@material-ui/icons";

const FrameComprehension = (props) => {
  const [ladContext, setLadContext] = useContext(AppContext);
  const [frames, setFrames] = useState([]);

  const [frameComponents, setFrameComponents] = useState([]);
  const [show, setShow] = useState(false);
  const [newFrameData, setNewFrameData] = useState({
    title: "New Frame",
    type: "Elaboration",
    level: 0,
    description: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getFrames = () => {
    axios.get("http://localhost:3001/frames").then((res) => {
      setFrames(res.data);
    });
  };
  useEffect(() => {
    getFrames();    
  }, []);
  const handleSave = (e) => {
    const id = parseInt(uniqid());
    const lev = newFrameData.level + 1;
    setNewFrameData((prevState) => {
      return { ...prevState, ["level"]: lev };
    });
    const element ={
      level:props.level + 1,
      class:newFrameData.type,
      title:newFrameData.title
    }

    axios.post("http://localhost:3001/frames", element).then((res) => {console.log(res);
        getFrames()
        
      });

    
    setShow(false);
    /* const existingFrameComponents = ladContext.comprehensionFrameComponents;
    const newFrame = {
      id: id,
      type: newFrameData.type,
      title: newFrameData.title,
      graphic: "none",
    };
    setLadContext((prevState) => {
      return {
        ...prevState,
        comprehensionFrameComponents: existingFrameComponents.concat(newFrame),
      };
    }); */
  };
 
  
  const handleFrameDelete = (id) => {
    setFrameComponents((frame) => frameComponents.filter((q) => q.id !== id));
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

  

  return (
    <form className="needs-validation" novalidate>
    <div className="align-middle f_buttons">
          <span className="btn btn-secondary" onClick={handleShow}>
            Associate a new frame support <DoubleArrow/>
          </span>
          <div>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              dialogClassName="modal-style"
              scrollable
              centered
            >
              <Modal.Header>
                <Modal.Title>Configure the frame</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <strong for="frameTitle">Frame name</strong>
                    <input
                      type="text"
                      className="form-control"
                      id="frameTitle"
                      placeholder="Enter a title for the new frame"
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
                      Relation to the original frame
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
                      Short description of the slected item
                    </small>
                    <div>
                      <panel>{newFrameData.description}</panel>
                    </div>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleClose} size="sm" variant="secondary">
                  Close
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  variant="secondary"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      <div className=" div_new_frame">
        <div className="float-right">
        {frames.map((f)=>{
         return (<><FrameComponent
            id={f.id}
            level={f.level}
            class={f.class}
            title={f.title}
            onUpdate={getFrames}
          /><br/></>)
          })}
        </div>
        <hr />
        
      </div>
    </form>
  );
};
export default FrameComprehension;
