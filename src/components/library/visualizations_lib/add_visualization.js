import "../library-view.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ChartUpload from "../chart-upload";

const AddVisualization = (props) => {
  const [selectedFile, setSelectedFile] = useState();

  const { register, handleSubmit } = useForm();
  const [chart, setChart] = React.useState("");

  const handleChartChange = (v) => {
    setChart(v);
  };
  const onSubmit = (data) => {
    //data.chart = chart;
    addVisualization(data);
  };

  const addVisualization = (data) => {
    data.chart = chart;
    axios.post("http://localhost:3001/visualizations", data).then(() => {
      props.setVisualizations([
        ...props.visualizations,
        {
          data: data,
          headers: { "Content-Type": "multipart/form-data" },
        },
      ]);
    });
    props.updateDisplay();
  };  

  return (
    
    <form className="add-visualization" onSubmit={handleSubmit(onSubmit)}>
      <h4>Define a new type of visualizations</h4>
      
      <table className="table table-dark">
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                placeholder="Visualization Title"
                name="title"
                {...register("title", { required: true })}
              />
            </td>
            <td rowSpan="4">
              <b>Chart</b>
              <ChartUpload onChartChange={handleChartChange} />
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <textarea
                type="text"
                placeholder="Description..."
                name="description"
                {...register("description", { required: true })}
              />
            </td>
          </tr>
          <tr>
            <td>Class</td>
            <td>
              <select
                className="formselect"
                placeholder="Rating"
                name="class"
                {...register("class", { required: true })}
              >
                <option value="Distribution">Distribution</option>
                <option value="Correlation">Correlation</option>
                <option value="Ranking">Ranking</option>
                <option value="Part of a Whole">Part of a Whole</option>
                <option value="Evolution">Evolution</option>
                <option value="Map">Map</option>
                <option value="Flow">Flow</option>
              </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input className="btn btn-primary" value="Submit" type="submit" />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
export default AddVisualization;
