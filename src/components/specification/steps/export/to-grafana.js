import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "axios";
import { AppContext } from "../../specification-wizard";

const ToGrafana = (props) => {
  const [ladContext, setLadContext] = useContext(AppContext);
  // curl -H "Authorization: Bearer eyJrIjoiMjBJckFNWUwydTBhaFRyN1hjQThVWTRHUTZTSUlyMW0iLCJuIjoibGFkc3R1ZGlvIiwiaWQiOjF9" http://localhost/api/dashboards/home
  // local key
  const [instanceKey, setInstanceKey] = useState(
   // "eyJrIjoieHFYemhpZk1vQTRnaXVYY0NRRFVLYmhCTGdKdWprVEEiLCJuIjoiayIsImlkIjoxfQ=="
  );
  // PADLAD key
  
  const [instanceURL, setInstanceURL] = useState("http://localhost");
  const [queryStatus, setQueryStatus] = useState("Ready");
  const [dashboardURL, setDashboardURL] = useState();
  const [successResult, setSuccessResult] = useState(false);

  
  const sendRequest = () => {
    console.log(ladContext);
    let dashboard = {
      dashboard: props.data,
    };
    dashboard.dashboard.title = ladContext.title;

    dashboard = JSON.stringify(dashboard);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + instanceKey,
    };

    axios
      .post(instanceURL + "/api/dashboards/db", dashboard, { headers })
      .then((res) => {
        setDashboardURL(instanceURL + res.data.url);
        setQueryStatus(
          "The dashboard is generated and integrated successfully"
        );
        setSuccessResult(true);
        console.log(res);
      })
      .catch(function (error) {
        console.log(error.message);
        setSuccessResult(false);
        setQueryStatus(error.message);
      })
      .then(function () {
        //console.log(res)
      });
  };
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
        <Modal.Title>Insert into a Grafana Instance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-dark">
          <tbody>
            <tr>
              <td>Dashboard Title</td>
              <td>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={ladContext.title}
                  onChange={(v) => {
                    setLadContext((prevState) => {
                      return { ...prevState, title: v.data };
                    });
                  }}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Instance URL</td>
              <td>
                <input
                  type="text"
                  placeholder="URL"
                  name="url"
                  value={instanceURL}
                  onChange={(v) => {
                    setInstanceURL(v.data);
                  }}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Authorization Key</td>
              <td>
                <input
                  type="text"
                  placeholder="Key (without Bearer)"
                  name="auth_key"
                  value={instanceKey}
                  onChange={(v) => {
                    setInstanceKey(v.data);
                  }}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <span className="text-info">Status: </span>
        <span className="text-primary">{queryStatus}</span>
        <br />
        {successResult ? (
          <a className="text-success" target="_blank" href={dashboardURL}>
            Open the generated dashboard in Grafana
          </a>
        ) : (
          ""
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={props.handleHide}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          variant="secondary"
          onClick={sendRequest}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ToGrafana;
