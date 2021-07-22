import "../library-view.css";
import React from "react";
import axios from "axios";

export default function Delete(props) {
  const deleteIndicator = () => {
    axios
      .delete(`http://localhost:3001/indicators/${props.id}`)
      .then((res) => {
        props.setIndicators(
          props.indicators.filter((item) => {
            return item.id !== props.id;
          })
        );
      });
  };

  return (
    <button className="btn btn-outline-danger" onClick={deleteIndicator}>
      Delete
    </button>
  );
}
