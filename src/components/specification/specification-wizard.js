import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";

import "./specification-wizard.css";
import ContextDescription from "./steps/context-description";

const firstComponent = () => {
  return <ContextDescription />;
};
const secondComponent = () => {
  return <div>Second Component</div>;
};
const thirdComponent = () => {
  return <div>Third Component</div>;
};
const finalComponent = () => {
  return <div>Final Component</div>;
};

function SpecificationWizard(props) {
  const [steps, setSteps] = useState([
    {
      key: "firstStep",
      label: "Use context",
      isDone: true,
      component: firstComponent,
    },
    {
      key: "secondStep",
      label: "Triggers and elements of interest",
      isDone: false,
      component: secondComponent,
    },
    {
      key: "thirdStep",
      label: "Fine-grained situation analysis",
      isDone: false,
      component: thirdComponent,
    },
    {
      key: "forthStep",
      label: "Tuning and complementary analysis",
      isDone: false,
      component: finalComponent,
    },
    {
      key: "finalStep",
      label: "Final configurations",
      isDone: false,
      component: finalComponent,
    },
  ]);

  const [activeStep, setActiveStep] = useState(steps[0]);

  const handleNext = () => {
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
                <li
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
        <div className="step-component">{activeStep.component()}</div>

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
                    ? "Next"
                    : "Submit"
                }
                onClick={handleNext}
              >
                &nbsp;&nbsp;
                {steps[steps.length - 1].key !== activeStep.key
                  ? "Next"
                  : "Submit"}{" "}
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
