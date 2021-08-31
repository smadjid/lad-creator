import { FormControl, MenuItem, InputLabel, Select } from "@material-ui/core";
import React, { useState } from 'react';
import * as Icon from "react-bootstrap-icons";
import LibraryView from './library/library-view';
import "./main-dash.css";
import ModificationWizard from './specification/modification-wizard';

import SpecificationWizard from "./specification/specification-wizard";

export const CMainContext = React.createContext();


const MainDash=(props)=> {
  const [workspace, setWorkspace]=useState('at41');

  
  

  const craftLADComponent = () => {    
    return <SpecificationWizard workspace={workspace} onCloseWizard={()=>{
      setActiveStep(steps[0])
    }}/>;
  }

  const editLADComponent = () => {    
    return <ModificationWizard onCloseWizard={()=>{
      setActiveStep(steps[0])
    }}/>;
  }
  
  const libraryComponent = () => {    
    return <LibraryView workspace={workspace} onCloseWizard={()=>{
      setActiveStep(steps[0])
    }}/>;
  }
  
  const mainCard = () => {
    return (
      <div className='card card_box'>     
      
        <button type="button" className="button btn btn-outline-light btn-lg" onClick={libraryViewHandler}>
          <Icon.Collection />  &nbsp;&nbsp;|&nbsp;&nbsp; Manage the Library of the Workspace
        </button>
        <button type="button" className="button btn btn-outline-light btn-lg" onClick={specificationHandler}>
          <Icon.ShieldPlus />  &nbsp;&nbsp;|&nbsp;&nbsp; Craft a new LAD Specification
        </button>    
        <button type="button" className="button btn btn-outline-light btn-lg" onClick={modificationHandler}>
          <Icon.LayoutWtf />  &nbsp;&nbsp;|&nbsp;&nbsp; Edit an existing LAD Specification
        </button>
        
        <button type="button" className="button btn btn-outline-light btn-lg" onClick={loadGrafana}>
            <img src= {process.env.PUBLIC_URL+"/grafana.png"} width="30" height="30"/>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  Grafana Local Instance
        </button>
       </div>)
  } 

  const [steps, setSteps] = useState([
    { key: 'no', label: ' ',  component: mainCard },
    { key: 'specification', label: 'LAD Specification',  component: craftLADComponent },
    { key: 'modification', label: 'LAD Modification',  component: editLADComponent },
    { key: 'library', label: 'Library',  component: libraryComponent },
  ]);
  
  const [activeStep, setActiveStep] = useState(steps[0]);
  const specificationHandler=()=>{
    setActiveStep(steps[1]);
    return ;
  }

  const modificationHandler=()=>{
    setActiveStep(steps[2]);
    return ;
  }

  const libraryViewHandler=()=>{
    setActiveStep(steps[3]);
    return ;
  }

  const loadGrafana = () =>{
    window.location.href = "/grafana";
  }
  const handleWorkspace = (e) => {
    setWorkspace(e.target.value);
  };

  const cMainContext = [
    workspace, setWorkspace
  ];

  return (
    <CMainContext.Provider value={cMainContext}>
    {steps[0]===activeStep? 
    <FormControl variant="outlined"  className="bg-success" style={{width:"50%"}}>
        <InputLabel style={{ color: "white" }}>Use workspace</InputLabel>
        <Select
          style={{ color: "white" }}
                    labelId="usecase_data"
                    id="demo-controlled-open-select"
                    value={workspace}
                    onChange={handleWorkspace}
        >
          <MenuItem value="at41">AT 41</MenuItem>
          <MenuItem value="lada">LADA</MenuItem>
          <MenuItem value="new">NEW...</MenuItem>
        </Select>
      </FormControl> : ''}

    <div className="step-component">
          {activeStep.component()}
     </div>
    
     </CMainContext.Provider>
  );
}

export default MainDash;
