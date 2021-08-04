import { Settings } from "@material-ui/icons";
import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { useDrag } from "react-dnd";

const SideBarItem = ({key, data, showFrame}) => {
  const [{ opacity }, drag] = useDrag({
    type: data.type,
    content: data.content,
    item: data,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  
  const displayFrameDetails = (frame)=>{
     return showFrame(frame);
  }
  return (
    <div className="sideBarItem btn-success" ref={drag} style={{ opacity }}>
      {data.framebox.content} <span role='button' onClick={()=>displayFrameDetails(data.framebox)}><Settings/> </span>
    </div>
  );
};
export default SideBarItem;
