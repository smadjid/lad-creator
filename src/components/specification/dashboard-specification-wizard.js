import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import StepZilla from "react-stepzilla";

import ContextDescription from "./steps/context-description";
import DecisionDescription from "./steps/decision-description";
import IndicatorChooser from "./steps/indicator-chooser";
import FrameReference from "./steps/frame-reference"
import ComprehensionLevel from "./steps/comprehension-level";
import GenerateComponent from "./steps/generate-component";
import dash from "../../data/template_dash.json";

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
};

const ladConfigComponent = () => {
  return <div />;
};
const finalComponent = () => {
  return <GenerateComponent />;
};

function DashboardSpecificationWizard(props) {
  
  const wsteps =
    [
      {name: 'Step 1', component: <ContextDescription />},
      {name: 'Step 2', component: <DecisionDescription />},
      {name: 'Step 3', component: <FrameReference />}
    ]
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
      component: ladConfigComponent,
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
    props.onCloseWizard();
    return;
  };

  return (
    <div>
    <div className='step-progress'>
        <StepZilla steps={wsteps} />
    </div>
    </div>
  );
}

export default DashboardSpecificationWizard;
