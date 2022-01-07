import "./library-view.css";

import React, { useState, useEffect } from "react";
import AddDecision from "./decisions_lib/add_decision";
import Edit from "./decisions_lib/edit_decision";
import Delete from "./decisions_lib/delete_decision";
import axios from "axios";

function Decisions() {
  const [decisions, setDecisions] = useState([]);
  const { REACT_APP_BASE_API } = process.env;
  const getDecisions = () => {
    axios.get(REACT_APP_BASE_API+"decisions").then((res) => {
      setDecisions(res.data);
    });
  };

  useEffect(() => {
    getDecisions();
  }, [decisions]);

  return (
    <>
    <AddDecision decisions={decisions} setDecisions={setDecisions} />
    <hr />
    <h4>View, edit or delete defined types of decisions</h4>
      <table className="table table-bordered table-hover table-dark table-striped text-md-start">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Type</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {decisions.map((item) => {
            return (
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.title}</td>
                <td>{item.frame_rating ==1 ? "Adaptation":(item.frame_rating ==2 ?"Evaluation":item.frame_rating ==3 ?"Evolution":item.frame_rating ==4 ?"Planification":item.frame_rating ==2 ?"Remediation":"Monitoring")}</td>
                <td>{item.decision_description}</td>
                <td><Edit
                id={item.id} 
                decisions={decisions}
                setDecisions={setDecisions}
              /></td>
              <td>
              <Delete
                id={item.id}
                decisions={decisions}
                setDecisions={setDecisions}
              /></td>
              </tr>
            );
          })}

         
        </tbody>
      </table>
      
      
    </>
  );
}

export default Decisions;
