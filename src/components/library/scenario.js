import "./library-view.css";
import React, { useState } from "react";
import axios from "axios";
import { Accordion, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddBoxRounded } from "@material-ui/icons";
import Actions from "./scenario_lib/scenario_actions";

export const ScenarioContext = React.createContext();
const Scenario = (props) => {
  const [currentFrame, setCurrentFrame] = useState();
  const [showModal, setShowModal] = useState(false);

  const scenarioContext = [currentFrame, setCurrentFrame];

  const CreateNewFrame = () => {
    const item = {
      title: "NewScreen",
      description: "Screen Description",
    };
    setCurrentFrame(item);
    // setCreationMode(true);
    setShowModal(true);

    return;
  };
  const handleModalSave = () => {
    setShowModal(false);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <ScenarioContext.Provider value={scenarioContext}>
      <Actions
        title="un titre"
        show={showModal}
        mode="Creation"
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
      <form className="new-scenario">
        <table className="table table-dark">
          <tbody>
            <tr>
              <td>
                <div className=" float-left">
                  <h6>Title of the scenario</h6>
                  <input
                    type="text"
                    placeholder="Decision Title"
                    name="title"
                  />
                </div>
              </td>
              <td>
                <h6>Class of decision</h6>
                <select
                  className="formselect"
                  placeholder="Class"
                  name="decision_class"
                >
                  <option value="1">Adaptation</option>
                  <option value="2">Evaluation</option>
                  <option value="3">Evolution</option>
                  <option value="4">Planification</option>
                  <option value="5">Remediation</option>
                  <option value="6">Monitoring</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <h6>Description</h6>
                <textarea
                  type="text"
                  placeholder="Description..."
                  name="decision_description"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <Accordion defaultActiveKey="0" className="frame-accordion">
        <Card className="frame-card">
          <Card.Header className="bg-dark text-white">
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <h5>Phase 1 - Perception of the situation</h5>
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div>
                <button
                  className="btn btn-outline-success"
                  onClick={CreateNewFrame}
                >
                  <AddBoxRounded /> &nbsp; Insert a screen
                </button>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card className="frame-card">
          <Card.Header className="bg-dark text-white">
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              <h5>Phase 2 - Understanding the situation</h5>
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <button
                className="btn btn-outline-success"
                onClick={CreateNewFrame}
              >
                <AddBoxRounded /> &nbsp; Insert a screen
              </button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card className=" frame-card">
          <Card.Header className="bg-dark text-white">
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              <h5>Phase 3 - Projection beyond the situation</h5>
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <button
                className="btn btn-outline-success"
                onClick={CreateNewFrame}
              >
                <AddBoxRounded /> &nbsp; Insert a screen
              </button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </ScenarioContext.Provider>
  );
};
export default Scenario;
