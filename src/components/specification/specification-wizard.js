import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";

import "./specification-wizard.css";
import ContextDescription from "./steps/context-description";
import DecisionDescription from "./steps/decision-description";
import IndicatorChooser from "./steps/indicator-chooser";
import FrameReference from "./steps/frame-reference"
import ComprehensionLevel from "./steps/comprehension-level";

const outlineComponent = () => {
  return <ContextDescription />;
};
const decisionComponent = () => {
    return <DecisionDescription />;
};
const mainFrameComponent = () => {
    return <FrameReference />;
};
const secondaryFrameComponent = () => {
  return <ComprehensionLevel />;
}
const finalComponent = () => {
  return <div>Final Component</div>;
};

function SpecificationWizard(props) {
  const [steps, setSteps] = useState([
    {
      key: "firstStep",
      label: "Use case outline",
      isDone: true,
      component: outlineComponent,
    },
    {
      key: "secondStep",
      label: "Decision context",
      isDone: true,
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
      key: "fifthStep",
      label: "Interface composition",
      isDone: false,
      component: finalComponent,
    },
    {
      key: "finalStep",
      label: "LAD config & generation",
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
    //alert("The steps of the processed are saved");
    props.onCloseWizard();
    return;
  };

  return (
    <div className="SpecificationWizard">
      <div className="box">
        <div className="steps">
          <ul className="nav">
            {steps.map((step, i) => {
              return (
                <li onClick={() => activateStep(i)}
                  key={i}
                  className={`${activeStep.key === step.key ? "active" : ""} ${
                    step.isDone ? "done" : ""
                  }`}
                >
                  <div>
                    {i + 1}. <span>{step.label}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="step-component">
          <div className="container-fluid row">
            <div className="col-md-8 col-lg-9">{activeStep.component()}</div>
            <div className="col-md-4 col-lg-3 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-secondary">Summary</span>
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Learning context</h6>
                    <small className="text-muted">learningContext</small>
                  </div>
                  <span className="text-muted">(X)</span>
                </li>

                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">User's role</h6>
                    <small className="text-muted">(not provided)</small>
                  </div>
                  <span className="text-muted">(X)</span>
                </li>

                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Analytics focus</h6>
                    <small className="text-muted">(not provided)</small>
                  </div>
                  <span className="text-muted">(X)</span>
                </li>

                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Use objective</h6>
                    <small className="text-muted">(not provided)</small>
                  </div>
                  <span className="text-muted">(X)</span>
                </li>
              </ul>
            </div>
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
                    : "Generate"
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
  );
}

export default SpecificationWizard;
