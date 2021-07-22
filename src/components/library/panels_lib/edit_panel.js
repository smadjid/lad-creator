import "../library-view.css";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Edit(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data["id"] = props.id;
    updatePanel(data);
  };

  const updatePanel = (data) => {
    axios.put("http://localhost:3001/panels", data).then((res) => {
      props.setPanels(
        props.panels.map((item) => {
          return item.id === props.id
            ? {
                id: item.id,
                paneltitle: item.paneltitle,
                panel_description: item.panel_description,
                panel_rating: item.panel_rating,
              }
            : item;
        })
      );
    });
  };

  return (
    <form className="add-panel" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        type="text"
        placeholder="Description..."
        name="panel_description"
        {...register("panel_description", { required: true })}
      />

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

      <input className="btn btn-outline-success" value="Update" type="submit" />
    </form>
  );
}
