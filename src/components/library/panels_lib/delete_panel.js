import "../library-view.css";
import React from "react";
import axios from "axios";

export default function Delete(props) {
  const deletePanel = () => {
    axios
      .delete(`http://localhost:3001/panels/${props.id}`)
      .then((res) => {
        props.setPanels(
          props.panels.filter((item) => {
            return item.id !== props.id;
          })
        );
      });
  };

  return (
    <button className="btn btn-outline-danger" onClick={deletePanel}>
      Delete
    </button>
  );
}
