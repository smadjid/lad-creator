import React, { useState, useContext } from "react";
import { VizContext } from "./visualizations";

const ChartUpload = (props) => {
  const [element, setElement] = useContext(VizContext);

  
  const decodeChart = (blob) => {
    if (!blob) return;
    if(typeof blob === 'string') return blob;
    const { data } = blob;
    const img = new Buffer.from(data).toString("ascii");
    
    return img;
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        
        //props.onChartChange(reader.result);
        setElement({...element, chart:reader.result} );
        
      });
      reader.readAsDataURL(e.target.files[0]);
      
      
    }
  };
  return (
    <div className="formInstructionsDiv formElement">
      <p className="instructionsText" />
      <div className="register_profile_image">
        <input
          id="chart"
          type="file"
          onChange={onChangePicture}
          accept="image/*"
        />
      </div>

      <div className="chart_box">
         <img className="chart_box-image" src={decodeChart(element.chart)} /> 
      </div>
    </div>
  );
};

export default ChartUpload;
