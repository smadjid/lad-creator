import "./library-view.css";

import { useState, useEffect } from "react";
import AddIndicator from "./indicators_lib/add_indicator";
import Edit from "./indicators_lib/edit_indicator";
import Delete from "./indicators_lib/delete_indicator";
import axios from "axios";

function Indicators() { 
  const [indicators, setIndicators] = useState([]);

  const getIndicators = () => {
    axios.get("http://localhost:3001/indicators").then((res) => {
      setIndicators(res.data);
    });
  };

  useEffect(() => {
    getIndicators(); 
  }, []);

  return (
    <>
    <AddIndicator indicators={indicators} setIndicators={setIndicators} />
    <hr />
    <h4>View, edit or delete indicators</h4>
      <table className="table table-bordered table-hover table-dark table-striped text-md-start">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Type</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {indicators.map((item) => {
            return (
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.title}</td>
                <td>{item.rating ==1 ? "Monitoring the use of media and tools":(item.rating ==2 ?">Monitoring Information Retrieval":item.rating ==3 ?"Monitoring student activity":"Monitoring student comprehension")}</td>
                <td>{item.description}</td>
                <td><Edit
                id={item.id}
                indicators={indicators}
                setIndicators={setIndicators}
              /></td>
              <td>
              <Delete
                id={item.id}
                indicators={indicators}
                setIndicators={setIndicators}
              /></td>
              </tr>
            );
          })}

         
        </tbody>
      </table>
      
      
    </>
  );
}

export default Indicators;
