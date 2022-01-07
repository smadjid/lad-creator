import "../library-view.css";
import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { FrameContext } from "../frames";

export const chartContext = React.createContext();

const FrameItem = (props) => {
  const [
    currentFrame,
    setCurrentFrame,
    currentPanel,
    setCurrentPanel,
    fList,
    setfList,
    panels,
    cpanels,
  ] = useContext(FrameContext);

  const getPanElement = (i) => {
    if (props.isComposite)
      cpanels.map((item) => {
        if (item.id == i) setCurrentPanel(item);
      });
    else
      panels.map((item) => {
        if (item.id == i) setCurrentPanel(item);
      });
    //console.log(currentPanel)
  };

  return (
    <>
      {currentFrame === undefined ? (
        " "
      ) : (
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
              {props.isComposite ? "Composite Screen -" : "Simple Screen -"}{" "}
              {currentFrame.title}
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
                    <select
                      className="formselect"
                      name="panel"
                      onChange={(e) => getPanElement(e.target.value)}
                    >
                      {props.isComposite
                        ? cpanels.map((item) => {
                            return (
                              <option value={item.id}>{item.title}</option>
                            );
                          })
                        : panels.map((item) => {
                            return (
                              <option value={item.id}>{item.title}</option>
                            );
                          })}
                    </select>
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
      )}
    </>
  );
};
export default FrameItem;
