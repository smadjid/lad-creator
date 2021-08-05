import React, { useState, useContext } from "react";
import { AppContext } from "../specification-wizard";

const ContextDescription = (props) => {
  const [ladContext, setLadContext] = useContext(AppContext);
  

  const [learningContext, setLearningContext] = useState("Institutional LMS");
  const handleLearningContext = (e) => {
    setLearningContext(e.target.value);
  };

  const [dataSample, setDataSample] = useState("at41");
  const handleDataSample = (e) => {
    setDataSample(e.target.value);
    setLadContext((prevState) => {
      return { ...prevState, Sample:e.target.value };
    });
  };
  const [institution, setInstitution] = useState("moodle");
  const handleInstitution = (e) => {
    setInstitution(e.target.value);
  };

  const displayDetails = () => {
    switch (learningContext) {
      case "Institutional LMS":
        return (
          <select
            className="form-select"
            id="country"
            placeholder="Your role"
            value={institution}
            onChange={handleInstitution}
            required
          >
            <option value="moodle">Moodle</option>
            <option value="mindflash">Mindflash</option>
            <option value="blackboard">Blackboard</option>
            <option value="joomla">Joomla LMS</option>
            <option value="canva">Canvas</option>
            <option value="captiva">Adobe Captivate Prime LMS</option>
            <option value="docebo">Docebo</option>
            <option value="skyprep">SkyPrep</option>
            <option value="knowmax">Knowmax</option>
            <option value="proprofs">ProProfs LMS</option>
            <option value="ispring">iSpring Learn</option>
            <option value="talent">TalentLMS</option>
            <option value="litmos">Litmos</option>
            <option value="edmodo">Edmodo</option>
            <option value="brightspace">Brightspace</option>
            <option value="absorb">Absorb LMS</option>
            <option value="schoology">Schoology</option>
            <option value="efront">eFront</option>
            <option value="other">Other</option>
          </select>
        );
      default:
        return (
          <textarea
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Provide a short description"
            value="" 
          ></textarea>
        );
    }
  };

  return (
    
      <form className="needs-validation" novalidate>
        <div class="form-group row">
          <h3>Learning context</h3>
          <panel>Decsribe the learning context and your role within</panel>
          <hr className="my-1" />
        </div>
        <div className="col-md-3 mt-2 ">
        <label for="country" className="form-label">
            Sample Data for this Dashboard
          </label>
          <select
            className="form-select"
            id="sample"
            placeholder="Data sample"
            value={dataSample}
            onChange={handleDataSample}
            required
          >
            <option value="at41">AT 41</option>
            <option value="lada">LADA</option>
          </select>
        </div>

        <div className="col-md-8 mt-2 ">
          <label for="country" className="form-label">
            Type of learning environment
          </label>
          <select
            className="form-select"
            id="country"
            placeholder="Your role"
            value={learningContext}
            onChange={handleLearningContext}
            required
          >
            <option value="Institutional LMS">Institutional LMS</option>
            <option value="Distant Class">Distant Class</option>
            <option value="face-to-face">Face-to-face Class</option>
            <option value="hybrid">Hybrid class</option>
            <option value="mooc">MOOC</option>
            <option value="other">Other</option>
          </select>
          <div className="invalid-feedback">Please select a valid type.</div>
          <div className="col-sm-10">
            <label for="firstName" className="form-label">
              Environment details
            </label>
            {displayDetails()}
          </div>

          <hr className="my-3" />
        </div>

        <div className="col-md-8 g-3">
          <label for="role" className="form-label">
            Your role within the learning context
          </label>
          <select
            className="form-select"
            id="role"
            placeholder="Your role"
            required
          >
            <option value="teacher">Teacher - (in charge of the course)</option>
            <option value="tutor">Tutor - (...)</option>
            <option value="learner">Learner - (...)</option>
            <option value="manager">Manager - (...)</option>
            <option value="manager">Extern/Researcher - (...)</option>
            <option value="other">Other</option>
          </select>
          <div className="col-sm-10">
            <label>Complementary information about your role</label>
            <textarea
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Provide a short description"
              value=""
            ></textarea>
          </div>
        </div>
        <hr className="my-4" />
        <div class="form-group row">
          <h3>Dashboard use context</h3>
          <panel>
            Decsribe the context where the dashoard is meant to be used
          </panel>
          <hr className="my-1" />
        </div>

        <div className="col-md-8 mt-2 ">
          <label for="use" className="form-label">
            The dashboard is maint to be used by
          </label>
          <div class="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="use"
              id="use1"
              value="learner"
            />
            <label className="form-check-label" for="use1">
              Learners
            </label>
          </div>
          <div class="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="use"
              id="use2"
              value="teachers"
            />
            <label class="form-check-label" for="use2">
              Teachers
            </label>
          </div>

          <div class="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="use"
              id="use2"
              value="manager"
            />
            <label class="form-check-label" for="use2">
              Managers
            </label>
          </div>

          <hr className="my-3" />
        </div>

        

        <div className="col-md-8 mt-2 ">
          <label for="use" className="form-label">
            The dashboard is maint to be used in
          </label>
          <div class="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="use"
              id="use1"
              value="real"
            />
            <label className="form-check-label" for="use1">
              In real time
            </label>
          </div>
          <div class="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="use"
              id="use2"
              value="retro"
            />
            <label class="form-check-label" for="use2">
              Retrospectively
            </label>
          </div>

          <hr className="my-3" />
        </div>
        
      </form>
    
  );
};
export default ContextDescription;
