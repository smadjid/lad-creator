import "../library-view.css";
import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { CPanelContext } from "../cpanels";

export const chartContext = React.createContext();

const Actions = (props) => {
  const [
    currentCPanel,
    setCurrentCPanel,
  ] = useContext(CPanelContext);



  return (
    <>
      {currentCPanel === undefined ? (
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
              <Modal.Title>{currentCPanel.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-dark">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>
                      <input
                        type="text"
                        placeholder="CPanel Title"
                        onChange={(e) =>
                          setCurrentCPanel({
                            ...currentCPanel,
                            title: e.target.value,
                          })
                        }
                        name="title"
                        value={currentCPanel.title}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>
                      <textarea
                        type="text"
                        placeholder="Description..."
                        value={currentCPanel.description}
                        onChange={(e) =>
                          setCurrentCPanel({
                            ...currentCPanel,
                            description: e.target.value,
                          })
                        }
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
                onClick={props.onSave}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
      )}
    </>
  );
};
export default Actions;
