import axios from "axios";
import React, { useEffect, useState } from "react";
import "./chart-component.css";

const ChartComponent = (props) => {
  
  const [visualizations, setVisualizations] = useState();
  const getVisualizations = () => {
    axios.get("http://localhost:3001/visualizations").then((res) => {
      setVisualizations(res.data);
    });
  };

  useEffect(() => {
    getVisualizations();
  }, []);

  const updateDisplay = () => {
    getVisualizations();
  };

  const decodeChart = (blob) => {
     
    if (!blob) return;
    if (typeof blob === "string") return blob;
    const { data } = blob;
    const img = new Buffer.from(data).toString("ascii");
    
    return img;
  };

  const fetchVizElement = (id) =>{
      
      if(typeof id === 'undefined') return{title:null,chart:null};
      else{
          let elt = visualizations.find(x  => x.id === id) 
          if(elt) return elt
          else return{title:null,chart:null};
      }
  }

 
  
  
  return (
    <div>
      <div className="chart_box">
      <h6>{props.data?props.data.title:''}</h6>
        <div className="chart_box-overlay"></div>
        <img
          className="chart_box-image"
          src={props.data? decodeChart(fetchVizElement(props.data.visualization_id).chart) : null}
        />
        <div className="chart_box-details fadeIn-bottom">
          <p className="chart_box-text">
            <i className="fa fa-map-marker"></i>{" "}
            {props.data? props.data.description: ' '}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ChartComponent;
