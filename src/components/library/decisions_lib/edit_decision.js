import "../library-view.css";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Edit(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data["id"] = props.id;
    updateDecision(data);
  };

  const updateDecision = (data) => {
    const { REACT_APP_BASE_API } = process.env;
    axios.put(REACT_APP_BASE_API+"decisions", data).then((res) => {
      props.setDecisions(
        props.decisions.map((item) => {
          return item.id === props.id
            ? {
                id: item.id,
                title: item.title,
                decision_description: item.decision_description,
                decision_rating: item.decision_rating,
              }
            : item;
        })
      );
    });
  };

  return (
    <form className="add-decision" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        type="text"
        placeholder="Description..."
        name="decision_description"
        {...register("decision_description", { required: true })}
      />

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

      <input className="btn btn-outline-success" value="Update" type="submit" />
    </form>
  );
}
