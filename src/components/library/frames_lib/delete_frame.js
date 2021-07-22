import "../library-view.css";
import React from "react";
import axios from "axios";

export default function Delete(props) {
  const deleteFrame = () => {
    axios
      .delete(`http://localhost:3001/frames/${props.id}`)
      .then((res) => {
        props.setFrames(
          props.frames.filter((item) => {
            return item.id !== props.id;
          })
        );
      });
  };

  return (
    <button className="btn btn-outline-danger" onClick={deleteFrame}>
      Delete
    </button>
  );
}
