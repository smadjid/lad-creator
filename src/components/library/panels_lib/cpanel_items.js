import "../library-view.css";
import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { CPanelContext } from "../cpanels";

export const chartContext = React.createContext();

const CPanelItem = (props) => {
  console.log('HHHH props : ');  console.log(props);
  const [
    currentCPanel,
    setCurrentCPanel,
    currentPanel,
    setCurrentPanel,
    pList,
    setpList,
    panels,
    visualizations,
    indicators,
  ] = useContext(CPanelContext);


  const getPanElement = (i) => {
    panels.map((item) => {
      if (item.id == i) 
        setCurrentPanel(item);
        
    });
    //console.log(currentPanel)
  };

  const getVizElement = () => {
    let res = {
      title: " ",
      description: " ",
      chart: null,
    };
    if (!currentPanel) return res;
    visualizations.map((item) => {
      if (item.id == currentPanel.visualization_id) res = item;
    });
    let elt = visualizations.find((item) => item.id === currentPanel.visualization_id);
    //setCurrentVisualization(res);
    return res;
  };

  const getIndElement = () => {
    let res = {
      title: " ",
      description: " ",
    };
    if (!currentPanel) return res;
    indicators.map((item) => {
      if (item.id == currentPanel.indicator_id) res = item;
    });
    //setCurrentIndicator(res);
    return res;
  };

  const decodeChart = (elt) => {
    if (!elt) return;
    let blob = elt.chart;
    if (!blob) return;
    if (typeof blob === "string") return blob;
    const { data } = blob;
    const img = new Buffer.from(data).toString("ascii");

    return img;
  };

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
            <table className="table table-dark cpanel-tab">
              <tbody>
                <tr>
                  <td>
                    <b>Select a panel from to insert</b> 
                  </td>
                  <td>
                    <select
                      className="formselect"
                      name="panel"
                      onChange={(e) => getPanElement(e.target.value)}
                    >
                      {panels.filter((i)=>i.ws_id===props.ws_id).map((item) => {
                        return <option value={item.id}>{item.title}</option>;
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    Description : <i>{currentPanel? currentPanel.description:''}</i>
                  </td>
                </tr>
                <tr>
                  <td>
                    Associated indicator : <b>{getIndElement().title}</b> <br />
                    <i>{getIndElement().description}</i>
                  </td>
                  <td>
                    Associated visualization : <b>{getVizElement().title}</b>{" "}
                    <br />
                    <div className="chart_box">
                      <img alt="Chart" src={decodeChart(getVizElement())}  />
                      {/* <span >{getVizElement().description}</span> */}
                    </div>
                    
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
              onClick={()=>props.onSave()}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
export default CPanelItem;
