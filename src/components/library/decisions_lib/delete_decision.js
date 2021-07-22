import "../library-view.css";
import React from "react";
import axios from "axios";

export default function Delete(props) {
  const deleteDecision = () => {
    axios
      .delete(`http://localhost:3001/decisions/${props.id}`)
      .then((res) => {
        props.setDecisions(
          props.decisions.filter((item) => {
            return item.id !== props.id;
          })
        );
      });
  };

  return (
    <button className="btn btn-outline-danger" onClick={deleteDecision}>
      Delete
    </button>
  );
}
