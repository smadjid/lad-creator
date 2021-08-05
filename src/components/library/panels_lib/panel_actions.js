import "../library-view.css";
import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { PanelContext } from "../panels";
import Draggable from "react-draggable";

export const chartContext = React.createContext();

const Actions = (props) => {
  const [
    currentPanel,
    setCurrentPanel,
    currentIndicator,
    setCurrentIndicator,
    currentVisualization,
    setCurrentVisualization,
    indicators,
    visualizations,
  ] = useContext(PanelContext);



  const getIndElement=(i)=>{
    indicators.map((item)=>{
        if(item.id == i) setCurrentIndicator(item)
    })
  }
  const getVizElement=(i)=>{
    visualizations.map((item)=>{
        if(item.id == i) setCurrentVisualization(item)
    })
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
      {currentPanel === undefined ? (
        " "
      ) : (
        <Draggable>
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
              <Modal.Title>{currentPanel.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-dark">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Panel Title"
                        onChange={(e) =>
                          setCurrentPanel({
                            ...currentPanel,
                            title: e.target.value,
                          })
                        }
                        name="title"
                        value={currentPanel.title}
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
                        value={currentPanel.description}
                        onChange={(e) =>
                          setCurrentPanel({
                            ...currentPanel,
                            description: e.target.value,
                          })
                        }
                        name="description"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Indicator</td>
                    <td>
                      <select className="formselect" name="indicator" value={currentIndicator.id}
                      onChange={(e) => getIndElement(e.target.value)} required>
                        {indicators.map((item) => {
                          return <option value={item.id}>{item.title}</option>;
                        })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Visualization</td>
                    <td>
                      <select
                        className="formselect"
                        name="chart"
                        onChange={(e) => getVizElement(e.target.value)}
                        value={currentVisualization.id}
                        required
                      >
                        {visualizations.map((item) => {
                          return <option value={item.id}>{item.title}</option>;
                        })}
                      </select>
                      <td>
                        <div className="chart_box">
                          <img alt="Chart" src={decodeChart(currentVisualization)} />
                        </div>
                      </td>
                    </td>
                  </tr>
                  <tr>
                  <td>Request</td>
                  <td>
                  <textarea
                        type="text"
                        placeholder="SQL request..."
                        value={currentPanel.request}
                        onChange={(e) =>
                          setCurrentPanel({
                            ...currentPanel,
                            request: e.target.value,
                          })
                        }
                        name="request"
                        required
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
        </Draggable>
      )}
    </>
  );
};
export default Actions;
