//import "../library-view.css";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "axios";
import { AppContext } from "./specification-wizard";



const SpecificationActions = (props) => {
  const [currentSpec,setCurrentSpec] = useState();
  const [allSpecs,setAllSpecs] = useState([]);
  const [allSpecFrames,setAllSpecFrames] = useState([]);
  const [ladContext, setLadContext] = useContext(AppContext);
  const [allFrames, setAllFrames] = useState([]);



  const getSpecs = () => {
    const { REACT_APP_BASE_API } = process.env;
    
    axios.get(REACT_APP_BASE_API+"ladstudiospecs").then((res) => {     
      console.log(ladContext)
      setAllSpecs(res.data.filter(spec=>spec.ws_id==ladContext.workspace));      
    });

    axios.get(REACT_APP_BASE_API+"specframes").then((res) => {      
      setAllSpecFrames(res.data);
    });

    axios.get(REACT_APP_BASE_API+"frames").then((res) => {      
      setAllFrames(res.data);
    });
  };

  useEffect(() => {getSpecs()}, []);

  const setWorkingSpec = () =>{
    
    if(currentSpec)
    {
    let spec = allSpecs.find(item=>item.id==currentSpec);
    let spec_frames =  allSpecFrames.filter(item=>item.spec_id==spec.id);

    let frames = [];
    spec_frames.forEach(element => {
      let f = allFrames.find(frame=>frame.id==element.frame_id)
      if(f) frames.push(f)
    });

    let mainFr = allFrames.find(frame=>frame.id==spec.mf_id);
    
    console.log(spec)

    setLadContext({
      id: spec.id, 
      title: spec.title,
      description:spec.description,
      workspace:spec.ws_id,
      meta:{
        learnv:spec.learnv, 
        lms:spec.lms,
        lmsdesc:'',
        role:spec.role,
        to:spec.to,
        by:''
      },
      mainFrame:mainFr,
      comprehensionFrames: [],
      frames: frames,
      context: {}
    });
    }
    
    props.onClose();
  }

  
  
  return (
    
          <Modal
            show={props.show}
            backdrop="static"
            keyboard={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="modal-style"
            scrollable
            centered
          >
            <Modal.Header>
              <Modal.Title>Select a dashboard specification to load</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4 className='text-light'>Specifications defined within the current Workspace (id: {ladContext.workspace})</h4>
              <table className="table table-dark">
                <tbody>
                <tr>
                    <td>Specification Titre</td>
                    <td>
                    { allSpecs.length?
                      <select
                        className="formselect"
                        value={currentSpec}
                        onChange={(e) => {
                          setCurrentSpec(e.target.value );
                        }}
                        name="class"
                        required
                      >
                      { allSpecs.map((item) => {
                        return(<option value={item.id}>{item.title}</option>)
                      })}
                        
                      </select>:<h5 className="text-danger">No specification</h5>}
                    </td>
                  </tr>

                  
                 
                  <tr>
                    <td>Description</td>
                    <td>
                    { allSpecs.length?
                      <textarea
                        type="text"
                        placeholder="Description..."
                       disabled
                        name="description"
                        required
                      />: <span className="text-secondary">The library does not contain any specification related to this workspace</span>}
                    </td>
                  </tr>
                                 
                  <tr>                  
                  </tr>
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={props.onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                variant="secondary"
                onClick={setWorkingSpec}
              >
                Load
              </Button>
            </Modal.Footer>
          </Modal>
      )}
    
  
export default SpecificationActions;
