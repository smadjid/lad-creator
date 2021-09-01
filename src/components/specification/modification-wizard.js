import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";

import "./specification-wizard.css";
import ContextDescription from "./steps/context-description";
import DecisionDescription from "./steps/decision-description";
import FramePerception from "./steps/frames/frame-perception";
import FrameComprehension from "./steps/frames/frame-comprehension";
import GenerateComponent from "./steps/generate-component";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { AssignmentSharp, Bookmarks } from "@material-ui/icons";
import SpecificationActions from "./specification-actions";

export const GlobalInterfaceContext = React.createContext();

export const AppContext = React.createContext();

const outlineComponent = () => {
  return <ContextDescription />;
};
const decisionComponent = () => {
  return <DecisionDescription />;
};
const mainFrameComponent = () => {
  return <FramePerception />;
};
const secondaryFrameComponent = () => {
  return (
    <div>
      <div class="form-group row">
        <h3>Fine-grainded analysis of the situation</h3>
        <panel>
          Build the process that can help you build an accurate understanding of
          the situation at hand
        </panel>
        <hr className="my-1" />
      </div>
      <FrameComprehension />
    </div>
  );
};


const finalComponent = () => {
  return <GenerateComponent />;
};

function ModificationWizard(props) {
  const [globalLayout, setGlobalLayout] = useState([{id: 0, layout:[]}]);
  const [dashboardID,setDashboardID]=useState(null);

  const [dashboardStructure, setDashboardStructure] = useState({
    Title: "LAD Title",
    mainFrame: { indicator: "Indicator", graphic: "Graph" },
    comprehensionFrames: [],
    context: {},
    metaLAD: { title: "LAD Title", version: 0.1 },
  });

  
  const [steps, setSteps] = useState([
    {
      key: "firstStep",
      label: "Use case outline",
      isDone: false,
      component: outlineComponent,
    },
    {
      key: "secondStep",
      label: "Decision context",
      isDone: false,
      component: decisionComponent,
    },
    {
      key: "thirdStep",
      label: "Situation perception",
      isDone: false,
      component: mainFrameComponent,
    },
    {
      key: "forthStep",
      label: "Fine-grained analysis",
      isDone: false,
      component: secondaryFrameComponent,
    },
    {
      key: "finalStep",
      label: "LAD Generation",
      isDone: false,
      component: finalComponent,
    },
  ]);

  const [activeStep, setActiveStep] = useState(steps[0]);

  
  
  const handleNext = () => {
    window.scrollTo(0, 0);
    if (steps[steps.length - 1].key === activeStep.key) {
      alert("You have completed the generation process...");
      return;
    }
    const index = steps.findIndex((x) => x.key === activeStep.key);
    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = true;
        return x;
      })
    );
    
    setActiveStep(steps[index + 1]);
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index === 0) return;

    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = false;
        return x;
      })
    );
    setActiveStep(steps[index - 1]);
  };

  const activateStep = (i) => {
    window.scrollTo(0, 0);

    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = false;
        return x;
      })
    );
    setActiveStep(steps[i]);
  };

  const handlClose = () => {
    props.onCloseWizard();
    return;
  };

  const ladContext = [dashboardStructure, setDashboardStructure];

  return(<SpecificationActions show={true}/>);

  return(<h3>No Dashboard found!</h3>);
  return (
    <AppContext.Provider value={ladContext}>
      <div className="SpecificationWizard">
        <div className="box">
          <div className="steps">
            <ul className="nav">
              {steps.map((step, i) => {
                return (
                  <li
                    onClick={() => activateStep(i)}
                    key={i}
                    className={`${
                      activeStep.key === step.key ? "active" : ""
                    } ${step.isDone ? "done" : ""}`}
                  >
                    <div>
                      {i + 1}. <span>{step.label}</span>
                    </div>
                  </li>
                );
              })}
              
              <div style={{position:'absolute', right:'10px', display: "block", padding: 10 }}>
                  <OverlayTrigger
                    placement="bottom"
                    rootCloseEvent="mousedown"
                    trigger="click"
                    overlay={
                      <Popover>
                        <Popover.Title as="h3"></Popover.Title>
                        <Popover.Content>
                          <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="my-0">Dashboard Title</h6>
                                <small className="text-muted">
                                  {dashboardStructure.Title}
                                </small>
                              </div>
                              <span className="text-muted">(X)</span>
                            </li>
                            
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="my-0">Sample data</h6>
                                <small className="text-muted">
                                  {dashboardStructure.Sample}
                                </small>
                              </div>
                              <span className="text-muted">(X)</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="my-0">Reference Indicator</h6>
                                <small className="text-muted">
                                  {dashboardStructure.mainFrame.indicator}
                                </small>
                              </div>
                              <span className="text-muted">(X)</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="my-0">
                                  Reference Frame graphic
                                </h6>
                                <small className="text-muted">
                                  {dashboardStructure.mainFrame.graphic}
                                </small>
                              </div>
                              <span className="text-muted">(X)</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="my-0">
                                  # Comprehension Frames (
                                  {
                                    dashboardStructure.comprehensionFrames
                                      .length
                                  }
                                  )
                                </h6>
                                <small className="text-muted">
                                  <ol>
                                    {dashboardStructure.comprehensionFrames.map(
                                      (f) => {
                                        return (
                                          <li>
                                            {f.framename} ({f.type})
                                          </li>
                                        );
                                      }
                                    )}
                                  </ol>
                                </small>
                              </div>
                              <span className="text-muted">(X)</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="my-0">Use objective</h6>
                                <small className="text-muted">
                                  (not provided)
                                </small>
                              </div>
                              <span className="text-muted">(X)</span>
                            </li>
                          </ul>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    
                    <AssignmentSharp role='button'/>
                  </OverlayTrigger>
                </div>
            </ul>
          </div>
          <div className="step-component">
            <div className="container-fluid row">
              {activeStep.component()}

               
               
            </div>
          </div>

          <div className="specification-footer">
            <div className="btn-component">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={handlClose}
              >
                <Icon.XCircle /> &nbsp;&nbsp;Close wizard
              </button>

              <div className="btn-component">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={handleBack}
                  disabled={steps[0].key === activeStep.key}
                >
                  <Icon.SkipBackwardCircle /> &nbsp;&nbsp;Back
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light"
                  value={
                    steps[steps.length - 1].key !== activeStep.key
                      ? "Next    "
                      : "Close"
                  }
                  onClick={handleNext}
                >
                  &nbsp;&nbsp;
                  {steps[steps.length - 1].key !== activeStep.key
                    ? "Next    "
                    : "Generate"}{" "}
                  <Icon.SkipForwardCircle />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default ModificationWizard;