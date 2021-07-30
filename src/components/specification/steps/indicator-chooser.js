import React, { useState } from "react";
import Chart from "./frames/chart-component";
import Select from "react-select";
import "./indicator-chooser.css";
import indicators_list from "../../../data/indicators.json"

const IndicatorChooser = (props) => {
  const [objectives, setObjectives] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [indicatorClass, setIndicatorClass] = useState();
  const [objectiveValue, setObjectiveValue] = useState();
  const [indicatorValue, setIndicatorValue] = useState();
  
  const handleClasseChange = (e) => {
    switch (e.value) {
      case "class_1":
        setObjectives([
          { value: "obj1_1", label: "Relationship to Time" },
          {
            value: "obj1_2",
            label:
              "Maximize the efficiency of document search processing (consultation)",
          },
        ]);
        break;
      case "class_2":
        setObjectives([
          {
            value: "obj2_1",
            label: "Maximize the relevance of the information search",
          },
        ]);
        break;
      case "class_3":
        setObjectives([
          { value: "obj3_1", label: "To keep track of the student's activity" },
          { value: "obj3_2", label: "Observance of instructions" },
          { value: "obj3_3", label: "Safeguarding of productions" },
        ]);
        break;
      case "class_4":
        setObjectives([
          { value: "obj4_1", label: "Understanding of student behavior" },
          { value: "obj4_2", label: "To improve thinking" },
        ]);
    }
    setObjectiveValue(objectives[0]);
    
  };

  const handleObjectiveChange = (e) => {
    setObjectiveValue(e);
    let selectedObjective_indicators=[] ;

    switch (e.label) {
      case "Relationship to Time":
       indicators_list.map((ind)=>{
          if(ind.value.startsWith('ind_11_')) selectedObjective_indicators.push(ind);
        });

        break;
      case "Maximize the efficiency of document search processing (consultation)":
        indicators_list.map((ind)=>{
          if(ind.value.startsWith('ind_12_')) selectedObjective_indicators.push(ind);
        });
        break;
      case "Maximize the relevance of the information search":
        indicators_list.map((ind)=>{
          if(ind.value.startsWith('ind_21_')) selectedObjective_indicators.push(ind);
        });
        break;
      case "To keep track of the student's activity":
        indicators_list.map((ind)=>{
          if(ind.value.startsWith('ind_31_')) selectedObjective_indicators.push(ind);
        });
        break;
      case "Observance of instructions":
        indicators_list.map((ind)=>{
          if(ind.value.startsWith('ind_32_')) selectedObjective_indicators.push(ind);
        });
        break;
      case "Safeguarding of productions":
        indicators_list.map((ind)=>{
          if(ind.value.startsWith('ind_33_')) selectedObjective_indicators.push(ind);
        });
        break;
      case "Understanding of student behavior":
        indicators_list.map((ind)=>{
          if(ind.value.startsWith('ind_41_')) selectedObjective_indicators.push(ind);
        });
        break;
      case "To improve thinking":
        indicators_list.map((ind)=>{
          if(ind.value.startsWith('ind_42_')) selectedObjective_indicators.push(ind);
        });
        break;
      default:
        selectedObjective_indicators=indicators_list;
    }
    setIndicators(selectedObjective_indicators);
    setIndicatorValue(indicators[0]);
    
  };
  const handleIndicatorChange = (e) => {
    setIndicatorValue(e);
    props.onUpdate(e.label);
  };

  return (
      
        <form className="needs-validation" noValidate>
          <input
              className="form-check-input"
              type="radio"
              name="selectionOption"
              id="selectionOption"
              value="direct"
            />
            <label className="form-check-label" for="indSelectionOption"> <h5>&nbsp;  Search and select the appropriate indicator </h5></label>
          
          <div className="form-group has-search" >
            <Select 
            isSearchable
              className="selectItem"
              value={indicatorValue}
              onChange={handleIndicatorChange}
              placeholder="Search and/or select an appropriate indicator"
              options={indicators_list} />
          </div>
          <h5>
            |<br />
            OR
            <br />|
          </h5>
          
          <input
              className="form-check-input"
              type="radio"
              name="selectionOption"
              id="indSelectionOption"
              value="indirect"
            />
            <label className="form-check-label" for="indSelectionOption"><h5>&nbsp;  Select a class, an objective to filter the available indicators</h5></label>
            
          <div className="row">
            <label for="role" className="form-label">
              Class of the indicator
            </label>
            <Select
              isSearchable
              className="selectItem"
              placeholder="Select an appropriate class"
              onChange={handleClasseChange}
              value={indicatorClass}
              options={[
                {
                  value: "class_1",
                  label: "Monitoring the use of media and tools",
                },
                { value: "class_2", label: "Monitoring Information Retrieval" },
                { value: "class_3", label: "Monitoring of student activity" },
                { value: "class_4", label: "Monitoring comprehension" },
              ]}
            >
              <option value="class_1">Monitoring the use of media and tools</option>
              <option value="class_2">Monitoring Information Retrieval</option>
              <option value="class_3">Monitoring of student activity</option>
              <option value="class_4">Monitoring comprehension</option>
            </Select>

            <label for="objective" className="form-label">
              Objective of the indicator
            </label>
            <Select
              id="objective"
              value={objectiveValue}
              onChange={handleObjectiveChange}
              className="selectItem"
              options={objectives}
            />

            <label for="name" className="form-label">
              Name of the indicator
            </label>
            <Select
              className="selectItem"
              placeholder="Select an indicator..."
              value={indicatorValue}
              onChange={handleIndicatorChange}
              options={indicators}
            />
            <hr className="my-3" />
          </div>
        </form>
  );
};
export default IndicatorChooser;