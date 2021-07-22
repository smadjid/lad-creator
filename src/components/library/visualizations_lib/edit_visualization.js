import "../library-view.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ChartUpload from "../chart-upload";


export default function Edit(props) {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = (data) => {
    data["id"] = props.id;
    data.chart = chart;
    
    updateVisualization(data);
  };

  const updateVisualization = (data) => {
    axios.put("http://localhost:3001/visualizations", data).then((res) => {
      props.setVisualizations(
        props.visualizations.map((item) => {
          return item.id === props.id
            ? {
                id: item.id,
                title: item.title,
                description: item.description,
                class: item.class,
                chart: item.chart,
              }
            : item;
        })
      );
    });
    props.updateDisplay();
  };

  const [chart, setChart] = React.useState(null);

  const handleChartChange = (v) => {
    setChart(v);
  };

  return (
    <form className="add-visualization" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        type="text"
        placeholder="Description..."
        name="description"
        value={props.element.description}
        {...register("description", { required: true })}
      />

      <select
        class="formselect"
        placeholder="Rating"
        name="class"
        value={props.element.class}
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
      <b>Chart</b>
      <ChartUpload onChartChange={handleChartChange} />
      <input className="btn btn-outline-success" value="Update" type="submit" />
    </form>
  );
}
