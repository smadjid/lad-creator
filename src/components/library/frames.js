import "./library-view.css";

import { useState, useEffect } from "react";
import AddFrame from "./frames_lib/add_frame";
import Edit from "./frames_lib/edit_frame";
import Delete from "./frames_lib/delete_frame";
import axios from "axios";

function Frames() {
  const [frames, setFrames] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [charts, setCharts] = useState([]);

  const getFrames = () => {
    axios.get("http://localhost:3001/frames").then((res) => {
      setFrames(res.data);
    });
  };

  const getIndicators = () => {
    axios.get("http://localhost:3001/indicators").then((res) => {
      setIndicators(res.data);
    });
  };

  const getCharts = () => {
    axios.get("http://localhost:3001/visualizations").then((res) => {
      setCharts(res.data);
    });
  };

  useEffect(() => {
    getFrames();
  }, []);

  useEffect(() => {
    getIndicators();
  }, []);

  useEffect(() => {
    getCharts();
  }, []);

  return (
    <>
   
    <AddFrame frames={frames} setFrames={setFrames} indicators={indicators} charts={charts}/>
<hr />
    <h4>View, edit or delete defined types of frames</h4>
      <table className="table table-bordered table-hover table-dark table-striped text-md-start">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Type</th>
            <th scope="col">Description</th>
           
            <th scope="col">Associated indicator</th>
            <th scope="col">Graphical representation</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {frames.map((item) => {
            return (
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.title}</td>
                <td>{item.rating ==1 ? "Elaboration":(item.rating ==2 ?"Inquiry":item.rating ==3 ?"Preservation":item.rating ==4 ?"Comparison":item.rating ==2 ?"Reframing":"Seeking")}</td>
                <td>{item.description}</td>
                <td>{item.indicator}</td>
                <td>{item.graphic}</td>
                <td><Edit
                id={item.id}
                frames={frames}
                setFrames={setFrames}
              /></td>
              <td>
              <Delete
                id={item.id}
                frames={frames}
                setFrames={setFrames}
              /></td>
              </tr>
            );
          })}

         
        </tbody>
      </table>
      
      
    </>
  );
}

export default Frames;
