import React, { useState } from "react";
import Chart from "../steps/chart";
import Select from "react-select";
import "./frame-indicator.css";
import FrameComprehension from "../steps/frames/frame-comprehension";
import { Accordion, Card } from "react-bootstrap";

const FrameIndicator = (props) => {
  const [objectives, setObjectives] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [objectiveValue, setObjectiveValue] = useState();
  const [indicatorValue, setIndicatorValue] = useState();
  const [position, setPosition] = useState("right");
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
      label: "Percentage of accessed applications in time, by application ",
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
  const handlePositionChange = (e) => {
    setPosition(e.target.options[e.target.selectedIndex].value);
  };
  const [frameCollapsed, setFrameCollapsed] = useState(false);
  return (
    <div className="row card text-dark ">
      <div class="frame_header">
        <h5>
          {" "}
          <span class="badge bg-success">
            <i>{props.type} Screen</i>
          </span>
          <b> {props.framename}</b> 
        </h5>
        <div>
          <span
            className="btn btn-sm btn-outline-primary "
            onClick={() => setFrameCollapsed(!frameCollapsed)}
          >
            {`${frameCollapsed ? "Show" : "Hide"} `}
          </span>
          &nbsp;
          <span
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              console.log("NOT IMPLEMENTED");
              props.onDelete(props.id);
            }}
          >
            Delete
          </span>
        </div>
      </div>
      <div className={`${frameCollapsed ? "collapse" : ""} row`}>
        <div className="col-md-7 card-body">
          <div className="card">
            <Card className="transition-config">
              <Card.Header className="dark-white">
                <h5>Indicator and visualization </h5>
              </Card.Header>
              <Card.Body>
                <h5>Search and select an appropriate indicator </h5>
                <div className="form-group has-search">
                  <Select
                    isSearchable
                    className="selectItem"
                    placeholder="Search and/or select an appropriate indicator"
                    options={allIndicators}
                  />
                </div>
                <hr />
                <h5>Select a suitable visualisation</h5>
                <div>
                  <Chart />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        <Card className="col-md-5 bg-light transition-config">
          <Card.Header className="dark-white">
            <h5>Transition config </h5>
          </Card.Header>
          <Card.Body>
            <div>
              <Card className=" text-dark bg-light mb-3">
                <Card.Header>Transition from the reference screen</Card.Header>

                <Card.Body>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="select_relation1"
                    />
                    <label class="form-check-label" for="select_relation1">
                    On click 
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="select_relation2"
                    />
                    <label class="form-check-label" for="select_relation2">
                    On hover 
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="select_relation3"
                    />
                    <label class="form-check-label" for="select_relation3">
                    Simultaneous display
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="select_relation1"
                    />
                    <label class="form-check-label" for="select_relation1">
                    (Other)
                    </label>
                  </div>

                  
                  <small className="form-text text-muted">
                    Short description of the slected item
                  </small>
                </Card.Body>
              </Card>

              <Card className="text-dark bg-light mb-3">
                <Card.Header>Position of the screen</Card.Header>

                <Card.Body>
                  <select
                    className="form-control"
                    id="select_relation"
                    onChange={handlePositionChange}
                    value={position}
                  >
                    <option value="right">Right of the reference screen</option>
                    <option value="left">Left of the reference screen</option>
                    <option value="above">Above of the reference screen</option>
                    <option value="below">
                      Under of the reference screen
                    </option>
                    <option value="on">Replace the reference screen</option>
                  </select>
                  <small className="form-text text-muted">
                    Short description of the slected item
                  </small>
                  <img
                    className="chart_box-image"
                    src={
                      process.env.PUBLIC_URL +
                      "/charts/position_" +
                      position +
                      ".png"
                    }
                  />
                </Card.Body>
              </Card>
            </div>
          </Card.Body>
        </Card>
        <FrameComprehension />
      </div>
    </div>
  );
};
export default FrameIndicator;
