import React, { useState } from 'react';
import * as Icon from "react-bootstrap-icons";
import LibraryView from './library/library-view';
import "./main-dash.css";

import SpecificationWizard from "./specification/specification-wizard";



function MainDash(props) {
  const craftLADComponent = () => {    
    return <SpecificationWizard onCloseWizard={()=>{
      setActiveStep(steps[0])
    }}/>;
  }
  
  const libraryComponent = () => {    
    return <LibraryView onCloseWizard={()=>{
      setActiveStep(steps[0])
    }}/>;
  }

  const mainCard = () => {
    return <div className='card card_box'>
    <button type="button" className="button btn btn-outline-light btn-lg" onClick={specificationHandler}>
      <Icon.ShieldPlus />  &nbsp;&nbsp;|&nbsp;&nbsp; Craft a new LAD Specification
    </button>    
    <button type="button" className="button btn btn-outline-light btn-lg" onClick={libraryViewHandler}>
      <Icon.Collection />  &nbsp;&nbsp;|&nbsp;&nbsp; Explore and manage the current Library
    </button>
    <button type="button" className="button btn btn-outline-light btn-lg">
      <Icon.LayoutWtf />  &nbsp;&nbsp;|&nbsp;&nbsp; Open and edit an existing LAD specification
    </button>
    <button type="button" className="button btn btn-outline-light btn-lg">
      <Icon.GearWideConnected />  &nbsp;&nbsp;|&nbsp;&nbsp;
      Specify and manage the creation rules
    </button>
  </div>
  } 

  const [steps, setSteps] = useState([
    { key: 'no', label: ' ', isActive: true, component: mainCard },
    { key: 'specification', label: 'LAD Specification', isActive: false, component: craftLADComponent },
    { key: 'modification', label: 'LAD Modification', isActive: false, component: craftLADComponent },
    { key: 'library', label: 'Library', isActive: false, component: libraryComponent },
  ]);
  
  const [activeStep, setActiveStep] = useState(steps[0]);
  const specificationHandler=()=>{
    setActiveStep(steps[1]);
    return ;
  }

  const libraryViewHandler=()=>{
    setActiveStep(steps[3]);
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
