import "../library-view.css";
import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { IndicatorContext } from "../indicators";


const Actions = (props) => {
  const [element, setElement] = useContext(IndicatorContext);

  return (
    <>
      {element === undefined ? (
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
              <Modal.Title>{element.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-dark">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Indicator Title"
                        onChange={(e) =>
                          setElement({ ...element, title: e.target.value })
                        }
                        name="title"
                        value={element.title}
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
                        value={element.description}
                        onChange={(e) =>
                          setElement({
                            ...element,
                            description: e.target.value,
                          })
                        }
                        name="description"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Class</td>
                    <td>
                      <select
                        className="formselect"
                        value={element.class}
                        onChange={(e) => {
                          setElement({ ...element, class: e.target.value });
                          console.log(e.target.value);
                        }}
                        name="class"
                        required
                      >
                        <option value="Monitoring the use of media and tools">
                          Monitoring the use of media and tools
                        </option>
                        <option value="Monitoring Information Retrieval">
                          Monitoring Information Retrieval
                        </option>
                        <option value="Monitoring student activity">Monitoring student activity</option>
                        <option value="Monitoring student comprehension">
                          Monitoring student comprehension
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <input
                        className="btn btn-primary"
                        value="Submit"
                        type="submit"
                      />
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
