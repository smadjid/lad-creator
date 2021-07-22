import "./library-view.css";

import { useState, useEffect } from "react";
import AddPanel from "./panels_lib/add_panel";
import Edit from "./panels_lib/edit_panel";
import Delete from "./panels_lib/delete_panel";
import axios from "axios";

function Panels() { 
  const [panels, setPanels] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [charts, setCharts] = useState([]);

  const getPanels = () => {
    axios.get("http://localhost:3001/panels").then((res) => {
      setPanels(res.data);
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
    getPanels();
  }, []);

  useEffect(() => {
    getIndicators();
  }, []);

  useEffect(() => {
    getCharts();
  }, []);

  return (
    <>
   
    <AddPanel panels={panels} setPanels={setPanels} indicators={indicators} charts={charts}/>
<hr />
    <h4>View, edit or delete defined types of panels</h4>
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
          {panels.map((item) => {
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
                panels={panels}
                setPanels={setPanels}
              /></td>
              <td>
              <Delete
                id={item.id}
                panels={panels}
                setPanels={setPanels}
              /></td>
              </tr>
            );
          })}

         
        </tbody>
      </table>
      
      
    </>
  );
}

export default Panels;
