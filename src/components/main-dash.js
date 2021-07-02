import React, { useState } from 'react';
import Card from "./card";
import * as Icon from "react-bootstrap-icons";
import styles from "./main-dash.module.css";

import SpecificationWizard from "./specification/specification-wizard";



function MainDash(props) {
  const firstComponent = () => {

    
    return <SpecificationWizard onCloseWizard={()=>{
      setActiveStep(steps[0])
    }}/>;
  }
  
  const mainCard = () => {
    return <Card >
    <button type="button" className="btn btn-outline-light btn-lg" onClick={specificationHandler}>
      <Icon.ShieldPlus />  &nbsp;&nbsp;|&nbsp;&nbsp; Craft a new LAD Specification
    </button>
    <button type="button" className="btn btn-outline-light btn-lg">
      <Icon.LayoutWtf />  &nbsp;&nbsp;|&nbsp;&nbsp; Open and edit an existing LAD specification
    </button>
    <button type="button" className="btn btn-outline-light btn-lg">
      <Icon.Collection />  &nbsp;&nbsp;|&nbsp;&nbsp; Explorer and manage the current Library
    </button>
    <button type="button" className="btn btn-outline-light btn-lg">
      <Icon.GearWideConnected />  &nbsp;&nbsp;|&nbsp;&nbsp;
      Specify and manage the creation rules
    </button>
  </Card>
  }

  const [steps, setSteps] = useState([
    { key: 'no', label: ' ', isActive: true, component: mainCard },
    { key: 'specification', label: 'LAD Specification', isActive: false, component: firstComponent },
  ]);
  
  const [activeStep, setActiveStep] = useState(steps[0]);
  const specificationHandler=()=>{
    setActiveStep(steps[1]);
    console.log(activeStep);
    return ;
  }
  return (
    <div>
    
    <div className="step-component">
          {activeStep.component()}
     </div>
    
    </div>
  );
}

export default MainDash;
