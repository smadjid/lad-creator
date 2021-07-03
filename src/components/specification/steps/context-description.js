import React, { useState } from "react";

const ContextDescription = (props) => {
  return (
    <div className="container-fluid">
      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-secondary">Summary</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">User's role</h6>
                <small className="text-muted">(not provided)</small>
              </div>
              <span className="text-muted">(X)</span>
            </li>
          </ul>
        </div>

        <div className="col-md-7 col-lg-8">
          <form className="needs-validation" novalidate>
            <div class="form-group row">
              <h3>Learning context</h3>
              <panel>
                Decsribe the context where the dashoard is meant to be used
              </panel>
              <hr className="my-1" />
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
                <option value="teacher">
                  Teacher - who is in charge of the course
                </option>
                <option value="tutor">Tutor</option>
                <option value="learner">Learner</option>
                <option value="manager">Manager</option>
                <option value="other">Other</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid role.
              </div>
              <hr className="my-3" />
            </div>

            <div className="col-md-8 mt-2 ">
              <label for="country" className="form-label">
                Type of learning environment
              </label>
              <select
                className="form-select"
                id="country"
                placeholder="Your role"
                required
              >
                <option value="teacher">Online class</option>
                <option value="tutor">Offline class</option>
                <option value="learner">Hybrid class</option>
                <option value="manager">MOOC</option>
                <option value="other">Other</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid role.
              </div>
              <div className="col-sm-10">
                <label for="firstName" className="form-label">
                  Details ?
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  value=""
                />
              </div>
              <hr className="my-3" />
            </div>

       
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="save-info"
              />
              <label className="form-check-label" for="save-info">
                Save this information for next time
              </label>
            </div>

            <hr className="my-4" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default ContextDescription;
