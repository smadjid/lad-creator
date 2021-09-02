//import "../library-view.css";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "axios";



const SpecificationActions = (props) => {
  const [currentSpec,setCurrentSpec] = useState();
  const [allSpecs,setAllSpecs] = useState([]);


  const getSpecs = () => {
    axios.get("http://localhost:3001/ladstudiospecs").then((res) => {
      console.log(res.data);
      setAllSpecs(res.data);
    });
  };

  useEffect(() => {getSpecs()}, []);

  
  
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
            <h4 className='text-light'>Specifications defined within the current Workspace</h4>
              <table className="table table-dark">
                <tbody>
                <tr>
                    <td>Specification Titre</td>
                    <td>
                      <select
                        className="formselect"
                        value={currentSpec}
                        onChange={(e) => {
                          setCurrentSpec(e.target.value );
                          console.log(e.target.value);
                        }}
                        name="class"
                        required
                      >
                      { allSpecs.map((item) => {
                        return(<option value={item.id}>{item.title}</option>)
                      })}
                        
                      </select>
                    </td>
                  </tr>

                  
                 
                  <tr>
                    <td>Description</td>
                    <td>
                      <textarea
                        type="text"
                        placeholder="Description..."
                       disabled
                        name="description"
                        required
                      />
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
                onClick={props.onSave(5)}
              >
                Load
              </Button>
            </Modal.Footer>
          </Modal>
      )}
    
  
export default SpecificationActions;
