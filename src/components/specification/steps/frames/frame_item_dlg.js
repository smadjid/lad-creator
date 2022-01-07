//import "../library-view.css";
import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { FrameContext } from "./frame-component";
import Select from "react-select";


const FrameItemDlg = (props) => {
  const [
    currentPanel,
    setCurrentPanel,
    fList,
    setfList,
    panels,
    cpanels,
  ] = useContext(FrameContext);

  

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
            <Modal.Title>
              {props.isComposite ? "Composite Screen -" : "Simple Screen -"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table table-dark cpanel-tab">
              <tbody>
                <tr>
                  <td>
                    <b>Select a panel to insert</b>
                  </td>
                  <td>
                  <div className="form-group has-search">
                    <Select
                      isSearchable
                      className="selectItem"
                      placeholder="Search and/or select a panel"
                      options={props.isComposite? cpanels : panels}
                      getOptionLabel={(option) => option.title}
                      getOptionValue={(option) => option.id}
                      onChange={setCurrentPanel}
                    />
                  </div>
                  
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    Description :{" "}
                    <i>{currentPanel ? currentPanel.description : ""}</i>
                  </td>
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
              onClick={() => props.onSave()}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
  );
};
export default FrameItemDlg;
