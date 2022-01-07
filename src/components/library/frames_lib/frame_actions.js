import "../library-view.css";
import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { FrameContext } from "../frames";


const Actions = (props) => {
  const [
    currentFrame,
    setCurrentFrame,
    currentPanel,
    setCurrentPanel,
    pList,
    setpList,
    frames
  ] = useContext(FrameContext);


    const getPanElement=(i)=>{
        frames.map((item)=>{
            if(item.id == i) setCurrentPanel(item)
        });
        console.log(currentPanel)
      }

  
  const decodeChart = (elt) => {
    if (!elt) return;
    let blob=elt.chart
    if (typeof blob === "string") return blob;
    const { data } = blob;
    const img = new Buffer.from(data).toString("ascii");

    return img;
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
              <Modal.Title>{currentFrame.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-dark">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Screen Title"
                        onChange={(e) =>
                          setCurrentFrame({
                            ...currentFrame,
                            title: e.target.value,
                          })
                        }
                        name="title"
                        value={currentFrame.title}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Class</td>
                    <td>
                      <select
                        className="formselect"
                        value={currentFrame.class}
                        onChange={(e) => {
                          setCurrentFrame({ ...currentFrame, class: e.target.value });
                          console.log(e.target.value);
                        }}
                        name="class"
                        required
                      >
                        <option value="Perception">Perception</option>
                        <option value="Comprehension">Comprehension</option>
                        <option value="Projection">Projection</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>
                      <textarea
                        type="text"
                        placeholder="Description..."
                        value={currentFrame.description}
                        onChange={(e) =>
                          setCurrentFrame({
                            ...currentFrame,
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
