import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { FRAMEBOX } from "./constants";

const style = {
  border: "1px dashed black",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move"
};
const FrameBox = ({ data, frameboxs, path }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: FRAMEBOX,
    item: {  id: data.id, path },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const framebox = frameboxs[data.id];

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="framebox draggable"
    >
      <div>{data.id}</div>
      <div>{framebox.content}</div>
    </div>
  );
};
export default FrameBox;
