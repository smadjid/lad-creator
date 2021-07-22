import "../library-view.css";
import React from "react";
import axios from "axios";

export default function Delete(props) {
  const deleteVisualization = () => {
    axios
      .delete(`http://localhost:3001/visualizations/${props.id}`)
      .then((res) => {
        props.setVisualizations(
          props.visualizations.filter((item) => {
            return item.id !== props.id;
          })
        );
      });
      props.updateDisplay();
  };

  return (
    <button className="btn btn-outline-danger" onClick={deleteVisualization}>
      Delete
    </button>
  );
}
