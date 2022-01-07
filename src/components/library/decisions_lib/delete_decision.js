import "../library-view.css";
import React from "react";
import axios from "axios";

export default function Delete(props) {
  const { REACT_APP_BASE_API } = process.env;
  const deleteDecision = () => {
    axios
      .delete(`${REACT_APP_BASE_API}decisions/${props.id}`)
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
