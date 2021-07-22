import "../library-view.css";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Indicators from "../indicators";

export default function AddPanel(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    addPanel(data);
  };

  const addPanel = (data) => {
    axios.post("http://localhost:3001/panels", data).then(() => {
      props.setPanels([
        ...props.panels,
        {
          data,
        },
      ]);
    });
  };

  return (
    <form className="add-panel" onSubmit={handleSubmit(onSubmit)}>
     <h4>Define a new type of panels</h4>
      <table className="table table-dark">
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                placeholder="Panel Title"
                name="paneltitle"
                {...register("paneltitle", { required: true })}
              />
            </td>
            <td>Class</td>
            <td>
              <select
                class="formselect"
                placeholder="Rating"
                name="panel_rating"
                {...register("panel_rating", { required: true })}
              >
                <option value="1">Elaboration</option>
                <option value="2">Inquiry</option>
                <option value="3">Preservation</option>
                <option value="4">Comparison</option>
                <option value="5">Reframing</option>
                <option value="6">Seeking</option>
              </select>
            </td>
          </tr>
          <tr>
          <td>Associated indicator</td>
          <td>
              <select
                class="formselect"
                placeholder="Indicator"
                name="panel_indicator"
                {...register("panel_indicator", { required: false })}
              >
              {props.indicators.map((item)=>{
                return(<option value={item.title}>{item.title}</option>);
              })}
              </select>
            </td>
            <td>Graphical representation</td>
          <td>
              <select
                class="formselect"
                placeholder="Graphic"
                name="panel_graphic"
                {...register("panel_graphic", { required: true })}
              >
              {props.charts.map((item)=>{
                return(<option value={item.title}>{item.title}</option>);
              })}
              </select>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <textarea
                type="text"
                placeholder="Description..."
                name="panel_description"
                {...register("panel_description", { required: true })}
              />
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
}
