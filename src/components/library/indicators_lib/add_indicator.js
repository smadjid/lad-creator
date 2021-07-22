import "../library-view.css";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AddIndicator(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    addIndicator(data);
  };

  const addIndicator = (data) => {
    axios.post("http://localhost:3001/indicators", data).then(() => {
      props.setIndicators([
        ...props.indicators,
        {
          data,
        },
      ]);
    });
  };

  return (
    <form className="add-indicator" onSubmit={handleSubmit(onSubmit)}>
      <h4>Define a new type of indicators</h4>
      <table className="table table-dark">
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                placeholder="Indicator Title"
                name="title"
                {...register("title", { required: true })}
              />
            </td>
            <td>Class</td>
            <td>
              <select
                class="formselect"
                placeholder="Rating"
                name="rating"
                {...register("rating", { required: true })}
              >
                 <option value="1">Monitoring the use of media and tools</option>
                <option value="2">Monitoring Information Retrieval</option>
                <option value="3">Monitoring student activity</option>
                <option value="4">Monitoring student comprehension</option>
              </select>
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
          <td></td>
            <td><input className="btn btn-primary" value="Submit" type="submit" /></td>
          </tr>
        </tbody>
      </table>
      
    </form>
  );
}
