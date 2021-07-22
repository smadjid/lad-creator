import "../library-view.css";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AddDecision(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    addDecision(data);
  };

  const addDecision = (data) => {
    axios.post("http://localhost:3001/decisions", data).then(() => {
      props.setDecisions([
        ...props.decisions,
        {
          data,
        },
      ]);
    }); 
  };

  return (
    <form className="add-decision" onSubmit={handleSubmit(onSubmit)}>
      <h4>Define a new type of decisions</h4>
      <table className="table table-dark">
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                placeholder="Decision Title"
                name="title"
                {...register("title", { required: true })}
              />
            </td>
            <td>Class</td>
            <td>
              <select
                class="formselect"
                placeholder="Rating"
                name="decision_rating"
                {...register("decision_rating", { required: true })}
              >
                <option value="1">Adaptation</option>
                <option value="2">Évaluation</option>
                <option value="3">Evolution</option>
                <option value="4">Planification</option>
                <option value="5">Remediation</option>
                <option value="6">Monitoring</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <textarea
                type="text"
                placeholder="Description..."
                name="decision_description"
                {...register("decision_description", { required: true })}
              />
            </td>
          </tr>
          <tr>
          <td></td>
            <td><input className="btn btn-primary" value="Submit" type="submit" /></td>
          </tr>
        </tbody>
      </table>
      
    </form>
  );
}
