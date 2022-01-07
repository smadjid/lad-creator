import React, { useContext, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import {  OverlayTrigger, Popover } from "react-bootstrap";
import { AssignmentSharp } from "@material-ui/icons";

import "./specification-wizard.css";
import ContextDescription from "./steps/context-description";
import DecisionDescription from "./steps/decision-description";
import FramePerception from "./steps/frames/frame-perception";
import FrameComprehension from "./steps/frames/frame-comprehension";
import GenerateComponent from "./steps/generate-component";
import SpecificationActions from "./specification-actions";
import { Button, ButtonGroup } from "react-bootstrap";
import { CMainContext } from "../main-dash";



export const AppContext = React.createContext();

const outlineComponent = () => {
  return <ContextDescription />;
};
const decisionComponent = () => {
  return <DecisionDescription />;
};
const mainFrameComponent = () => {
  
  return (
    <div>
      <div class="form-group row">
        <h3>Screen supporting perception of the situation in hand</h3>
        <panel>
          Build the process that can help you build an accurate understanding of
          the situation at hand
        </panel>
        <hr className="my-1" />
      </div>
      <FramePerception />
    </div>
  );
  
};
const secondaryFrameComponent = () => {
  return (
    <div>
      <div class="form-group row">
        <h3>Fine-grained analysis of the situation</h3>
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

function SpecificationWizard(props) {  
  const [workspace, setWorkspace] = useContext(CMainContext);
  console.log(workspace)
  const [dashboardStructure, setDashboardStructure] = useState({
     id: 0, //important
      title: "LAD Title",
      description:"A LAD Specification",
      workspace:workspace,
      meta:{
        learnv:'Institutional LMS', 
        lms:'moodle',
        lmsdesc:'',
        role:'teacher',
        to:'',
        by:'',
      },
      mainFrame:  null,
      comprehensionFrames: [],
      frames: [],
      context: {}
    });

    const ladContext = [dashboardStructure, setDashboardStructure];

    const [showSpecList, setShowSpecList] = useState(true);

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
   /*  {
      key: "fifthStep",
      label: "Interface config",
      isDone: false,
      component: interfaceConfigComponent,
    }, */
    {
      key: "finalStep",
      label: "LAD Generation",
      isDone: false,
      component: finalComponent,
    },
  ]);

  const [activeStep, setActiveStep] = useState(steps[0]);

  const saveActiveStep = () => {
    console.log(activeStep.component);
  };
  const handleNext = () => {
    //window.scrollTo(0, 0);
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
    saveActiveStep(steps[index]);
    setActiveStep(steps[index + 1]);
  };

  const handleBack = () => {
    //window.scrollTo(0, 0);
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
    //window.scrollTo(0, 0);

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

  const loadSpecification = (specId) =>{
console.log(specId)
  }

  
  return ( 
    <AppContext.Provider value={ladContext}>
     {props.update?<SpecificationActions show={showSpecList}  onClose={()=>{setShowSpecList(false)}} onSave={(spec)=>{loadSpecification(spec)}}/>: ' '}
      <div className="SpecificationWizard h-100" >
     
        <div className="box h-100">
        
          <div className="steps">
            <ul className="nav cols col-11">
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
              <ButtonGroup style={{position:'absolute', right:'10px', display: "block", padding: 10 }}>
              
                <Button size='sm' variant='outline-light' onClick={handleBack}
                    disabled={steps[0].key === activeStep.key}><Icon.SkipBackwardCircle /> &nbsp;&nbsp;Back</Button>
                <Button size='sm' variant='outline-light' onClick={handleNext}>{steps[steps.length - 1].key !== activeStep.key
                      ? "Next    "
                      : "Generate"}{" "}
                    <Icon.SkipForwardCircle /></Button>
                <Button size='sm' variant='danger' onClick={handlClose}><Icon.XCircle /> &nbsp;&nbsp;Close</Button>
               </ButtonGroup>
            <div>
        
                </div>
            </ul>
          </div>
          <div className="step-component h-100">
            <div className="container-fluid h-100">
             <div className='d-flex justify-content-end'>
               
               <OverlayTrigger
                    placement="bottom"
                    rootCloseEvent="mousedown"
                    className='btn-outline-light'
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
                                  {dashboardStructure.title}
                                </small>
                              </div>
                              <span className="text-muted">(X)</span>
                            </li>
                            
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="my-0">Sample data</h6>
                                <small className="text-muted">
                                  {dashboardStructure.workspace}
                                </small>
                              </div>
                              <span className="text-muted">(X)</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="my-0">Reference Indicator</h6>
                                <small className="text-muted">
                                  {/* {dashboardStructure.mainFrame.indicator} */}
                                </small>
                              </div>
                              <span className="text-muted">(X)</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="my-0">
                                  Reference Screen graphic
                                </h6>
                                <small className="text-muted">
                                  {/* {dashboardStructure.mainFrame.graphic} */}
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
                    <span style={{textAlign:'right'}} role='button' >Summary<AssignmentSharp role='button' color='white'/></span>
                  </OverlayTrigger>
                  </div>
               
               
              <div >
              
                {activeStep.component()}
                <hr/>
              </div>
            </div>
            
          </div>

          
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default SpecificationWizard;
