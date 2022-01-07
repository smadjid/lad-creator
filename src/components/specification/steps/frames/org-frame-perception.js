import React, { useState, useContext, useEffect } from "react";
import IndicatorChooser from "../indicator-chooser";
import Chart from "../chart";
import { AppContext } from "../../specification-wizard";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { PlayForWorkRounded } from "@material-ui/icons";
import axios from "axios";
import { CMainContext } from "../../../main-dash";


const OrgFramePerception = (props) => {
  const [workspace, setWorkspace] = useContext(CMainContext);
  const [ladContext, setLadContext] = useContext(AppContext);

  const updateContext = (type, value) => {
    
    
    if (type === "ref_graph")
      setLadContext((prevState) => {
        return { ...prevState, mainFrame:{ ...prevState.mainFrame, graphic: value} };
      });
    if (type === "ref_indicator")
      setLadContext((prevState) => {
        return { ...prevState, mainFrame:{ ...prevState.mainFrame, indicator: value} };
      });
  };

  const [frames, setFrames] = useState([]);
  const getFrames = () => {
    const { REACT_APP_BASE_API } = process.env;
    axios.get(REACT_APP_BASE_API+"frames").then((res) => {
      let results = res.data;
      results = results.filter((r) => r.ws_id === workspace);
      setFrames(results);
      
    });
  };
  useEffect(() => {
    getFrames();
  }, []);

  const [frameComponents, setFrameComponents] = useState([]);
  const [showNewFrame, setShowNewFrame] = useState(false);
  const [showLoadFrame, setShowLoadFrame] = useState(false);
  const handleCloseNew = () => setShowNewFrame(false);
  const showExistingFrames = () => setShowLoadFrame(true);
  const [hoverElement, setHoverElement]=useState(0);
  
  
  const handleCloseLoad = () => {setShowLoadFrame(false); setHoverElement(0)};
  const handleLoadFrame = (id) =>{
    const element = frames.filter((f) => f.id === id);
    setLadContext((prevState) => {
      return { ...prevState, frames: ladContext.frames.concat(element) };
    });

    handleCloseLoad();
  }
  
  return (
    <div class="row">
    <h4>Define the screen (indicator and visualizations) that would support you identifying a need for a decision</h4>    
    <div>
    <span className="btn btn-secondary" onClick={showExistingFrames}>
          <PlayForWorkRounded /> Import from Library
        </span>
        {"    "}
        <span className="btn btn-secondary">
          <PlusCircle /> Create a new screen
        </span>
    </div>
    
      <div class="form-group row">
        <div className="col-md-6 mt-2">
          <IndicatorChooser onUpdate={(v) => updateContext('ref_indicator',v)} />
        </div>
        <div className="col-md-6 mt-2 px-4">
          <Chart onUpdate={(v) => updateContext('ref_graph',v)} />
        </div>
      </div>

      {/***************************************************************************************/}

      <div className="align-middle f_buttons">
       
        <div>
          
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
              <table className="table  table-hover table-dark table-striped text-md-start">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col"></th>
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
      
    </div>
  );
};
export default OrgFramePerception;
