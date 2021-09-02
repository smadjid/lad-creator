import React, { useState, useContext } from "react";
import "./decision-description.css";
import { AppContext } from "../specification-wizard";
import { useForm } from "react-hook-form";

const DecisionDescription = (props) => {
  const { register, handleSubmit, reset } = useForm();

  const [ladContext, setLadContext] = useContext(AppContext);
  const [typeDecision, settypeDecision] = useState("Institutional LMS");
  const handletypeDecision = (e) => {
    settypeDecision(e.target.value);
  };
  const [institution, setInstitution] = useState("moodle");
  const handleInstitution = (e) => {
    setInstitution(e.target.value);
  };
  const updateLadContext = (e) => {
    setLadContext((prevState) => {
      return { ...prevState, title: e.target.value };
    });
  };

  return (
    <form className="row" novalidate>
      <div class="form-group  decision-meta col-7">
        <h3>Decision to be taken</h3>
        <panel>Provide a title for the situational decision</panel>
        <div class="input-group input-group-sm mb-3 decision-title">
          <span class="input-group-text" id="inputGroup-sizing-sm">
            Title
          </span>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            placeholder="A short title"
            value={ladContext.title}
            onChange={updateLadContext}
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div >
          <label for="country" className="form-label">
            Type of decision
          </label>
          <select
            className="form-select"
            id="country"
            placeholder="Your role"
            value={typeDecision}
            onChange={handletypeDecision}
            required
          >
            <option value="Strategic">Strategic decision</option>
            <option value="Tactical">Tactical decision</option>
            <option value="Operational">Operational decision</option>
          </select>

          <hr className="my-3" />
        </div>
        <panel>Provide a description of the situation and the decision</panel>
        <div class="input-group">
          <span class="input-group-text" placeholder="A concise description">
            Description
          </span>
          <textarea class="form-control" aria-label="With textarea"></textarea>
        </div>
      </div>

      <div className="col-5 ">
      
        <label for="stakeholder" className="form-label">
          The decision is based on the analysis of data that describe
        </label>
        <div class="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="student"
          />
          <label className="form-check-label" for="stakeHolders1">
            A specific student
          </label>
        </div>
        <div class="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="stakeHolders"
            id="stakeHolders2"
            value="class"
          />
          <label class="form-check-label" for="stakeHolders2">
            A class or a given groupe of learners
          </label>
        </div>
        <div className="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="stakeHolders"
            id="stakeHolders3"
            value="all"
          />
          <label className="form-check-label" for="stakeHolders3">
            All enroled learners
          </label>
        </div>
        <div className="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="stakeHolders"
            id="stakeHolders4"
            value="other"
          />
          <label className="form-check-label" for="stakeHolders3">
            Other !
          </label>
        </div>
        <hr className="my-3" />
      
        <label for="objective" className="form-label">
          The main target of the actions resulting from the decision is on
        </label>
        <div class="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="objective"
            id="objective1"
            value="student"
          />
          <label className="form-check-label" for="objective1">
            Person (learner/teacher/...): focused on the user and his profile
          </label>
        </div>
        <div class="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="objective"
            id="objective2"
            value="activity"
          />
          <label class="form-check-label" for="objective2">
            Activity: centered on the use of the elements of the course
          </label>
        </div>
        <div className="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name="objective"
            id="objective3"
            value="context"
          />
          <label className="form-check-label" for="objective3">
            Context: focused on the situation in which the user worked
          </label>
        </div>
        <div className="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name="objective"
            id="objective4"
            value="results"
          />
          <label className="form-check-label" for="objective4">
            Results: focused on grades or assessments
          </label>
        </div>
        <div className="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name="objective"
            id="objective5"
            value="content"
          />
          <label className="form-check-label" for="objective5">
            Content: focused on course resources and resources
          </label>
        </div>
        <div className="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name="objective"
            id="objective6"
            value="social"
          />
          <label className="form-check-label" for="objective6">
            Social: focused on forums and exchanges
          </label>
        </div>
        
      </div>
      
    </form>
  );
};
export default DecisionDescription;
