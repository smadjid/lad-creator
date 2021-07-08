import React, { useState } from "react";
import Chart from "./chart";
import Select from "react-select";
import "./indicator-chooser.css";

const IndicatorChooser = (props) => {
  const [objectives, setObjectives] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [indicatorClass, setIndicatorClass] = useState();
  const [objectiveValue, setObjectiveValue] = useState();
  const [indicatorValue, setIndicatorValue] = useState();
  const allIndicators = [
    {
      value: "ind_11_1",
      label: "Sites consulted by indicating the domain",
    },
    { value: "ind_11_2", label: "Time spent on a site " },
    { value: "ind_11_3", label: "Total time spent on the sites " },
    {
      value: "ind_11_4",
      label: "Percentage of site consultation in time ",
    },
    { value: "ind_11_5", label: "Used applications" },
    { value: "ind_11_6", label: "Time spent on an application" },
    { value: "ind_11_7", label: "Total time spent on applications" },
    {
      value: "ind_11_8",
      label:
        "Percentage of accessed applications in time, by application ",
    },
    { value: "ind_12_1", label: "Number of sites consulted" },
    { value: "ind_12_2", label: "Number of accesses to a site" },
    { value: "ind_12_3", label: "Total number of site accesses" },
    {
      value: "ind_12_4",
      label: "Percentage of SC in number of accesses",
    },
    { value: "ind_12_5", label: "Number of accesses to a domain" },
    { value: "ind_12_6", label: "Total number of accesses to a domain" },
    { value: "ind_12_7", label: "Percentage of SC in domain" },
    { value: "ind_12_8", label: "Number of applications consulted" },
    { value: "ind_12_9", label: "Number of accesses to an application" },
    { value: "ind_12_10", label: "Total number of application accesses" },
    {
      value: "ind_12_11",
      label: "Percentage of CA by number of accesses ",
    },
    {
      value: "ind_12_12",
      label: "Level of efficiency (fast, min resources, correct result)",
    },
    {
      value: "ind_12_13",
      label: "Type of media consulted (with extension) ",
    },
    {
      value: "ind_12_14",
      label: "List of consulted supports (doc, audio, video, image ...)",
    },
    { value: "ind_12_15", label: "Number of media consulted " },
    { value: "ind_12_16", label: "Number of accesses to a medium " },
    {
      value: "ind_12_17",
      label: "Total number of accesses to consulted materials",
    },
    {
      value: "ind_12_18",
      label: "Percentage of CDs in number of accesses",
    },
    { value: "ind_12_19", label: "Time by type" },
    { value: "ind_12_20", label: "Status of a site" },
    { value: "ind_12_21", label: "Number of blacklisted sites" },
    { value: "ind_12_22", label: "Number of certified/official sites" },
    { value: "ind_12_23", label: "Number of official tools" },
    {
      value: "ind_12_24",
      label: "Number of relevant educational applications",
    },
    {
      value: "ind_12_25",
      label: "Number of irrelevant educational applications",
    },
    { value: "ind_21_1", label: "Duration of the research" },
    { value: "ind_21_2", label: "Time spent on each step" },
    {
      value: "ind_21_3",
      label: "Time remaining before the end indicated by the teacher",
    },
    {
      value: "ind_21_4",
      label: "Time added after the end indicated by the teacher",
    },
    { value: "ind_21_5", label: "Time spent to get a correct result" },
    { value: "ind_21_6", label: "The research carried out" },
    {
      value: "ind_21_7",
      label: "Number of attempts to succeed in your search",
    },
    { value: "ind_21_8", label: "Level of efficiency" },
    { value: "ind_21_9", label: "Relevance of resources" },
    { value: "ind_21_10", label: "valueword relevance" },
    { value: "ind_21_11", label: "Relevance of results" },
    { value: "ind_21_12", label: "Status of the research carried out" },
    { value: "ind_21_13", label: "Research sequence" },
    {
      value: "ind_21_14",
      label: "Number of times a page is opened/closed",
    },
    { value: "ind_21_15", label: "Status of an activity" },
    { value: "ind_21_16", label: "List of information sources" },
    { value: "ind_21_17", label: "value words" },
    { value: "ind_21_18", label: "Number of valuewords" },
    { value: "ind_21_19", label: "Number of steps" },
    { value: "ind_21_20", label: "Error path to a source" },
    { value: "ind_21_21", label: "Number of route errors" },
    { value: "ind_21_22", label: "A source of information" },
    { value: "ind_21_23", label: "Cross-reference several sources" },
    { value: "ind_21_24", label: "Information capacity" },
    { value: "ind_31_1", label: "Indicator" },
    { value: "ind_31_2", label: "Indicator" },
    { value: "ind_31_3", label: "Indicator" },
    { value: "ind_31_4", label: "Indicator" },
    { value: "ind_31_5", label: "Indicator" },
    { value: "ind_31_6", label: "Indicator" },
    { value: "ind_31_7", label: "Indicator" },
    { value: "ind_31_8", label: "Indicator" },
    { value: "ind_32_1", label: "Indicator" },
    { value: "ind_32_2", label: "Indicator" },
    { value: "ind_32_3", label: "Indicator" },
    { value: "ind_32_4", label: "Indicator" },
    { value: "ind_32_5", label: "Indicator" },
    { value: "ind_32_6", label: "Indicator" },
    { value: "ind_32_7", label: "Indicator" },
    { value: "ind_32_8", label: "Indicator" },
    { value: "ind_33_1", label: "Indicator" },
    { value: "ind_33_2", label: "Indicator" },
    { value: "ind_33_3", label: "Indicator" },
    { value: "ind_33_4", label: "Indicator" },
    { value: "ind_33_5", label: "Indicator" },
    { value: "ind_33_6", label: "Indicator" },
    { value: "ind_33_7", label: "Indicator" },
    { value: "ind_33_8", label: "Indicator" },
    { value: "ind_41_1", label: "Indicator" },
    { value: "ind_41_2", label: "Indicator" },
    { value: "ind_41_3", label: "Indicator" },
    { value: "ind_41_4", label: "Indicator" },
    { value: "ind_41_5", label: "Indicator" },
    { value: "ind_41_6", label: "Indicator" },
    { value: "ind_41_7", label: "Indicator" },
    { value: "ind_41_8", label: "Indicator" },
    { value: "ind_42_1", label: "Indicator" },
    { value: "ind_42_2", label: "Indicator" },
    { value: "ind_42_3", label: "Indicator" },
    { value: "ind_42_4", label: "Indicator" },
    { value: "ind_42_5", label: "Indicator" },
    { value: "ind_42_6", label: "Indicator" },
    { value: "ind_42_7", label: "Indicator" },
    { value: "ind_42_8", label: "Indicator" },
  ];
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
    switch (e.label) {
      case "Relationship to Time":
        setIndicators([
          {
            value: "ind_11_1",
            label: "Sites consulted by indicating the domain",
          },
          { value: "ind_11_2", label: "Time spent on a site " },
          { value: "ind_11_3", label: "Total time spent on the sites " },
          {
            value: "ind_11_4",
            label: "Percentage of site consultation in time ",
          },
          { value: "ind_11_5", label: "Used applications" },
          { value: "ind_11_6", label: "Time spent on an application" },
          { value: "ind_11_7", label: "Total time spent on applications" },
          {
            value: "ind_11_8",
            label:
              "Percentage of accessed applications in time, by application ",
          },
        ]);
        break;
      case "Maximize the efficiency of document search processing (consultation)":
        setIndicators([
          { value: "ind_12_1", label: "Number of sites consulted" },
          { value: "ind_12_2", label: "Number of accesses to a site" },
          { value: "ind_12_3", label: "Total number of site accesses" },
          {
            value: "ind_12_4",
            label: "Percentage of SC in number of accesses",
          },
          { value: "ind_12_5", label: "Number of accesses to a domain" },
          { value: "ind_12_6", label: "Total number of accesses to a domain" },
          { value: "ind_12_7", label: "Percentage of SC in domain" },
          { value: "ind_12_8", label: "Number of applications consulted" },
          { value: "ind_12_9", label: "Number of accesses to an application" },
          { value: "ind_12_10", label: "Total number of application accesses" },
          {
            value: "ind_12_11",
            label: "Percentage of CA by number of accesses ",
          },
          {
            value: "ind_12_12",
            label: "Level of efficiency (fast, min resources, correct result)",
          },
          {
            value: "ind_12_13",
            label: "Type of media consulted (with extension) ",
          },
          {
            value: "ind_12_14",
            label: "List of consulted supports (doc, audio, video, image ...)",
          },
          { value: "ind_12_15", label: "Number of media consulted " },
          { value: "ind_12_16", label: "Number of accesses to a medium " },
          {
            value: "ind_12_17",
            label: "Total number of accesses to consulted materials",
          },
          {
            value: "ind_12_18",
            label: "Percentage of CDs in number of accesses",
          },
          { value: "ind_12_19", label: "Time by type" },
          { value: "ind_12_20", label: "Status of a site" },
          { value: "ind_12_21", label: "Number of blacklisted sites" },
          { value: "ind_12_22", label: "Number of certified/official sites" },
          { value: "ind_12_23", label: "Number of official tools" },
          {
            value: "ind_12_24",
            label: "Number of relevant educational applications",
          },
          {
            value: "ind_12_25",
            label: "Number of irrelevant educational applications",
          },
        ]);
        break;
      case "Maximize the relevance of the information search":
        setIndicators([
          { value: "ind_21_1", label: "Duration of the research" },
          { value: "ind_21_2", label: "Time spent on each step" },
          {
            value: "ind_21_3",
            label: "Time remaining before the end indicated by the teacher",
          },
          {
            value: "ind_21_4",
            label: "Time added after the end indicated by the teacher",
          },
          { value: "ind_21_5", label: "Time spent to get a correct result" },
          { value: "ind_21_6", label: "The research carried out" },
          {
            value: "ind_21_7",
            label: "Number of attempts to succeed in your search",
          },
          { value: "ind_21_8", label: "Level of efficiency" },
          { value: "ind_21_9", label: "Relevance of resources" },
          { value: "ind_21_10", label: "valueword relevance" },
          { value: "ind_21_11", label: "Relevance of results" },
          { value: "ind_21_12", label: "Status of the research carried out" },
          { value: "ind_21_13", label: "Research sequence" },
          {
            value: "ind_21_14",
            label: "Number of times a page is opened/closed",
          },
          { value: "ind_21_15", label: "Status of an activity" },
          { value: "ind_21_16", label: "List of information sources" },
          { value: "ind_21_17", label: "value words" },
          { value: "ind_21_18", label: "Number of valuewords" },
          { value: "ind_21_19", label: "Number of steps" },
          { value: "ind_21_20", label: "Error path to a source" },
          { value: "ind_21_21", label: "Number of route errors" },
          { value: "ind_21_22", label: "A source of information" },
          { value: "ind_21_23", label: "Cross-reference several sources" },
          { value: "ind_21_24", label: "Information capacity" },
        ]);
        break;
      case "To keep track of the student's activity":
        setIndicators([
          { value: "ind_31_1", label: "Indicator" },
          { value: "ind_31_2", label: "Indicator" },
          { value: "ind_31_3", label: "Indicator" },
          { value: "ind_31_4", label: "Indicator" },
          { value: "ind_31_5", label: "Indicator" },
          { value: "ind_31_6", label: "Indicator" },
          { value: "ind_31_7", label: "Indicator" },
          { value: "ind_31_8", label: "Indicator" },
        ]);
        break;
      case "Observance of instructions":
        setIndicators([
          { value: "ind_32_1", label: "Indicator" },
          { value: "ind_32_2", label: "Indicator" },
          { value: "ind_32_3", label: "Indicator" },
          { value: "ind_32_4", label: "Indicator" },
          { value: "ind_32_5", label: "Indicator" },
          { value: "ind_32_6", label: "Indicator" },
          { value: "ind_32_7", label: "Indicator" },
          { value: "ind_32_8", label: "Indicator" },
        ]);
        break;
      case "Safeguarding of productions":
        setIndicators([
          { value: "ind_33_1", label: "Indicator" },
          { value: "ind_33_2", label: "Indicator" },
          { value: "ind_33_3", label: "Indicator" },
          { value: "ind_33_4", label: "Indicator" },
          { value: "ind_33_5", label: "Indicator" },
          { value: "ind_33_6", label: "Indicator" },
          { value: "ind_33_7", label: "Indicator" },
          { value: "ind_33_8", label: "Indicator" },
        ]);
        break;
      case "Understanding of student behavior":
        setIndicators([
          { value: "ind_41_1", label: "Indicator" },
          { value: "ind_41_2", label: "Indicator" },
          { value: "ind_41_3", label: "Indicator" },
          { value: "ind_41_4", label: "Indicator" },
          { value: "ind_41_5", label: "Indicator" },
          { value: "ind_41_6", label: "Indicator" },
          { value: "ind_41_7", label: "Indicator" },
          { value: "ind_41_8", label: "Indicator" },
        ]);
        break;
      case "To improve thinking":
        setIndicators([
          { value: "ind_42_1", label: "Indicator" },
          { value: "ind_42_2", label: "Indicator" },
          { value: "ind_42_3", label: "Indicator" },
          { value: "ind_42_4", label: "Indicator" },
          { value: "ind_42_5", label: "Indicator" },
          { value: "ind_42_6", label: "Indicator" },
          { value: "ind_42_7", label: "Indicator" },
          { value: "ind_42_8", label: "Indicator" },
        ]);
        break;
      default:
        setIndicators(allIndicators);
    }
    setIndicatorValue(indicators[0]);
  };
  const handleIndicatorChange = (e) => {
    setIndicatorValue(e);
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
              placeholder="Search and/or select an appropriate indicator"
              options={allIndicators} />
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
              <option value="class_1">
                Monitoring the use of media and tools
              </option>
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
